import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "../../api/axios";
import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";

const REGISTER_URL = "/register";

const Register = () => {
  const { setUser } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, username, password, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== matchPwd) {
      setErrMsg("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        { email, username, password },
        { withCredentials: true }
      );

      const accessToken = response?.data?.accessToken;
      localStorage.setItem("accessToken", accessToken);

      // Set context
      setUser({
        username: response.data.username || username,
        email: response.data.email || email,
        pictureUrl: response.data.pictureUrl || "/default-avatar.png",
        token: accessToken,
      });
      navigate("/profile");
    } catch (err) {
      if (!err?.response) setErrMsg("No Server Response");
      else if (err.response?.status === 400) setErrMsg("Missing fields");
      else if (err.response?.status === 409)
        setErrMsg("Username or Email Taken");
      else setErrMsg("Registration Failed");

      if (errRef.current) errRef.current.focus();
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
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <label>Username:</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <label>Confirm Password:</label>
          <input
            type="password"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
          />

          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already registered? <br />
          <span className="line">
            <a href="/login">Sign In</a>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Register;
