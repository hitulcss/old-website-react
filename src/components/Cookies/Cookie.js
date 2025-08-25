import React, { useState } from "react";
import "./Cookle.css";
import Wrapper from "../Wrapper/Wrapper";
import { MdOutlineCookie } from "react-icons/md";
import Cookies from "js-cookie";
import cookie from "../../assets/cookie.png";

const Cookie = () => {
  const [isCookieSet, setCookie] = useState(Cookies.get("cookieConsent"));
  const [cookiePermission, setCookiePermission] = useState(
    Cookies.get("permission")
  );

  const [show, setShow] = useState(false);

  const handleAcceptCookies = () => {
    Cookies.set("cookieConsent", true);
    Cookies.set("permission", true);
    setCookie(true);
    setCookiePermission(true);
    setShow(true);
  };

  // Function to handle rejecting cookies
  const handleRejectCookies = () => {
    Cookies.remove("cookieConsent");
    Cookies.set("permission", true);
    setCookiePermission(true);
    setCookie(false);
    setShow(true);
  };
  return (
    <>
      <div
        className="cookie_wrapper"
        style={{
          display: cookiePermission ? "none" : "",
        }}
      >
        <Wrapper>
          <div className="cookie_container">
            <img src={cookie} alt="cookie" loading="lazy" />
            {/* <MdOutlineCookie size={20} className="cookie_icon" /> */}
            <p>
              This website uses cookies to ensure you get the best experience on
              our website. 
            </p>

            <div className="cookie_btn">
              <button onClick={handleAcceptCookies} className="cookie-accept">
                Accept
              </button>
              <button onClick={handleRejectCookies} className="cookie-reject">
                Reject
              </button>
            </div>
          </div>
        </Wrapper>{" "}
      </div>
    </>
  );
};

export default Cookie;
