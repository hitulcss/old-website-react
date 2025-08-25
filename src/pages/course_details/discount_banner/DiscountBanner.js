import React, { useState, useEffect } from "react";
import "./DiscountBanner.css";
import CheckoutPopup from "../../checkout_popup/CheckoutPopup";
import ValidityModal from "../../after_login/ValidityPopup/ValidityPopup";

const DiscountBanner = ({ course, payModal, setOpen, open, from, emiInstallment, selectedValidity, data, batchPlanData, setSelectedValidity }) => {
  const [isFixed, setIsFixed] = useState(false);

  // console.log('IN DISCOUNT ', emiInstallment)
  const [validityState, setValidityState] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 350;

      setIsFixed(scrollPosition > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
      // className={`discount_wrapper ${isFixed ? "bannerfixed" : ""}`}
      // data-aos="fade-right"
      >
        {/* <div className="discount_left">
          <h1>{course?.batchName}</h1>
          <h2>
            {course && course.amount > 0 ? (
              <>
                ₹{course.discount}
                <span className="old_price">
                  <del>₹{course.amount}</del>
                </span>
                <span className="saved_amount">
                  (Saved ₹{course.amount - course.discount})
                </span>
              </>
            ) : (
              <span style={{ color: "green" }}>Free</span>
            )}
          </h2>

        </div> */}
        <div className="discount_right">
          <div>
            {batchPlanData && batchPlanData?.length > 1 && < ValidityModal state={validityState} setValidityState={setValidityState} data={batchPlanData} course={data} setSelectedValidity={setSelectedValidity} selectedValidity={selectedValidity} from='checkout' />}
          </div>

          <CheckoutPopup course={course} selectedValidity={selectedValidity} validityState={validityState} setValidityState={setValidityState} payModal={payModal} setOpen={setOpen} open={open} from={from} emiInstallment={emiInstallment} />
        </div>
      </div>
    </>
  );
};

export default DiscountBanner;
