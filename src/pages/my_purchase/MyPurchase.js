import React, { useContext, useEffect, useState } from "react";
import "./MyPurchase.css";
import Wrapper from "../../components/Wrapper/Wrapper";
import { GrDownload } from "react-icons/gr";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { CoursesData } from "../../context/courses/Courses";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdArrowDropdown } from "react-icons/io";

const MyPurchase = ({ from }) => {
  const { myPurchaseData, myPurchase, reInitiatePayment, emiInitiatePayment } =
    useContext(CoursesData);

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [courseOrderId, setcourseOrderId] = useState("");

  const toggleDropdown = (id) => {
    setIsDropdownOpen(!isDropdownOpen);
    setcourseOrderId(id);
  };

  useEffect(() => {
    if (isLoggedIn) {
      myPurchase();
    } else {
      navigate(`/login?source=${window?.location?.href}`);
    }
  }, []);

  const handleInvoice = async (e, url, id) => {
    e.preventDefault();

    if (url == "") {
      const token = localStorage.getItem("token");
      const authToken = token;
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${authToken ? authToken : ""}`,
        },
      };
      // console.log("API RESULT => " + process.env.REACT_APP_PRODUCTION_LIVE_URL);
      axios
        .get(
          `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getInVoiceUrl/${id}`,
          config
        )
        .then((res) => {
          if (res.data.status) {
            window.open(res.data?.data, "_blank");
          }
        })
        .catch((e) => console.log(e));
    } else {
      window.open(url, "_blank");
    }
  };

  const handleRepayment = (id) => {
    reInitiatePayment(id);
  };

  const handleEmiPayment = (
    emiId,
    courseOrderId,
    installmentNumber,
    amount
  ) => {
    emiInitiatePayment(emiId, courseOrderId, installmentNumber, amount);
  };

  const navigate = useNavigate();
  // console.log("TT", myPurchaseData)
  return (
    <>
      {from !== "after-login" && <Navbar />}
      <div className="mypurchase_wrapper">
        <Wrapper>
          <p style={{ fontWeight: "500" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (from == "after-login") {
                  navigate("/learning");
                } else {
                  navigate("/");
                }
              }}
            >
              Home
            </span>{" "}
            {">"}{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (from == "after-login") {
                  navigate("/learning/my-profile");
                } else {
                  // navigate('/my-profile')
                  navigate("/learning/my-profile");
                }
              }}
            >
              My Profile
            </span>{" "}
            {">"} <span className="primary_color"> My Purchase</span>
          </p>
          <div className="mypurchase_container">
            <div className="successfull_purchase">
              {myPurchaseData?.map((item, index) =>
                item?.paymentStatus == "success" ? (
                  <div className="purchase_box" key={index}>
                    <div className="purchase_box_upper">
                      <p>Order ID: {item?.orderId}</p>
                      <p className="purchase_successfull">
                        {item.paymentStatus}
                      </p>
                    </div>
                    <p style={{ border: "1px solid #efefef" }}></p>
                    <div className="purchase_box_mid">
                      <img
                        width="100px"
                        height="50"
                        src={item?.batchDetails?.banner[0]?.fileLoc}
                        alt="img"
                        loading="lazy"
                      />
                      <div className="purchase_detail">
                        <p>{item?.batchDetails?.batchName}</p>
                        <p>
                          Payment Amount:{" "}
                          <span style={{ color: "var(--textGray)" }}>
                            {item?.amount == 0 ? "Free" : item?.amount}
                          </span>
                        </p>
                      </div>
                    </div>
                    <p style={{ border: "1px solid #efefef" }}></p>

                    <div className="purchase_box_lower">
                      {/* <a href={item?.invoice[0]?.fileUrl}> */}
                      {!item?.isEmi && (
                        <a
                          className="purchase_download_btn"
                          href={item?.invoice[0]?.fileUrl}
                          // onClick={() => alert("Coming Soon...")}
                        >
                          <GrDownload /> Download Invoice
                        </a>
                      )}

                      <button
                        className="purchase_batch_btn"
                        onClick={() => {
                          if (from == "after-login") {
                            navigate(
                              `/learning/my-courses/c/${item?.batchDetails?.batchSlug}`
                            );
                          } else {
                            navigate(
                              `/learning/my-courses/${item?.batchDetails?.batchSlug}`
                            );
                          }
                        }}
                      >
                        Let's Study
                      </button>
                    </div>

                    {item?.isEmi && (
                      <>
                        <p style={{ border: "1px solid #efefef" }}></p>
                        <div className="dropdown_emi">
                          <div
                            className="dropdown_emi_header"
                            onClick={() => toggleDropdown(item?.courseOrderId)}
                          >
                            <p>Installment</p>
                            <IoMdArrowDropdown />
                          </div>

                          {isDropdownOpen &&
                            courseOrderId == item?.courseOrderId && (
                              <>
                                {" "}
                                <p style={{ border: "1px solid #efefef" }}></p>
                                <div className="dropdown_emi_lower">
                                  <div className="dropdown_emi_lower_container">
                                    {item?.emiArray.map((item2, index) => (
                                      <div
                                        className="dropdown_emi_box"
                                        key={index}
                                      >
                                        <p>{`${item2.installmentNumber} ST-EMI`}</p>
                                        <div className="emi_payment">
                                          <p>Due Date:</p>
                                          <p>{item2.dueDate}</p>
                                        </div>
                                        <div className="emi_payment">
                                          <p>Paid Date:</p>
                                          <p>{item2.paidDate}</p>
                                        </div>
                                        <div className="emi_payment">
                                          <p>Amount:</p>
                                          <p>{item2.amount}</p>
                                        </div>

                                        <div className="emi_buttons">
                                          {" "}
                                          {item2?.paid ? (
                                            <button className="emi_paid_button">
                                              Paid
                                            </button>
                                          ) : item2?.next ? (
                                            <button
                                              onClick={() =>
                                                handleEmiPayment(
                                                  item2?.emiId,
                                                  item2?.courseOrderId,
                                                  item2?.installmentNumber,
                                                  item2?.amount
                                                )
                                              }
                                              className="emi_pay_button"
                                            >
                                              Pay Now
                                            </button>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                        <div
                                          className="emi_payment"
                                          style={{ cursor: "pointer" }}
                                        >
                                          <a
                                            href={item?.invoice[index]?.fileUrl}
                                          >
                                            <GrDownload />
                                          </a>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </>
                            )}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="purchase_box" key={index}>
                    {" "}
                    <div className="purchase_box_upper">
                      <p>Order ID: {item.orderId}</p>
                      <p className="purchase_failed">{item.paymentStatus}</p>
                    </div>
                    <p style={{ border: "1px solid #efefef" }}></p>
                    <div className="purchase_box_mid">
                      <img
                        width="100px"
                        height="50"
                        src={item?.batchDetails?.banner[0]?.fileLoc}
                        alt="img"
                        loading="lazy"
                      />
                      <div className="purchase_detail">
                        <p>{item?.batchDetails?.batchName}</p>
                        <span style={{ color: "var(--textGray)" }}>
                          {item?.amount == 0 ? "Free" : item?.amount}
                        </span>
                      </div>
                    </div>
                    <div className="failed_box_lower">
                      {item.platform == "website" &&
                        item?.courseOrderId != "" && (
                          <button
                            className="pay_again_btn"
                            onClick={() => handleRepayment(item?.courseOrderId)}
                          >
                            Pay Again
                          </button>
                        )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </Wrapper>
      </div>
      {from !== "after-login" && <Footer />}
    </>
  );
};

export default MyPurchase;
