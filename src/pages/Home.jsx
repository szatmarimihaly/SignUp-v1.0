import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("email");
        if (!email) {
            navigate("/Sign-In");
        } else {
            setUsername(email.split("@")[0]); // E-mail @ előtti részét használjuk
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
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
