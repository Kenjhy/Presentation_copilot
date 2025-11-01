# GitHub Copilot Presentation (English Edition)

Welcome to the English version of the GitHub Copilot presentations. This project contains ready-to-deliver slide decks that explain GitHub Copilot and Microsoft Copilot 365 entirely in English.

## 🚀 Quick Start Guide

### 1. Download the Project

You can obtain the repository in two ways:

**Option A – Download as ZIP:**

1. Visit the GitHub repository page.
2. Click the green **"Code"** button.
3. Select **"Download ZIP"**.
4. Extract the ZIP file on your computer.

**Option B – Clone with Git:**

1. Open a terminal or Command Prompt.
2. Run:

   ```bash
   git clone https://github.com/Kenjhy/Presentation_of_Copilot_365_English.git
   ```

### 2. Install Node.js

Node.js is required to run the local preview server.

1. Go to [https://nodejs.org](https://nodejs.org).
2. Download the **LTS** (Long Term Support) version.
3. Install it following the on-screen instructions.
4. Verify the installation:

   
   ```bash
   node --version
   ```

   
   You should see a version number (for example, v20.x.x).

### 3. Install Dependencies

1. Open a terminal.
2. Navigate to the project directory:
   
   
   ```bash
   cd "path/to/copilot-presentations-en"
   ```
   
3. Install the dependencies:

   ```bash
   npm install
   ```

### 4. Launch the Presentation

1. In the same terminal, start the local server:
   
   
   ```bash
   npm start
   ```
   
2. Your default browser opens automatically. If it does not, visit [http://localhost:8080](http://localhost:8080).

### Troubleshooting

- **"npm is not recognized"** → Node.js is not installed or not added to your PATH.
- **Browser does not open** → Open a browser manually and navigate to `http://localhost:8080`.
- **Port 8080 already in use** → Close the application using that port or change the port in `package.json`.

---

## Project Structure

```text
copilot-presentations-en
├── github-copilot-presentation
│   ├── src
│   │   ├── index.html               # Main deck: GitHub Copilot overview
│   │   ├── styles
│   │   │   └── main.css             # Presentation styling
│   │   ├── scripts
│   │   │   └── navigation.js        # Slide navigation logic
│   │   └── assets                   # Icons and images (optional)
│   └── README.md                    # Deck usage instructions
├── copilot-365-comprehensive
│   ├── src
│   │   ├── index.html               # Advanced Microsoft Copilot 365 deck
│   │   ├── styles
│   │   │   └── main.css             # Styling tuned for multi-section slides
│   │   ├── scripts
│   │   │   ├── navigation.js        # Keyboard and button controls
│   │   │   ├── interactive.js       # Small interactive helpers
│   │   │   └── level-switcher.js    # Level toggles (if needed)
│   │   └── assets                   # Images, icons, demos (optional)
│   └── README.md                    # Deck usage instructions
├── shared
│   ├── components                   # Reusable HTML snippets (optional)
│   ├── utils                        # Common scripts (optional)
│   └── config                       # Shared configuration files
├── package.json                     # npm configuration
└── README.md                        # You are here
```

## Contributing

Pull requests with improvements, typo fixes, or new examples are welcome. Please open an issue first if the change is substantial.

## License

This project is released under the MIT License. See the `LICENSE` file for details.
