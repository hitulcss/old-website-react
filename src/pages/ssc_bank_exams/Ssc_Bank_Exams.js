import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Wrapper from "../../components/Wrapper/Wrapper";

const Ssc_Bank_Exams = () => {
  return (
    <>
      <Navbar />
      <div className="ssc_bank_exam">
        <Wrapper>
          <div className="ssc_bank_exam_wrapper">
            <h1>SSC BANK EXAMS</h1>
          </div>
        </Wrapper>
      </div>
      <Footer />
    </>
  );
};

export default Ssc_Bank_Exams;
