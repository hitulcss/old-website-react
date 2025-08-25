import React, { useEffect, useState } from "react";
import "./CheckoutPage.css";
import { CiShoppingTag } from "react-icons/ci";
import { useContext } from "react";
import SideBar from "../../../components/Sidebar/SideBar";
import NavBar from "../NavBar/NavBar";
import { CoursesData } from "../../../context/courses/Courses";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import CancelIcon from "@mui/icons-material/Cancel";
import { MdOutlineCalendarMonth } from "react-icons/md";
import ValidityPopup from "../ValidityPopup/ValidityPopup";

const AddValidity = () => {
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
    initiatePayment,
    freePurchaseCourses,
    emiInstallment,
    selectedPlan,
    totalAmountOfInstallment,
    getBatchDetailsById,
    course,
    verifyCoupon,
    setVerifyCouponResponse,
    batchPlanData,
    getBatchPlan,
    addValidity,
  } = useContext(CoursesData);

  const navigate = useNavigate();

  //batch slug from params
  const { batchSlug } = useParams();
  useEffect(() => {
    //batch information
    getBatchDetailsById(batchSlug);
  }, []);

  //getBatchPlan
  useEffect(() => {
    if (course?.data?.id) {
      getBatchPlan({ batchId: course?.data?.id });
    }
  }, [course]);

  const location = useLocation();

  const makePayment = () => {
    let amount;
    if (from !== "emi") {
      if (verifyCouponResponse?.status) {
        amount =
          verifyCouponResponse?.data?.couponType == "percentage"
            ? parseFloat(selectedValidity?.salePrice) -
            parseFloat(
              selectedValidity?.salePrice *
              (verifyCouponResponse?.data?.couponValue / 100)
            )
            : parseFloat(
              location?.state?.selectedValidity?.salePrice -
              verifyCouponResponse?.data?.couponValue
            );
      } else {
        amount = parseFloat(selectedValidity?.salePrice);
      }
    } else {
      amount = emiInstallment;
    }

    let CouponId = verifyCouponResponse?.status
      ? verifyCouponResponse?.data?.id
      : null;

    let dataForGenerate = {
      batchId: course?.data?.id,
      coins: 0,
      platform: "website",
      amount: amount?.toFixed(2),
      isEmi: from !== "emi" ? false : true,
      noOfInstallments: from !== "emi" ? "" : selectedPlan,
      eachInstallmentAmount: from !== "emi" ? "" : emiInstallment,
      fullAmount: from !== "emi" ? "" : totalAmountOfInstallment,
      utm_campaign: "",
      utm_medium: "",
      utm_source: "",
      // totalAmount: 1.1,
      couponId: CouponId,
      validityId: selectedValidity?.id
        ? selectedValidity?.id
        : selectedValidity?.validityId,
    };
    // if (selectedValidity) {
    //     dataForGenerate.validityId = selectedValidity?.id;
    // }
    // console.log(dataForGenerate)
    if (amount !== 0) {
      addValidity(dataForGenerate);
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
      linkWith: course?.data?.id,
      link: "batch",
    };
    if (couponCode !== "") {
      verifyCoupon(data);
    } else {
      toast.dismiss();
      toast.error("Enter Valid Coupon");
    }
  };
  const [couponCode, setCouponCode] = useState("");
  const handleCouponInput = (e) => {
    const { value } = e.target;
    setCouponCode(value?.toUpperCase());
  };

  const { setSidebarExpanded, isSidebarExpanded } = useContext(CoursesData);

  //validity

  const [selectedValidity, setSelectedValidity] = useState('');

  useEffect(() => {
    if (course) {
      if (course?.data?.validities?.length > 0) {


        const isRecommendedIndex = course?.data?.validities?.findIndex((item) => item?.isRecommended)
        if (isRecommendedIndex == -1) {
          setSelectedValidity(course?.data?.validities[0])
        } else {
          setSelectedValidity(course?.data?.validities[isRecommendedIndex])
        }

        if (location?.state?.selectedValidity) {
          setSelectedValidity(location?.state?.selectedValidity);
        }
      } else {
        setSelectedValidity({
          id: "",
          salePrice: course?.data?.discount,
          regularPrice: course?.data?.amount,
        });
      }
    }
  }, [course]);

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
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#arrow_svg__a)">
                    <path
                      d="M6.586 6.001 4.111 3.526l.707-.707L8 6.001 4.818 9.183l-.707-.707 2.475-2.475Z"
                      fill="#757575"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="arrow_svg__a">
                      <path fill="#fff" d="M0 0h12v12H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
                <span
                  style={{ color: "var(--textGray)", cursor: "pointer" }}
                  onClick={() => {
                    navigate(
                      `/learning/${course?.data?.categoryDetails?.slug}/${batchSlug}`
                    );
                  }}
                >
                  Course Details
                </span>{" "}
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#arrow_svg__a)">
                    <path
                      d="M6.586 6.001 4.111 3.526l.707-.707L8 6.001 4.818 9.183l-.707-.707 2.475-2.475Z"
                      fill="#757575"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="arrow_svg__a">
                      <path fill="#fff" d="M0 0h12v12H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
                <span
                  style={{ color: "var(--primaryColor)", cursor: "pointer" }}
                >
                  Extend Validity{" "}
                </span>
              </p>

              <div className="checkout_container">
                <div className="checkout_left">
                  <div className="checkout_left_upper">
                    <h1>{course?.data?.batchName}</h1>
                    {/* <p>₹ {location?.state?.selectedValidity?.salePrice}</p> */}
                    <p>₹ {selectedValidity?.salePrice}</p>
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
                            ₹ {selectedValidity?.regularPrice}
                          </p>
                        </div>
                        <div className="checkout_product_amount">
                          <p>Discount</p>
                          <p style={{ color: "green" }}>
                            - ₹{" "}
                            {selectedValidity?.regularPrice -
                              selectedValidity?.salePrice}
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
                                ? (selectedValidity?.salePrice *
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

                        <div className="select-validity">
                          <div>
                            <MdOutlineCalendarMonth />{" "}
                            <p>{selectedValidity?.month} months</p>
                            {/* <p>2 Months</p> */}
                          </div>
                          <div>
                            {batchPlanData && batchPlanData?.length > 1 && (
                              <ValidityPopup
                                state={false}
                                data={batchPlanData}
                                // subCategorySlug={subCategorySlug}
                                course={course}
                                setSelectedValidity={setSelectedValidity}
                                selectedValidity={selectedValidity}
                                from="add-validity"
                              />
                            )}
                          </div>
                        </div>

                        <p style={{ border: "1px solid #dfdfdf" }}></p>
                        <div
                          className="payable_amount"
                          style={{
                            display: "flex",
                            alignItems: "center",
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
                                  selectedValidity?.salePrice -
                                  (selectedValidity?.salePrice *
                                    verifyCouponResponse?.data?.couponValue) /
                                  100
                                ).toFixed(2)
                                : selectedValidity?.salePrice -
                                verifyCouponResponse?.data?.couponValue
                              : selectedValidity?.salePrice) < 0
                              ? 0
                              : verifyCouponResponse?.status
                                ? verifyCouponResponse?.data?.couponType ==
                                  "percentage"
                                  ? (
                                    selectedValidity?.salePrice -
                                    (selectedValidity?.salePrice *
                                      verifyCouponResponse?.data?.couponValue) /
                                    100
                                  ).toFixed(2)
                                  : selectedValidity?.salePrice -
                                  verifyCouponResponse?.data?.couponValue
                                : selectedValidity?.salePrice}
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
          </div>
        </div>
      </>
    </>
  );
};

export default AddValidity;
