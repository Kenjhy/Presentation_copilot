const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');

// Render each slide to its own PDF page and merge into a single deck export.
(async () => {
  const projectRoot = path.resolve(__dirname, '..');
  const docsDir = path.join(projectRoot, 'docs');
  const entryFile = path.join(docsDir, 'index.html');
  const distDir = path.join(projectRoot, 'dist');
  const outputPdf = path.join(distDir, 'copilot-presentations-en.pdf');

  if (!fs.existsSync(entryFile)) {
    throw new Error(`Presentation entry file not found at ${entryFile}`);
  }

  fs.mkdirSync(distDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    const fileUrl = `file://${entryFile.replace(/\\/g, '/')}`;

    await page.goto(fileUrl, { waitUntil: ['domcontentloaded', 'networkidle0'] });
    await page.emulateMediaType('screen');
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

    // Freeze UI flourishes that can interfere with capture and hide the live nav controls.
    await page.addStyleTag({ content: '* { animation: none !important; transition: none !important; }' });
    await page.evaluate(() => {
      const nav = document.querySelector('.nav-controls');
      if (nav) {
        nav.style.display = 'none';
      }
    });

    const slideCount = await page.$$eval('.slide', slides => slides.length);
    if (!slideCount) {
      throw new Error('No slides found in the presentation.');
    }

    const mergedPdf = await PDFDocument.create();

    for (let index = 0; index < slideCount; index += 1) {
      await page.evaluate(activeIndex => {
        const slides = Array.from(document.querySelectorAll('.slide'));
        slides.forEach((slide, idx) => {
          const isActive = idx === activeIndex;
          slide.classList.toggle('active', isActive);
          slide.style.display = isActive ? 'block' : 'none';
        });

        const counter = document.getElementById('current-slide');
        if (counter) {
          counter.textContent = activeIndex + 1;
        }
      }, index);

  await new Promise(resolve => setTimeout(resolve, 200));

      const slidePdfBuffer = await page.pdf({
        format: 'A4',
        landscape: true,
        printBackground: true,
        margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
      });

      const slidePdf = await PDFDocument.load(slidePdfBuffer);
      const copiedPages = await mergedPdf.copyPages(slidePdf, slidePdf.getPageIndices());
      copiedPages.forEach(page => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();
    fs.writeFileSync(outputPdf, mergedBytes);

    console.log(`PDF generated at ${outputPdf}`);
  } finally {
    await browser.close();
  }
})();
