# Test Case Generator & Manager

A modern, responsive, React-based web application for creating, managing, and tracking Quality Assurance (QA) test plans. Designed with a clean SaaS aesthetic, this tool helps development and QA teams organize testing phases and export results seamlessly.

## Features

- **Dashboard Overview**: View global statistics (Pass, Fail, Blocked, Not Tested) and search through all test plans.
- **Test Plan Management**: Add, edit, and delete comprehensive test plans.
- **Detailed Test Case Tracking**: Organize individual test cases with preconditions, steps, input data, and expected vs. actual results.
- **Status Coloring**: Visual indicators for test case status (Passed, Failed, Blocked, Not Tested).
- **Excel Export**: Export complete test plans directly to formatted Excel (`.xlsx`) files.
- **Responsive Design**: Fully functional on desktop, tablet, and mobile browsers.

## Technology Stack

- **Frontend**: React (v18+)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (plus custom utilities in `index.css`)
- **Routing**: React Router (`react-router-dom`)
- **Icons**: Heroicons (via `react-icons`)
- **Exporting**: ExcelJS (`exceljs`), FileSaver.js (`file-saver`)

## Prerequisites

Before setting up the project locally, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Local Setup Instructions

1. **Clone the repository** (if applicable):
   ```bash
   git clone https://github.com/ashwin-khatiwada/Test-Case-Generator.git
   cd Test-Case-Generator
   ```

2. **Navigate to the project directly** (if already on your machine):
   ```bash
   cd "Test Case"
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open the application**:
   Open your browser and navigate to the local server URL provided in the terminal (usually `http://localhost:5173`).

## Building for Production

To create a production-ready build of the application:

```bash
npm run build
```

This will generate a `dist/` directory containing the optimized, minified files ready to be deployed to any static web host (like Vercel, Netlify, or AWS S3).

## Data Storage Note

Currently, this application relies on **Local Storage**. All test plans and test cases are saved directly within the user's browser. 
- If you clear your browser cache, the data will be lost.
- To share a test plan with a team member, use the "Export to Excel" feature.
- Future versions may incorporate a backend API and database for centralized team storage.
