import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignIn = async () => {
        setError('');

        if (!username || !password) {
            setError("Username and password are required");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }), // Biztosan JSON formátumban küldi
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 400) {
                    setError("🔐 Invalid username or password. 🔐")
                }else{
                    setError("❌ Server Error. Please try again later! ❌")
                }
                return;
            }

            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("username", data.user.username);
            navigate("/Home");

        } catch (err) {
            console.error("❌ Sign-in error:", err.message);
            setError("❌ Something went wrong! ❌");
        }
    };

    return (
        <div className="signup-container">
            <h1>Sign In</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button className="sign-in-btn" onClick={handleSignIn}>Sign In</button>
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            <button className="sign-up-link" onClick={() => navigate('/Sign-Up')}>
                Don't have an account? Sign up
            </button>
        </div>
    );
}

export default SignIn;
