import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Home from "./pages/Home.jsx";
import 'remixicon/fonts/remixicon.css';


export default function App() {
    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/Sign-Up" />} />
                <Route path="/Sign-Up" element={<SignUp />} />
                <Route path="/Sign-In" element={<SignIn />} />
                <Route path="/Home" element={isAuthenticated ? <Home /> : <Navigate to="/Sign-In" />} />
            </Routes>
        </Router>
    );
}
