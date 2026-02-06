import {Routes, Route, Outlet} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.tsx";
import SpotProfilePage from "./pages/SpotProfilePage/SpotProfilePage.tsx";
import CreateSpotPage from "./pages/CreateSpotPage/CreateSpotPage.tsx";

export function Layout() {
    return (
        <>
            <NavBar/>
            <main className="mx-auto max-w-6xl px-4">
                <Outlet/>
            </main>
        </>
    );
}

function App() {
    console.log("VITE_API_BASE_URL =", import.meta.env.VITE_API_BASE_URL);
    console.log("MODE = ", import.meta.env.MODE);
    console.log("PROD = ", import.meta.env.PROD);
    return (
        <>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<SpotProfilePage/>}/>
                    <Route path="/create" element={<CreateSpotPage/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default App
