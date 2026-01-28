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
