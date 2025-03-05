import "../styles/sign.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



function SignUp() {
    const navigate = useNavigate();

    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const [ showPassword, setShowPassword ] = useState(false);

    const toogleVisibility = () => {
        setShowPassword((prev) => !prev);
    }



    const handleSignUp = async () => {
        setError('');

        if (!username || !email || !password) {
            setError("Username, email, and password are required");
            return;
        }

        if (password.length < 12){
            setError("Passwords must be 12 characters long");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }), // Küldjük a `username`-et is!
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
            <h1>Create an Account</h1>
            <div className="input-container">

                <div className="display-container">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required/>
                </div>

                <div className="display-container">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required/>
                </div>

                <div className="pass-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required/>

                    <button onClick = {() => setShowPassword(!showPassword)}>
                        <i className = {showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
                    </button>

                </div>
            </div>
            <button className="sign-in-btn" onClick={handleSignUp}>Sign Up</button>
            {error && <p style={{color: "red", marginTop: "10px"}}>{error}</p>}
            <button className="sign-up-link" onClick={() => navigate('/Sign-In')}>Already have an account? Sign In
            </button>
        </div>
    );
}

export default SignUp;
