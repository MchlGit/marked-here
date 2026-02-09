import {Link} from "react-router-dom";
import logo from "../../assets/logo.png";

export default function NavBar() {
    return (
        <nav className="bg-primary text-white w-full min-w-0">
            <div className="mx-auto max-w-6xl px-4">
                <div className="flex h-16 items-center justify-between">
                    {/*Logo and Name*/}
                    <Link to="/">
                        <div className="flex items-center space-x-2">
                            <img src={logo} alt="tree logo" className="h-14"/>
                            <span className="text-lg font-semibold">Marked Here</span>
                        </div>
                    </Link>

                    {/*    Nav Links*/}
                    <div className="flex space-x-6 text-sm">
                        <Link to="/" className="hover:text-slate-300">Spots</Link>
                        <Link to="/create" className="hover:text-slate-300">Submit Spot</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}