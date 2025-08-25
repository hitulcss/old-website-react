import React from "react";
import "./EmptyPurchase.css";
import Wrapper from "../../components/Wrapper/Wrapper";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import purchaseIcon from "../../assets/purchase.png";

const EmptyPurchase = () => {
  return (
    <>
      <Navbar />
      <div className="EmptyPurchase_wrapper">
        <Wrapper>
          <p style={{ fontWeight: "500" }}>
            Home {">"} My Profile {">"}{" "}
            <span className="primary_color">My Purchase</span>
          </p>
          <div className="EmptyPurchase_container">
            <img src={purchaseIcon} alt="purchaseicon" loading="lazy" />
            <p>No any purchase</p>
            <button>Explore Now</button>
          </div>
        </Wrapper>
      </div>
      <Footer />
    </>
  );
};

export default EmptyPurchase;
