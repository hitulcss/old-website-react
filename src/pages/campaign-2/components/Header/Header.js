import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import Wrapper from "../../../../components/Wrapper/Wrapper";
import { CoursesData } from "../../../../context/courses/Courses";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { pushToDataLayer } from "../../../../gtm/gtm";
import Cookies from "js-cookie";
import { VscVerifiedFilled } from "react-icons/vsc";

const Header = ({ data, img }) => {
  //details object/state
  const [details, setDetails] = useState({
    fullName: "",
    msg: "",
    phoneNumber: "",
  });

  //otp
  const [otp, setOtp] = useState();

  //context data
  const {
    createCampaign,
    verifyOtp,
    verifyOtpData,
    sendOtpToPhone,
    createCampaignData,
    sendOtpToPhoneData,
    getAllCategory,
    category,
  } = useContext(CoursesData);

  //catgory
  useEffect(() => {
    // setSelectedCategory("All");
    getAllCategory();
  }, []);

  const [categorySelected, setCategorySelected] = useState(null);

  //utm
  const [searchParams, setSearchParams] = useSearchParams();
  let utm_campaign = searchParams.get("utm_campaign");
  let utm_source = searchParams.get("utm_source");
  let utm_medium = searchParams.get("utm_medium");

  useEffect(() => {
    if (utm_campaign) {
      Cookies.set("utm_campaign", utm_campaign, { expires: 7 });
    } else {
      Cookies.set("utm_campaign", "sdcampusweb", { expires: 7 });
    }
    if (utm_source) {
      Cookies.set("utm_source", utm_source, { expires: 7 });
    } else {
      Cookies.set("utm_source", window.location.href, { expires: 7 });
    }
    if (utm_medium) {
      Cookies.set("utm_medium", utm_medium, { expires: 7 });
    } else {
      Cookies.set("utm_medium", window.location.href, { expires: 7 });
    }
  }, [utm_campaign, utm_source, utm_medium]);

  const urlSearchString = window.location.search;
  const params = new URLSearchParams(urlSearchString);

  //handle submit
  const handleOtp = async () => {
    if (details?.fullName !== "" && details?.phoneNumber !== "") {
      sendOtpToPhone({
        phone: details?.phoneNumber,
        utm_campaign: params.get("utm_source")
          ? params.get("utm_source")
          : data?.category,
        utm_source: params.get("utm_source")
          ? params.get("utm_source")
          : "landing_page",
        utm_medium: params.get("utm_medium")
          ? params.get("utm_medium")
          : "sdcampuswebsite",
        // standard: details?.standard ? details?.standard : '',

        // category: data?.category
        // category: null
      });
    } else {
      toast.error("Pls provide Name and mobile number");
    }
  };
  const handleCTA = async () => {
    if (verifyOtpData?.status) {
      if (
        details?.fullName !== "" &&
        details?.phoneNumber !== "" &&
        details?.category !== "" &&
        details?.subCategory !== ""
      ) {
        createCampaign({
          name: details?.fullName,
          // msg: "",
          phone: details?.phoneNumber,
          utm_campaign: params.get("utm_source")
            ? params.get("utm_source")
            : data?.category,
          utm_source: params.get("utm_source")
            ? params.get("utm_source")
            : "landing_page",
          utm_medium: params.get("utm_medium")
            ? params.get("utm_medium")
            : "sdcampuswebsite",
          // standard: details?.standard ? details?.standard : '',
          // stream: "",
          fcmToken: "",
          category: details?.category,
          subCategory: details?.subCategory,

          // category: data?.category
          // category: null
        });

        pushToDataLayer({
          ecommerce: null, // Clear the previous ecommerce object.
        });
        pushToDataLayer({
          event: "book_counselling",
          isLoggedIn: localStorage?.getItem("isLoggedIn"),
          counselling_number: details?.phoneNumber,
        });
      } else {
        toast.dismiss();
        toast.error("Pls provide Name and mobile number");
      }
    } else {
      toast.dismiss();
      toast.error("Please Verify Your Number");
    }
  };

  //handling inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "category") {
      setCategorySelected(value);
    }

    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="header-wrapper" id="book-demo">
        <Wrapper>
          <div className="header-container">
            <div className="camp-header-left">
              <div className="camp-header-left-upper">
                {" "}
                <p className="successs">
                  <span style={{ color: "var(--campSecondary)" }}>───</span>{" "}
                  #SuccesForFuture
                </p>
                <h1>
                  {data?.simpleText1}{" "}
                  <span style={{ color: "var(--campSecondary)" }}>
                    {data?.colorText}
                  </span>{" "}
                  {data?.simpleText2}
                </h1>
              </div>

              <div className="header-facilities-container">
                {}
                <div className="header-facilities">
                  {" "}
                  <div>
                    <span>
                      {" "}
                      <img src={data?.img1} alt="icon" loading="lazy" />
                    </span>

                    <p>{data?.text1}</p>
                  </div>
                  <div>
                    <span>
                      {" "}
                      <img src={data?.img2} alt="icon" loading="lazy" />
                    </span>
                    <p>{data?.text2}</p>
                  </div>
                  <div>
                    <span>
                      {" "}
                      <img src={data?.img3} alt="icon" loading="lazy" />
                    </span>
                    <p>{data?.text3}</p>
                  </div>
                  {data?.img4 && (
                    <div>
                      <span>
                        {" "}
                        <img src={data?.img4} alt="icon" loading="lazy" />
                      </span>
                      <p>{data?.text4}</p>
                    </div>
                  )}
                </div>{" "}
                <img
                  src={img.img}
                  alt="teachers"
                  className="group-laptop "
                  loading="lazy"
                />
              </div>
            </div>
            <div className="camp-header-right">
              <div className="header-form-box">
                <h1>Start Your Preparations Early!</h1>

                <div className="form-inputs">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter Full Name Here*"
                    required
                    onChange={handleChange}
                  />

                  <div className="number-container">
                    {" "}
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Enter Your Mobile No.*"
                      required
                      onChange={handleChange}
                    />
                    <p className="sendopt-text" onClick={handleOtp}>
                      SEND OTP
                    </p>
                  </div>

                  <div className="cat-select-container">
                    {" "}
                    <select required name="category" onChange={handleChange}>
                      <option value="" disabled selected>
                        Select Category*
                      </option>
                      {category?.data?.length > 0 &&
                        category?.data?.map((item, index) => {
                          return (
                            <option value={item?.id} key={index}>
                              {item?.name}
                            </option>
                          );
                        })}
                    </select>
                    {categorySelected &&
                      category?.data?.filter((i) => i.id == categorySelected)[0]
                        .subCategories?.length > 0 && (
                        <select
                          required
                          name="subCategory"
                          onChange={handleChange}
                        >
                          <option value="" disabled selected>
                            Select Sub Category*
                          </option>
                          {category?.data?.filter(
                            (i) => i.id == categorySelected
                          )[0].subCategories?.length > 0 &&
                            category?.data
                              ?.filter((i) => i.id == categorySelected)[0]
                              .subCategories?.map((item, index) => {
                                return (
                                  <option
                                    onClick={() => {}}
                                    value={item?.id}
                                    key={index}
                                  >
                                    {item?.title}
                                  </option>
                                );
                              })}
                        </select>
                      )}
                  </div>

                  <div className="input-lower">
                    {" "}
                    <input
                      type="text"
                      placeholder="Enter Your City* "
                      required
                      name="city"
                      // onClick={handleOtp}
                    />
                    <input
                      type="text"
                      placeholder="Enter Your State* "
                      required
                      name="state"
                      // onClick={handleOtp}
                    />
                    {/* <select required onChange={handleChange} name="state">
                      <option value="" disabled selected>
                        Enter State*
                      </option>
                      <option value="class1">Class 1</option>
                      <option value="class2">Class 2</option>
                      <option value="class3">Class 3</option>
                    </select> */}
                  </div>

                  {sendOtpToPhoneData?.status && (
                    <div className="opt-container">
                      {" "}
                      <input
                        type="number"
                        name="otp"
                        placeholder="Enter OTP"
                        required
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <p
                        className="verify-text"
                        onClick={() => verifyOtp(otp, "campaign", "campaign")}
                      >
                        {!verifyOtpData?.status ? (
                          <VscVerifiedFilled className="verify-tick-icon" />
                        ) : (
                          "VERIFY"
                        )}
                      </p>
                    </div>
                  )}
                  <button
                    className="input-sub-btn"
                    disabled={!verifyOtpData?.status}
                    onClick={handleCTA}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
          <img
            src={img.img}
            alt="teachers"
            className=" group-phone "
            loading="lazy"
          />
        </Wrapper>
      </div>
    </>
  );
};

export default Header;
