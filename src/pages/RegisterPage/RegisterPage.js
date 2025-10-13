import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const REGISTER_URL = "/register";

const RegisterPage = () => {
  const { setUser } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(REGISTER_URL, {
        email,
        username,
        password,
      });

      // Optional: log in user immediately after register
      const { accessToken } = response.data;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        setUser({
          email,
          username,
          token: accessToken,
        });
      }

      setEmail("");
      setUsername("");
      setPassword("");

      navigate("/"); // go to feed or homepage
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing fields");
      } else if (err.response?.status === 409) {
        setErrMsg("Email or Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }

      errRef.current?.focus();
    }
  };

  return (
    <div className="Register">
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <br />
          <span className="line">
            <a href="/login">Sign In</a>
          </span>
        </p>
      </section>
    </div>
  );
};

export default RegisterPage;
