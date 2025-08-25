import React, { useEffect, useState } from "react";
import "./EbookCheckout.css";
import { CiShoppingTag } from "react-icons/ci";
import { useContext } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import CancelIcon from "@mui/icons-material/Cancel";
import NavBar from "../../NavBar/NavBar";
import { CoursesData } from "../../../../context/courses/Courses";
import SideBar from "../../../../components/Sidebar/SideBar";
import { load } from "@cashfreepayments/cashfree-js";
import { CircularProgress } from "@mui/material";

const EbookCheckout = () => {
  let cashfree;
  let insitialzeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
      // mode: "production",
    });
  };

  insitialzeSDK();

  const payment_summary = [
    {
      amount: "1,999",
      discount: "200",
      payable_amount: "1,790",
    },
  ];
  let from = "learning";

  //context data
  const {
    verifyCouponResponse,
    freePurchaseCourses,
    ebook_initiate_payment,
    course,
    verifyCoupon,
    setVerifyCouponResponse,
    getSpecficEbook,
    specificEbook,
  } = useContext(CoursesData);

  const navigate = useNavigate();

  const { setSidebarExpanded, isSidebarExpanded } = useContext(CoursesData);

  //slug ID
  const { ebookId } = useParams();

  //calling api
  useEffect(() => {
    if (ebookId) {
      getSpecficEbook({ slug: ebookId });
    }
  }, [ebookId]);

  //loading
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (specificEbook) {
      setLoading(false);
    }
  }, [specificEbook]);

  const [orderId, setOrderId] = useState();

  const makePayment = async () => {
    let amount;

    if (verifyCouponResponse?.status) {
      amount =
        verifyCouponResponse?.data?.couponType == "percentage"
          ? parseFloat(specificEbook?.salePrice) -
            parseFloat(
              specificEbook?.salePrice *
                (verifyCouponResponse?.data?.couponValue / 100)
            )
          : parseFloat(
              specificEbook?.salePrice - verifyCouponResponse?.data?.couponValue
            );
    } else {
      amount = parseFloat(specificEbook?.salePrice);
    }

    let CouponId = verifyCouponResponse?.status
      ? verifyCouponResponse?.data?.id
      : null;

    const dataForGenerate = {
      ebookId: specificEbook?.id,
      totalAmount: amount.toFixed(2),
    };
    // const dataForGenerate = {
    //     batchId: course?.data?.id,
    //     totalAmount: amount?.toFixed(2),
    //     isEmi: from !== "emi" ? false : true,
    //     noOfInstallments: from !== "emi" ? "" : selectedPlan,
    //     eachInstallmentAmount: from !== "emi" ? "" : emiInstallment,
    //     fullAmount: from !== "emi" ? "" : totalAmountOfInstallment,
    //     utm_campaign: "",
    //     utm_medium: "",
    //     utm_source: "",
    //     // totalAmount: 1.1,
    //     couponId: CouponId,
    // };

    if (amount !== 0) {
      // let response = ebook_initiate_payment(dataForGenerate);
      try {
        const response = await ebook_initiate_payment(dataForGenerate);
        // debugger;

        let sessionId = response?.sessionId;

        setOrderId(response?.orderId);
        let checkoutOptions = {
          paymentSessionId: sessionId,
          redirectTarget: "_modal",
        };
        cashfree.checkout(checkoutOptions).then((res) => {
          // deleteProductFromCarts()
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      freePurchaseCourses(course?.data?.id);
      setTimeout(() => {
        localStorage.setItem("index", 1);
        navigate("/learning/my-courses");
      }, 1500);
    }
  };

  //coupon

  const [couponReset, setCouponReset] = useState(true);
  const handleVerifyCouponCode = () => {
    let helper = [];
    setCouponReset(true);
    const data = {
      couponCode: couponCode,
      // link: item?.link,
      // linkWith: course?.data?.id,
      linkWith: specificEbook?.id,
      link: "batch",
    };
    if (couponCode !== "") {
      verifyCoupon(data);
    } else {
      toast.error("Enter Valid Coupon");
    }
  };
  const [couponCode, setCouponCode] = useState("");
  const handleCouponInput = (e) => {
    setCouponCode(e.target.value);
  };
  // console.log('Specific Ebook', specificEbook)

  return (
    <>
      <>
        <div className="after_login_wrapper">{/* <MyDrawer /> */}</div>
        <NavBar width={isSidebarExpanded ? 250 : 93} />
        <Toaster />

        {/* <MyCourses from='after-login' /> */}
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
            {" "}
            {loading ? (
              <div
                style={{
                  height: "70vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <div className="checkout_wrapper2">
                {/* <p>
              {" "}
              Home {">"} Course Details {">"} Checkout
            </p> */}
                <p style={{ fontWeight: "500", marginBottom: "1rem" }}>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/learning");
                    }}
                  >
                    Home
                  </span>{" "}
                  {">"}{" "}
                  <span
                    style={{ color: "var(--textGray)", cursor: "pointer" }}
                    onClick={() => {
                      navigate("/learning/e-book/3");
                    }}
                  >
                    Ebooks
                  </span>{" "}
                  {">"}{" "}
                  <span
                    style={{
                      color: "var(--primaryColor)",
                      cursor: "pointer",
                    }}
                  >
                    Checkout{" "}
                  </span>
                </p>

                <div className="checkout_container">
                  <div className="checkout_left">
                    <div className="checkout_left_upper">
                      <h1>{specificEbook?.title}</h1>
                      <p>₹ {specificEbook?.salePrice}</p>
                    </div>

                    {/* <div className="checkbox_container">
                  <input type="checkbox" />
                  <p>Apply Coins 30 Coins.</p>
                </div> */}
                  </div>
                  <div className="checkout_payment">
                    {payment_summary.map((item, index) => (
                      <div className="checkout_payment_box" key={index}>
                        <h2>Payment Summary</h2>
                        <p style={{ border: "1px solid #dfdfdf" }}></p>
                        <div className="checkout_payment_lower">
                          <div className="checkout_product_amount">
                            <p>Product Amount</p>
                            <p style={{ color: "#000" }}>
                              ₹ {specificEbook?.salePrice}
                            </p>
                          </div>
                          {verifyCouponResponse?.status && couponReset && (
                            <div
                              className="price_lower"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "5px",
                                marginBottom: "5px",
                                fontSize: "12px",
                                paddingLeft: "5px",
                                paddingRight: "5px",
                              }}
                            >
                              <p>
                                EXTRA{" "}
                                {verifyCouponResponse?.data?.couponType ==
                                "percentage"
                                  ? `${verifyCouponResponse?.data?.couponValue}%`
                                  : `₹${verifyCouponResponse?.data?.couponValue}`}{" "}
                                OFF APPLIED
                              </p>
                              <p style={{ color: "green " }}>
                                - ₹{" "}
                                {verifyCouponResponse?.data?.couponType ==
                                "percentage"
                                  ? (specificEbook?.salePrice *
                                      verifyCouponResponse?.data?.couponValue) /
                                    100
                                  : verifyCouponResponse?.data?.couponValue}
                              </p>
                            </div>
                          )}
                          {/* <div className="checkout_product_discount">
                        <p>Discount</p>
                        <p>-₹ {course?.data?.amount}</p>
                      </div> */}
                          <div className="checkout_coupon_input">
                            <CiShoppingTag />
                            <input
                              type="text"
                              value={couponCode}
                              placeholder="Have Coupon Code?"
                              onChange={handleCouponInput}
                            />
                            {(verifyCouponResponse
                              ? verifyCouponResponse?.status
                              : verifyCouponResponse || couponReset) && (
                              <p onClick={handleVerifyCouponCode}>Apply</p>
                            )}
                            {(verifyCouponResponse
                              ? verifyCouponResponse?.status
                              : verifyCouponResponse || !couponReset) && (
                              <CancelIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setCouponReset(true);
                                  setVerifyCouponResponse("");
                                  setCouponCode("");
                                }}
                              />
                            )}
                          </div>

                          <p style={{ border: "1px solid #dfdfdf" }}></p>
                          <div
                            className="payable_amount"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              color: "#000",
                              fontWeight: "600",
                            }}
                          >
                            <p>Payable Amount</p>
                            <p>
                              ₹{" "}
                              {(verifyCouponResponse?.status
                                ? verifyCouponResponse?.data?.couponType ==
                                  "percentage"
                                  ? (
                                      specificEbook?.salePrice -
                                      (specificEbook?.salePrice *
                                        verifyCouponResponse?.data
                                          ?.couponValue) /
                                        100
                                    ).toFixed(2)
                                  : specificEbook?.salePrice -
                                    verifyCouponResponse?.data?.couponValue
                                : specificEbook?.salePrice) < 0
                                ? 0
                                : verifyCouponResponse?.status
                                ? verifyCouponResponse?.data?.couponType ==
                                  "percentage"
                                  ? (
                                      specificEbook?.salePrice -
                                      (specificEbook?.salePrice *
                                        verifyCouponResponse?.data
                                          ?.couponValue) /
                                        100
                                    ).toFixed(2)
                                  : specificEbook?.salePrice -
                                    verifyCouponResponse?.data?.couponValue
                                : specificEbook?.salePrice}
                            </p>
                          </div>
                          <button
                            className="checkout_btn"
                            onClick={() => makePayment()}
                          >
                            Proceed To Buy
                          </button>

                          <div className="checkout_lower"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default EbookCheckout;
