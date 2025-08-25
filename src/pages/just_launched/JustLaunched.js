import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Wrapper from "../../components/Wrapper/Wrapper";

const JustLaunched = () => {
  return (
    <>
      <Navbar />
      <div className="just_launched">
        <Wrapper>
          <div className="just_launched_wrapper">
            <h1>JUST LAUNCHED</h1>
          </div>
        </Wrapper>
      </div>
      <Footer />
    </>
  );
};

export default JustLaunched;
