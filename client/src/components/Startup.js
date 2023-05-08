import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Startup.module.css";
import logo from "../assets/Scrapsaver.png";

const Startup = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold pb-5">Welcome to</h4>
            <h4 className="text-5xl font-bold text-gray-700">
              Food Waste Management Mediator!
            </h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1">
            <div className="profile flex justify-center py-4">
              <img src={logo} alt="logo" className={styles.logo_img} />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <Link to="/login">
                <button className={styles.btn}>Login</button>
              </Link>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a Member{" "}
                <Link className="text-red-400" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Startup;
