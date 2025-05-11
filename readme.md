Smart Glasses Interaction Demo-1 (React)

This project is a coded prototype for a smart glasses interface, created using [React](https://react.dev/). It demonstrates multimodal user interaction concepts and is intended for academic use.

0. System Requirements

- **Node.js** (version 16 or above):  
  Download from [https://nodejs.org](https://nodejs.org)

1. Open Terminal (macOS)

- Press `Command + Space` → type `Terminal` → press Enter
- Navigate to the project folder:
  ```bash
  cd path/to/7250-A1
Tip: You can also right-click the folder and choose "Open in Terminal".

2. Install Dependencies

Run this command to install the required packages (from package.json):
    npm install
This step may take 1–2 minutes. You will see a node_modules folder created.

3. Start the Application

Once installation is complete, run:
    npm start
Your default browser will open at http://localhost:5173.

If it doesn't open automatically, copy the link and paste it into a browser manually.

4.Troubleshooting
Problem 1: ExecutionPolicy or npm.ps1 error (on Windows)

If you see a message like:
    npm : Cannot load file npm.ps1 because running scripts is disabled on this system.

Run this in Terminal:
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

Then retry:
    npm start

Problem 2: npm start or npm install fails with missing permission or "EACCESS"

Try running the command again with admin privileges, or use this command:

    sudo npm install

(You will be prompted to enter your Mac login password.)