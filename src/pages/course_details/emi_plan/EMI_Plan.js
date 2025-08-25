import React, { useContext, useEffect, useState } from "react";
import "./EMI_Plan.css";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useNavigate } from "react-router";
import { CoursesData } from "../../../context/courses/Courses";
import toast, { Toaster } from "react-hot-toast";
import emiPic1 from "../../../assets/emiPic1.png";
import emiPic2 from "../../../assets/emiPic2.png";
import emiPic3 from "../../../assets/emiPic3.png";
import recommPic from "../../../assets/recommended.png";
import Slider from "react-slick";
import { LuBadgePercent } from "react-icons/lu";

const EMI_Plan = ({
  course,
  handleClickOpen,
  setFrom,
  handleClickScrollForCallback,
}) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const { verifyCoupon, verifyCouponResponse, setVerifyCouponResponse } =
    useContext(CoursesData);

  // console.log("verifyCoiupon", verifyCouponResponse);
  const navigate = useNavigate();
  const {
    freePurchaseCourses,
    setEmiInstallment,
    emiInstallment,
    setSelectedPlan,
    selectedPlan,
    setTotalAmountOfInstallment,
  } = useContext(CoursesData);

  // const [selectedPlan, setSelectedPlan] = useState(course?.data?.emiOptions[0]);
  // const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emiSelected, setEmiSelected] = useState(true);
  const [couponApplied, setCouponApplied] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  useEffect(() => { }, []);

  const handleVerifyCoupon = () => {
    const data = {
      couponCode: couponCode,
      // link: item?.link,
      linkWith: course?.data?.id,
      link: "batch_emi",
    };

    if (couponCode !== "") {
      verifyCoupon(data);
    } else {
      toast.error("Enter Coupon Code...");
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const emi_slider = [
    {
      img: emiPic1,
      title: "Interactive Live Classes",
      descrip:
        "Live Chat with the teacher, engage in discussion and Ask’s Doubts - all during a class.",
    },
    {
      img: emiPic2,
      title: "Structured Courses",
      descrip:
        "All our courses are structured in line with your  exam syllabus to help you best prepare for it",
    },
    {
      img: emiPic3,
      title: "Live Test and Quizzes",
      descrip:
        "Take live Mock Tests curated in line with the exam pattern and stay on track with your preparation",
    },
  ];

  // useEffect(() => {
  //   // Automatically slide every 3 seconds
  //   const interval = setInterval(() => {
  //     const nextIndex = (currentIndex + 1) % emi_slider.length;
  //     setCurrentIndex(nextIndex);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [currentIndex, emi_slider.length]);

  // useEffect(()=>)
  // console.log('Course Emi', couponCode)
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    prevArrow: false,
    nextArrow: false,
  };

  return (
    <>
      <Toaster />
      <div className="emi_plan_wrapper">
        <div className="emi_plan_container">
          <div className="emi_plan_header">
            {" "}
            <h1>
              <span style={{ color: "#E4174F" }}>Best Plan</span> For Your
              Preparation
            </h1>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "var(--textGray)",
              }}
            >
              {" "}
              <span style={{ color: "var(--primaryColor)" }}>
                {" "}
                <LuBadgePercent className="emi_icon" />
              </span>
              Best EMI Plan & Pricing
            </p>
          </div>

          <div className="emi_plan_lower">
            <div className="emi_plan_lower_left">
              <Slider {...settings}>
                {emi_slider?.map((item, index) => {
                  return (
                    <div className="emi_left_slider" key={index}>
                      <img src={item?.img} alt="slideImg"></img>
                      <div className="emi_left_descrip">
                        {" "}
                        <h2>{item?.title}</h2>
                        <p>{item?.descrip} </p>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>

            <div className="emi_plan_lower_right">
              <div className="pick_plan_wrapper">
                <div className="pick_plan_container">
                  {/* <img
                    src={recommPic}
                    alt="recommended"
                    className="recommended-img"
                  /> */}
                  {course?.data?.emiOptions
                    ?.sort((a, b) => (parseInt(a) > parseInt(b) ? 1 : -1))
                    .map((item, index) => (
                      <div
                        key={index}
                        className="emi_plan_box"
                        style={{
                          cursor: "pointer",
                          border:
                            selectedPlan == item
                              ? "2px solid #36CF68"
                              : "1px solid #d9d9d9",
                          background: selectedPlan == item ? "#E2FFEC" : "",
                        }}
                        onClick={() => {
                          setCouponApplied(false);
                          setSelectedIndex(index);
                          setSelectedPlan(item);
                          setEmiSelected(true);
                        }}
                      >
                        {(index == 0 ? true : false) && (
                          <img
                            src={recommPic}
                            alt="recommended"
                            className="recommended-img"
                          />
                        )}
                        <div className="emi_plan_box_left">
                          <p className="emi_month">
                            {item} {item == 1 ? "MONTH" : "MONTHS"}
                          </p>
                          <p
                            className="emi_discount"
                            style={{ color: "green" }}
                          >
                            {" "}
                            {item == 1
                              ? "Apply Coupon & Save ₹2000"
                              : item == 2
                                ? "Apply Coupon & Save ₹1000"
                                : ""}
                          </p>
                        </div>
                        <div className="emi_plan_box_right">
                          <p className="emi_amount">
                            ₹{(course?.data?.discount / item).toFixed(1)}
                            <span
                              style={{
                                color: "var(--textGray)",
                                fontWeight: "500",
                              }}
                            >
                              {" "}
                              /mo
                            </span>
                          </p>
                          <p className="plan_total_amount">
                            TOTAL ₹{course?.data?.discount}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>

                {emiSelected && (
                  <div className="emi_coupon">
                    {(selectedPlan == 1 || selectedPlan == 2) && (
                      <>
                        <MdOutlineLocalOffer className="emi_coupon_icon" />
                        <input
                          type="text"
                          className="emi_coupon_input"
                          placeholder="Have Coupon Code?"
                          onChange={(e) => {
                            setCouponCode(e.target.value);
                          }}
                        />
                        <span
                          className="coupon_input_select_button"
                          onClick={() => {
                            setCouponApplied(true);
                            handleVerifyCoupon();
                          }}
                        >
                          Apply
                        </span>
                      </>
                    )}
                    <button
                      className="enroll_emi_button"
                      onClick={() => {
                        if (course?.data?.amount == 0) {
                          setTimeout(() => {
                            localStorage.setItem('index', 1)
                            navigate("/learning/my-courses");
                          }, 1500);
                        } else {
                          if (selectedPlan == "") {
                            toast.dismiss()
                            toast.error("Please select a plan first");
                          } else {
                            let helper =
                              selectedPlan !== ""
                                ? selectedPlan == 1
                                  ? course?.data?.discount - 2000
                                  : selectedPlan == 2
                                    ? course?.data?.discount - 1000
                                    : course?.data?.discount
                                : 0;

                            // console.log("helper", helper);
                            setTotalAmountOfInstallment(helper);
                            setFrom("emi");
                            handleClickOpen();
                            setEmiInstallment(
                              couponApplied
                                ? verifyCouponResponse?.status
                                  ? selectedPlan == 1
                                    ? course?.data?.discount - 2000
                                    : selectedPlan == 2
                                      ? (course?.data?.discount - 1000) / 2
                                      : course?.data?.discount / selectedPlan
                                  : course?.data?.discount / selectedPlan
                                : course?.data?.discount / selectedPlan
                            );
                          }
                        }
                      }}
                    >
                      Enroll Now
                    </button>
                  </div>
                )}
              </div>
              <p className="request_callback">
                Need mentor assistance?{" "}
                <span
                  style={{
                    color: "var(--primaryColor)",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Request Callback
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EMI_Plan;
