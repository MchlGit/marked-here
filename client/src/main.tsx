import {BrowserRouter} from "react-router-dom"
import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import "@/index.css"
import "leaflet/dist/leaflet.css"
import App from "@/App.tsx"
import {configureLeafletIcons} from "@lib/leafletIcons"

configureLeafletIcons();

async function enableMocking() {
    console.log('VITE_MOCK_API:', import.meta.env.VITE_MOCK_API);

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
