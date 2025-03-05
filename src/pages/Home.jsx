import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (!storedUsername) {
            navigate("/Sign-In");
        } else {
            setUsername(storedUsername);
        }
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        navigate("/Sign-In");
    };

    return (
        <div className="home-container">
            <h1>Welcome, {username}!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;