import React, { useContext, useState } from "react";
import "./StepperBox.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ApplyCoupon from "../../pages/checkout_popup/apply_coupon/ApplyOffers";
import { CoursesData } from "../../context/courses/Courses";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { pushToDataLayer } from "../../gtm/gtm";
import { Divider } from "@mui/material";

const steps = ["Apply Offers", "Payments"];

const StepperBox = ({
  coupon,
  course,
  from,
  selectedValidity,
  setValidityState,
  validityState,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleStep = (step) => () => {
  //   setActiveStep(step);
  // };

  // const handleComplete = () => {
  //   const newCompleted = completed;
  //   newCompleted[activeStep] = true;
  //   setCompleted(newCompleted);
  //   handleNext();
  // };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const [selectedCoupon, setSelectedCoupon] = useState({
    name: "",
    value: "",
    type: "",
  });

  const {
    verifyCouponResponse,
    initiatePayment,
    freePurchaseCourses,
    emiInstallment,
    selectedPlan,
    totalAmountOfInstallment,
  } = useContext(CoursesData);

  const navigate = useNavigate();

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
              selectedValidity?.salePrice -
              verifyCouponResponse?.data?.couponValue
            );
      } else {
        amount = parseFloat(selectedValidity?.salePrice);
      }
    } else {
      amount = emiInstallment;
    }
    // amount = parseFloat(2);

    let CouponId = verifyCouponResponse?.status
      ? verifyCouponResponse?.data?.id
      : null;

    let dataForGenerate = {
      batchId: course?.id,
      // validityId: selectedValidity?.id ?? '',
      amount: amount.toFixed(2),
      coins: 0,
      isEmi: from !== "emi" ? false : true,
      noOfInstallments: from !== "emi" ? "" : selectedPlan,
      eachInstallmentAmount: from !== "emi" ? "" : emiInstallment,
      fullAmount: from !== "emi" ? "" : totalAmountOfInstallment,
      utm_campaign: "",
      utm_medium: "",
      utm_source: "",
      platform: "website",
      // totalAmount: 1.1,
      couponId: CouponId,
    };
    if (selectedValidity?.id !== "" || selectedValidity?.validityId !== "") {
      dataForGenerate.validityId = selectedValidity?.id
        ? selectedValidity?.id
        : selectedValidity?.validityId;
    }

    if (amount !== 0) {
      pushToDataLayer({
        ecommerce: null, // Clear the previous ecommerce object.
      });
      pushToDataLayer({
        event: "begin_checkout",
        isLoggedIn: localStorage?.getItem("isLoggedIn"),
        coupon: verifyCouponResponse?.status
          ? verifyCouponResponse?.data?.couponCode
          : "",
        paymentOption: "online",
        ecommerce: {
          items: {
            item_id: course?._id ? course?._id : course?.id,
            item_name: course.title,
            affiliation: course.categoryDetails.title,

            discount: parseInt(
              selectedValidity?.regularPrice - selectedValidity?.salePrice
            ),
            index: 0,
            item_brand: "Book",
            item_category: course.categoryDetails.title,
            price: parseInt(selectedValidity?.salePrice),
            quantity: 1,
          },
        },
      });

      pushToDataLayer({
        ecommerce: null, // Clear the previous ecommerce object.
      });
      pushToDataLayer({
        event: "add_payment_info",
        isLoggedIn: localStorage?.getItem("isLoggedIn"),
        ecommerce: {
          payment_type: "online", // Specify the type of payment method used
        },
      });
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cart: course,
          coupon: verifyCouponResponse?.status
            ? verifyCouponResponse?.data?.couponCode
            : "",
          amount: selectedValidity?.salePrice,
          shippingCharges: 0,
        })
      );
      // console.log(dataForGenerate)
      initiatePayment(dataForGenerate);
    } else {
      freePurchaseCourses(course?.id);
      setTimeout(() => {
        localStorage.setItem('index', 1)
        navigate("/learning/my-courses");
      }, 1500);
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Toaster />
        {/* <Stepper nonLinear activeStep={activeStep} className="stepper">
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]} className="steps">
              <StepButton
                color="inherit"
                onClick={handleStep(index)}
                className="steps"
              >
                <span className="steps_label">{label}</span>
              </StepButton>
            </Step>
          ))}
        </Stepper> */}
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <button onClick={handleReset} className="backtooffers">
                  Back To Offers
                </button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <ApplyCoupon
                  coupon={coupon}
                  selectedCoupon={selectedCoupon}
                  setSelectedCoupon={setSelectedCoupon}
                  course={course}
                  selectedValidity={selectedValidity}
                  setValidityState={setValidityState}
                  validityState={validityState}
                  from={from}
                  emiInstallment={emiInstallment}
                />
              )}
              {/* {activeStep === 1 && <Payment setSelectedCoupon={setSelectedCoupon} />} */}
              <p style={{ border: "1px solid #efefef", marginTop: "15px" }}></p>
              <Box sx={{ pt: 2, display: "flex", justifyContent: "center" }}>
                <Box />
                <button
                  onClick={() => {
                    makePayment();
                    // handleComplete();
                  }}
                  className="continue_button"
                >
                  Make Payment
                </button>
                {/* {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <p
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        color: "red",
                      }}
                      className="step_completed"
                    >
                      Step {activeStep + 1} already completed
                    </p>
                  ) : (
                    <button
                      onClick={() => {
                        makePayment();
                        handleComplete();
                      }}
                      className="continue_button"
                    >
                      Make Paymentt
                    </button>
                  ))} */}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
    </>
  );
};

export default StepperBox;
