import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Wrapper from "../../components/Wrapper/Wrapper";

const Our_Initiative = () => {
  return (
    <>
      <Navbar />
      <div className="our_initiative">
        <Wrapper>
          <div className="initiative_wrapper">
            <h1>OUR INITIATIVE</h1>
          </div>
        </Wrapper>
      </div>
      <Footer />
    </>
  );
};

export default Our_Initiative;
