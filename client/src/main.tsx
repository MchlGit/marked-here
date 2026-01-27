import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import "./index.css";
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";

async function enableMocking() {
    if (import.meta.env.VITE_MOCK_API !== 'true') return;

    const {worker} = await import("./mocks/browser.ts");
    await worker.start({
        onUnhandledRequest: "warn",
    });
}

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </StrictMode>,
    );
});
