import React, { useContext, useEffect, useState } from "react";
import "./Wallet.css";
import coinImg from "../../../assets/coinImg.png";
import pointsImg from "../../../assets/earnpoints.png";
import earnMoneyImg from "../../../assets/earnmoney.png";
import { FaCaretRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import SideBar from "../../../components/Sidebar/SideBar";
import NavBar from "../NavBar/NavBar";
import { CoursesData } from "../../../context/courses/Courses";
import toast, { Toaster } from "react-hot-toast";
import { HeadProvider, Title } from "react-head";

const Wallet = () => {
  //wallet details
  const { getRefaralTxn, walletDetails } = useContext(CoursesData);
  useEffect(() => {
    getRefaralTxn();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-wrapper")) {
      closeModal();
    }
  };

  const { setSidebarExpanded, isSidebarExpanded, withdrawalRequest } =
    useContext(CoursesData);

  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState(0);

  const handleWithdrawl = () => {
    if (
      amount !== 0 &&
      amount > 300 &&
      amount < walletDetails?.walletAmount &&
      upiId !== ""
    ) {
      withdrawalRequest({ upiId, amount });
    } else {
      if (amount < 300) {
        toast.error("Amount can't be less than 300");
      }
      if (amount > walletDetails?.walletAmount) {
        toast.error("Amount can't be greator than wallet amount");
      }
      if (upiId == "") {
        toast.error("Upi Id can't be empty");
      }
      // toast.error('Enter correct details....')
    }
  };

  return (
    <>
      <HeadProvider>
        <Title>Wallet - SD Campus </Title>
      </HeadProvider>
      <Toaster />
      <NavBar width={isSidebarExpanded ? 250 : 93} />
      <div>
        {" "}
        <SideBar />
        <div
          className={
            isSidebarExpanded
              ? "after-login-mid open-sidebar"
              : "after-login-mid closed-sidebar"
          }
          style={{ marginLeft: isSidebarExpanded ? "250px" : "100px" }}
        >
          <div className="wallet_wrapper">
            <div className="wallet_container">
              <div className="wallet_balance" data-aos="fade-left">
                <div className="wallet_left">
                  {" "}
                  <h1>₹ {walletDetails?.walletAmount}</h1>
                  <h2>Wallet balance</h2>
                  {walletDetails?.walletAmount > 300 ? (
                    <button style={{ cursor: "pointer" }} onClick={toggleModal}>
                      Redeem Now
                    </button>
                  ) : (
                    "Wallet amount should be greator than 300 for withdrawl"
                  )}
                </div>

                <img src={coinImg} alt="referCoin" loading="lazy" />
              </div>
              {isOpen && (
                <div className="modal-wrapper" onClick={handleOverlayClick}>
                  <div className="modal-container" data-aos="fade-left">
                    <button className="close-button" onClick={toggleModal}>
                      <IoClose />
                    </button>
                    <div className="wallet_modal_inputs">
                      <input
                        onChange={(e) => {
                          setUpiId(e.target.value);
                        }}
                        placeholder="Entter UPI Id"
                      />
                      <input
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                        type="number"
                        placeholder="Enter Amount"
                      />
                      <button onClick={() => handleWithdrawl()}>Submit</button>
                    </div>
                  </div>
                </div>
              )}

              <div className="help_friends_wrapper" data-aos="fade-left">
                <div className="help_friends">
                  <div className="help_friends_left">
                    {" "}
                    <img src={pointsImg} alt="helpfriends" />
                    <h2>
                      <span style={{ color: "var(--primaryColor)" }}>
                        Help your Friends & Earn
                      </span>{" "}
                      points to unlock premium Content{" "}
                    </h2>
                  </div>
                  <FaCaretRight className="wallet_icon" />
                </div>
              </div>

              <div className="transaction_wrapper" data-aos="fade-left">
                <h2>Transaction History</h2>
                <div className="transction_container">
                  {walletDetails?.transactions?.map((item, index) => (
                    <div className="transaction_history_box" key={index}>
                      <div className="transaction_left">
                        <img src={earnMoneyImg} alt="" />
                        <div>
                          <p
                            className="rewardtitle"
                            style={{
                              color: item?.action == "add" ? "green" : "red",
                            }}
                          >
                            {item?.action == "add"
                              ? "Reward Added"
                              : "Amount Withdrawal"}
                          </p>
                          <p className="reward_via">Via {item?.reason}</p>
                          <p className="reward_date">
                            {item?.dateTime?.split(" ")[0]}
                          </p>
                        </div>
                      </div>
                      <div
                        className="transaction_right"
                        style={{
                          color: item?.action == "add" ? "green" : "red",
                        }}
                      >
                        {item?.action == "add" ? "+" : "-"}
                        {item?.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;
