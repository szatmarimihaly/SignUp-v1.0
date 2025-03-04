import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignIn = async () => {
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }), // Biztosan JSON formátumban küldi
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.user.email);
            navigate("/Home");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="signup-container">
            <h1>Sign In</h1>
            <div className="input-container">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button className="sign-up-link" onClick={() => navigate('/Sign-Up')}>
                Don't have an account? Sign up
            </button>
        </div>
    );
}

export default SignIn;
