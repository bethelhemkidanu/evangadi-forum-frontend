import { useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import axios from "../../AxiosConfig";
import classes from "./login.module.css";
const Login = () => {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (!emailValue || !passwordValue) {
      setMessage("Please provide required information");
      setMessageType("error");
      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });
      setMessage("Login successfully");
      setMessageType("success");
      localStorage.setItem("token", data.token);

      setTimeout(() => {
        navigate("/");
        // window.location.reload();
        setProcess(false);
      }, 2000);
      console.log(data);
    } catch (error) {
      setMessage(error?.response?.data?.msg || "An error occurred");
      setMessageType("error");
    }
  }

  return (
    <section className={classes.main_container}>
      <div className={classes.login_container}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <br />
          <div className={classes.login_head}>
            <h4>Login to your account</h4>
            <p>
              Don't have account
              <Link to="/register" className={classes.link_color}>
                {" "}
                Create a new account
              </Link>
            </p>
          </div>
          {message && (
            <div className={`${classes.message} ${classes[messageType]}`}>
              {message}
            </div>
          )}
          <div className={classes.input_group}>
            <input ref={emailDom} type="email" placeholder="email"  />
          </div>
          <br />
          <div className={classes.input_group}>
            <input
              ref={passwordDom}
              type="password"
              placeholder="password"
             
            />
          </div>
          <button type="submit" className={classes.login_button}>
            Login
          </button>
          <br />
          <br />
        </form>
      </div>
      <div className={classes.right_container}>
        <Link to="/about" className={classes.about_link}>
          About
        </Link>
        <h1>Evangadi Networks Q&A </h1>
        <p>
          No matter what stage of life you are in, whether you’re just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
        </p>
        <p>
          Whether you are willing to share your knowledge or you are just
          looking to meet mentors of your own, please start by joining the
          network here.
        </p>
        <div className={classes.link}>
          <Link to="/aboutus" className={classes.link_bottom}>
            HOW IT WORKS
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
