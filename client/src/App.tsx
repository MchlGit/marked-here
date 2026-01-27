import {Routes, Route, Outlet} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.tsx";
import TreeProfilePage from "./pages/TreeProfilePage/TreeProfilePage.tsx";
import CreateTreePage from "./pages/CreateTreePage/CreateTreePage.tsx";

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
                    <Route path="/" element={<TreeProfilePage/>}/>
                    <Route path="/create" element={<CreateTreePage/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default App
