import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./Login.css";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "/api/users/login";

const Login = () => {
  const { setUser } = useContext(AuthContext); // use setUser from AuthContext
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, { email, password: pwd });

      const accessToken = response?.data?.accessToken;

      // Save token in localStorage
      localStorage.setItem("accessToken", accessToken);

      // Update AuthContext with user data
      setUser({
        email: response.data.email,
        username: response.data.username,
        pictureUrl: response.data.pictureUrl,
        token: accessToken,
      });

      // Reset form fields
      setEmail("");
      setPwd("");

      // Redirect to homepage or profile
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }

      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  return (
    <div className="Login">
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>
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

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button type="submit">Sign In</button>
        </form>
        <p>
          Need an Account?
          <br />
          <span className="line">
            <a href="http://localhost:3000/register">Sign Up</a>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Login;
