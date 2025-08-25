import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../../../assets/logo.png";
import Wrapper from "../../../../components/Wrapper/Wrapper";
import { MdOutlineSupportAgent } from "react-icons/md";
import { CoursesData } from "../../../../context/courses/Courses";
import LoginDrawer from "../../../auth/loginDrawer/LoginDrawer";

const Navbar = () => {
  // for sticky navbar ------------ ///

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

      if (offset > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { setDrawerOpen, isDrawerOpen } = useContext(CoursesData);
  console.log(isDrawerOpen);
  return (
    <>
      <div className="nav_wrapper navnew" style={{ background: "#fff" }}>
        <LoginDrawer />
        <Wrapper>
          <nav>
            <div className="nav_left_side">
              <img src={logo} alt="logo" loading="lazy"></img>
            </div>

            <div className="nav_right_side">
              <div className="right-container">
                <div
                  className="talk-to-expert"
                  onClick={() => {
                    window.open("tel:+919821805137");
                  }}
                >
                  <span className="support-icon-wrapper">
                    {" "}
                    <MdOutlineSupportAgent className="support-icon" />
                  </span>

                  <p>
                    {" "}
                    <span
                      style={{
                        color: "var(--campPrimary)",
                        fontWeight: "600",
                        fontSize: "13px",
                      }}
                    >
                      Talk To Expert
                    </span>{" "}
                    <span>+91 9821805137</span>
                  </p>
                </div>

                {!localStorage?.getItem("isLoggedIn") && (
                  <button
                    className="login-btn"
                    onClick={() => {
                      setDrawerOpen(true);
                    }}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </nav>
        </Wrapper>
      </div>
    </>
  );
};

export default Navbar;
