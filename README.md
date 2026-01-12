
# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1oGr94UPCbICLnFU8UovDmJt80kh4uPCt

## Run Locally

Follow these steps to get the project up and running on your local machine.

### Prerequisites

-   **Node.js**: Ensure you have Node.js installed on your machine.
-   **Gemini API Key**: You will need a valid API key from Google Gemini.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Start-Up-Agency-Inc/kaizenstat-agency.git
    cd kaizenstat-agency
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Configuration

3.  **Set up Environment Variables:**

    -   Create a `.env.local` file in the root directory (if it doesn't already exist).
    -   Add your Gemini API key to it:

    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

    > [!NOTE]
    > Make sure to verify the exact variable name in the code (e.g., `import.meta.env.VITE_GEMINI_API_KEY`) or usage documentation if it differs.

### Running the App

4.  **Start the development server:**

    ```bash
    npm run dev
    ```

    The app should now be running on [http://localhost:5173](http://localhost:5173).

## Build for Production

To build the application for production deployment:

python3 -m venv venv 
source venv/bin/activate

```bash
npm run build
```

The built assets will be in the `dist` directory.
