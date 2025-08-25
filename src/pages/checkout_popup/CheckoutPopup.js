import React, { useContext, useEffect } from "react";
import "./CheckoutPopup.css";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import StepperBox from "../../components/Steeper/StepperBox";
import CloseIcon from "@mui/icons-material/Close";
import { CoursesData } from "../../context/courses/Courses";
import { useNavigate } from "react-router";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const onClickClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className="checkout_wrapper"
      style={{ padding: "15px" }}
    >
      <div className="dialogbox_header">
        <h2 className="checkout_title">Checkout</h2>
        <CloseIcon onClick={onClickClose} className="close_btn" />
      </div>

      <p style={{ border: "1px solid #dfdfdf" }}></p>

      <div className="popup_wrapper">
        <StepperBox
          coupon={props?.coupon}
          selectedValidity={props?.selectedValidity}
          course={props?.course}
          makePayment={props?.makePayment}
          from={props?.from}
          emiInstallment={props.emiInstallment}
          setValidityState={props.setValidityState}
          validityState={props.validityState}
        />
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const CheckoutPopup = ({
  course,
  payModal,
  setOpen,
  open,
  from,
  emiInstallment,
  selectedValidity,
  validityState,
  setValidityState,
}) => {
  // const [open, setOpen] = React.useState(payModal ? payModal : false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  // console.log('line45', course)
  const navigate = useNavigate();
  // const handleClickOpen = () => {
  //   if (localStorage.getItem('isLoggedIn')) { setOpen(true); }
  //   else (navigate(`/login?ref=${window.location.href}`))
  // };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const { getCoupons, coupon, initiatePayment, freePurchaseCourses } =
    useContext(CoursesData);

  useEffect(() => {}, []);

  useEffect(() => {
    getCoupons();
  }, []);
  // console.log(coupon)
  const makePayment = () => {
    // let amount = 100;
    // const dataForGenerate = {
    //   products: ["6517bf8396ca3c9d6cbc7236"],
    //   totalAmount: amount.toFixed(2),
    //   // totalAmount: 1.1,
    //   // couponId: verifyCouponResponse?.status ? verifyCouponResponse?.data?.id : null,
    //   couponId: null,
    //   // couponId: "657697aab5400554eec28060",
    //   // addressId: addressId?.id,
    //   addressId: null,
    // };
    // // if (addressId !== "") {
    // initiatePayment(dataForGenerate);
    // } else {
    // toast.error("Select Address");
    // }
  };
  return (
    <>
      <div className="checkout_wrapper">
        {/* <button onClick={handleClickOpen} className="buy_now">
          Buy Now
        </button> */}
        {/* <button onClick={() => {
          if (course?.amount == 0) {
            freePurchaseCourses(course?.id)
            setTimeout(() => { navigate('/my-courses') }, 1500)
          } else {

            handleClickOpen()
          }
          // window.open("https://play.google.com/store/apps/details?id=com.sdcampus.app&hl=en&gl=US", "_blank");
        }} className="buy_now">
          Buy Now
        </button> */}
        <SimpleDialog
          makePayment={makePayment}
          emiInstallment={emiInstallment}
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
          course={course}
          selectedValidity={selectedValidity}
          setValidityState={setValidityState}
          validityState={validityState}
          coupon={coupon}
          from={from}
        />
      </div>
    </>
  );
};

export default CheckoutPopup;
