import React, { useContext, useEffect, useState } from "react";
import "./ApplyOffers.css";
import { CoursesData } from "../../../context/courses/Courses";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineSyncAlt } from "react-icons/md";
// import { CoursesData } from "../../../context/courses/Courses";
// import { padding } from "@mui/system";

const ApplyCoupon = ({
  coupon,
  selectedValidity,
  selectedCoupon,
  setSelectedCoupon,
  course,
  from,
  setValidityState,
  validityState,
}) => {
  const [couponReset, setCouponReset] = useState(true);
  
  const withBookPrice = 1500;
  const {
    // addToCart,
    // cart,
    // deleteProductFromCarts,
    verifyCouponResponse,
    // getCoupons,
    // coupon,
    // generateOrderId,
    // initiatePayment,
    verifyCoupon,
    // setPrice,
    // course?.amount,
    setWithBook,
    withBook,
    setEmiInstallment,
    emiInstallment,
    setVerifyCouponResponse,
  } = useContext(CoursesData);
  // console.log('emi install', emiInstallment)
  // const { freePurchaseCourses, setEmiInstallment, emiInstallment } = useContext(CoursesData)
  useEffect(() => {
    setCouponReset(false);
    setVerifyCouponResponse("");
  }, []);

  const handleVerifyCouponCode = () => {
    let helper = [];
    setCouponReset(true);
    const data = {
      couponCode: couponCode,
      // link: item?.link,
      linkWith: course?.id,
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
    const value = e.target.value;

    setCouponCode(value.toUpperCase());
  };

  //new validity date
  const addMonthsToDate = (monthsToAdd) => {
    const currentDate = new Date();
    if (monthsToAdd == "5") {
      // If the validity is 5 days, set the date to 5 days from now
      currentDate.setDate(currentDate.getDate() + 5);
      return currentDate.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).replace(/\s+/g, ""); // Format to remove separators like commas
    }
    currentDate.setMonth(currentDate.getMonth() + monthsToAdd);

    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);

    // Format to remove separators like commas, e.g., "19 Dec 2025" -> "19Dec2025"
    return formattedDate.replace(/\s+/g, "");
  };

  useEffect(() => {
    console.log("withBook", withBook);
  }, [withBook]);

  return (
    <>
      <Toaster />
      <div className="applyoffer_wrapper">
        <div className="applyoffer_left">
          <div className="course_details_info2">
            <img src={course?.banner} alt="poster" />
            <div className="checkout-order-description">
              <h2>
                {" "}
                {course?.batchName?.slice(0, 70)}
                {course?.batchName?.length > 70 ? ".." : ""}
              </h2>

              <div className="payable_price">
                <div>
                  <span className="checkout-saleprice">
                    ₹ {selectedValidity?.salePrice}
                  </span>
                  <span className="checkout-regularPrice">
                    {" "}
                    {""}
                    <del>₹ {selectedValidity?.regularPrice}</del>
                  </span>{" "}
                </div>

                <div className="checkout-discount-percentage">
                  <p>
                    {" "}
                    {(
                      ((selectedValidity?.regularPrice -
                        selectedValidity?.salePrice) /
                        selectedValidity?.regularPrice) *
                      100
                    ).toFixed(0)}
                    % OFF
                  </p>
                </div>
              </div>
            </div>
            <div className="validity2">
              <p>
                <span style={{ color: "var(--textGray)" }}>
                  Batch Valid for {selectedValidity?.month} {
                    (selectedValidity?.month == '5') ? "days" : "Months"
                  } Till{" "}
                  <span style={{ color: "black" }}>
                    {addMonthsToDate(selectedValidity?.month)}
                  </span>
                </span>
              </p>
              <p
                onClick={() => {
                  setValidityState(!validityState);
                }}
              >
                {" "}
                <MdOutlineSyncAlt />
                Change Validity{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="applyoffer_right_side">
          <h3>Payment Summary</h3>

          <div className="order_detail">
            <p style={{ border: "1px solid #eeee", marginTop: "5px" }}></p>
            <div
              className="payable_amount"
              style={{
                display: "flex",
                height: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <div className="subtotal">
                <span className="subtotal_upper">
                  <div className="subtotal_left">
                    <p>Total Amount </p>
                    {/* {selectedCoupon?.name && (
                      <p className="discount_cuopan_name">
                        Discount(Coupon {selectedCoupon?.name})
                      </p>
                    )} */}
                  </div>

                  <div className="subtotal_right">
                    <p>
                      {" "}
                      &nbsp;₹{" "}
                      {from !== "emi"
                        ? selectedValidity?.regularPrice
                        : emiInstallment?.toFixed(1)}{" "}
                    </p>
                    {selectedCoupon?.name && <p>-₹ {selectedCoupon?.value}</p>}
                  </div>
                </span>

                <div className="checkout-popup-discount">
                  {" "}
                  <p>Discount</p>
                  <p style={{ color: "#1E7026" }}>
                    -₹
                    {selectedValidity?.regularPrice -
                      selectedValidity?.salePrice}
                  </p>
                </div>

                {from !== "emi" && (
                  <div className="coupon_applied">
                    <LocalOfferIcon
                      fontSize="small"
                      sx={{ color: "#b042f5" }}
                    />
                    <input
                      type="text"
                      className="coupon_input"
                      placeholder="Have Coupon Code?"
                      value={couponCode}
                      onChange={handleCouponInput}
                    />
                    <span
                      className="coupon_input_select_button"
                      onClick={() => handleVerifyCouponCode()}
                    >
                      Apply
                    </span>
                  </div>
                )}
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
                      {verifyCouponResponse?.data?.couponType == "percentage"
                        ? `${verifyCouponResponse?.data?.couponValue}%`
                        : `₹${verifyCouponResponse?.data?.couponValue}`}{" "}
                      OFF APPLIED
                    </p>
                    <p style={{ color: "green " }}>
                      - ₹{" "}
                      {verifyCouponResponse?.data?.couponType == "percentage"
                        ? (selectedValidity?.salePrice *
                          verifyCouponResponse?.data?.couponValue) /
                        100
                        : verifyCouponResponse?.data?.couponValue}
                    </p>
                  </div>
                )}
              </div>
              {/* <label className=" hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                <input
                  type="checkbox"
                  name="withBook"
                  value={withBook??0}
                  id="toggle-2"
                  checked={withBook}
                  onChange={(e) => {
                    setWithBook(e.target.checked);
                  }}
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
                <div className="grid gap-1.5 font-normal">
                  <p className="text-sm leading-none font-medium">With Book</p>
                  <p className="text-muted-foreground text-sm">
                    If you need book then check the checkbox (+₹{withBookPrice})
                  </p>
                </div>
              </label> */}
              <div style={{ width: "100%" }}>
                {" "}
                <p
                  style={{ border: "1px solid #eeee", marginBottom: "5px" }}
                ></p>
                <span className="subtotal_lower">
                  <p>Payable Amount</p>
                  <p>
                    ₹
                    {from !== "emi"
                      ? (verifyCouponResponse?.status
                        ? verifyCouponResponse?.data?.couponType == "percentage"
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
                          ? verifyCouponResponse?.data?.couponType == "percentage"
                            ? (
                              selectedValidity?.salePrice -
                              (selectedValidity?.salePrice *
                                verifyCouponResponse?.data?.couponValue) /
                              100
                            ).toFixed(2)
                            : selectedValidity?.salePrice -
                            verifyCouponResponse?.data?.couponValue
                          : selectedValidity?.salePrice + (withBook ? withBookPrice : 0)
                      : (emiInstallment.toFixed(1) + (withBook ? withBookPrice : 0))}
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyCoupon;
