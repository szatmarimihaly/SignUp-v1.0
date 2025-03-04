import "../styles/signup.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function SignUp() {
    const navigate = useNavigate();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');



    const handleSignUp = async () => {
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }), // Biztosan JSON formátumban küldi
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            navigate("/Sign-In");
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <div className="input-container">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
            </div>
            <button className="sign-in-btn" onClick={handleSignUp}>Sign Up</button>
            <button className="sign-up-link" onClick={() => navigate('/Sign-In')}>Already have an account? Sign In</button>
        </div>
    );
}

export default SignUp;
