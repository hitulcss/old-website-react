import React, { useContext, useState } from "react";
import "./ReferEarn.css";
import referImg from "../../../assets/earncash.png";
import { IoShareSocialOutline } from "react-icons/io5";
import inviteFriendLogo from "../../../assets/invitefriend.png";
import { MdOutlineCampaign } from "react-icons/md";
import { MdOutlineGroupAdd } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FaWhatsapp } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Tooltip } from "@mui/material";
import { WhatsappShareButton } from "react-share";
import { CoursesData } from "../../../context/courses/Courses";
import SideBar from "../../../components/Sidebar/SideBar";
import NavBar from "../NavBar/NavBar";
import { HeadProvider, Title } from "react-head";
import earncashbanner from "../../../assets/earncashbanner.png";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

const ReferEarn = () => {
  const { setSidebarExpanded, isSidebarExpanded } = useContext(CoursesData);

  const title =
    "🌟 Exciting news! Discovered SD Campus App - top-notch courses & online bookstore. 📚 Join using my code ODCTZOOI  for exclusive benefits! Let's boost our learning journey together! 🚀 ";
  const shareUrl = "https://sdcampus.onelink.me/rnhk/SDCampusApp";
  const referralCode = JSON.parse(localStorage?.getItem("details"));
  const mobileNumber = JSON.parse(localStorage?.getItem("details"));
  return (
    <>
      <HeadProvider>
        <Title>Refer & Earn - SD Campus </Title>
      </HeadProvider>{" "}
      <NavBar width={isSidebarExpanded ? 250 : 93} />
      <Toaster />
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
          <div className="refer-earn_wrapper">
            <div className="refer-earn_container">
              <div className="earn_cash" data-aos="fade-left">
                <h1>
                  <span style={{ fontWeight: "600" }}>Earn Cash</span> upto{" "}
                  <span
                    style={{
                      color: "var(--primaryColor)",
                      fontWeight: "600",
                    }}
                  >
                    ₹1000
                  </span>{" "}
                  in your bank account for{" "}
                  <span style={{ fontWeight: "600" }}>Every Friend</span> you
                  refer
                </h1>
                <img src={referImg} alt="referCoin" />
              </div>
              <figure>
                <img src={earncashbanner} alt="earchcashbanner" />
              </figure>

              <div className="share_invite" data-aos="fade-left">
                <div className="total-reward">
                  <div>
                    <MdOutlineAccountBalanceWallet className="reward-icon" />
                    <h3>Total Rewards Earn</h3>
                  </div>

                  <p style={{ border: "1px solid #dfdfdf" }}></p>

                  <div className="redeem-ammount">
                    <h2>₹ 0 </h2>
                    <button onClick={() => {
                      toast.success('Comming Soon')
                      // toast.dismiss()
                    }}>Redeem Now</button>
                  </div>
                </div>
                <div className="share_code_box">
                  <h2>Share Your Referral Code</h2>
                  <p style={{ border: "1px solid #dfdfdf" }}></p>
                  <div className="share_lower">
                    <div className="share_code">
                      <p>{referralCode?.myReferralCode} </p>
                      <Tooltip title="Copy">
                        <ContentCopyIcon
                          className="refer_icon refer_copy_icon"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              referralCode?.myReferralCode
                            );
                            toast.success("Copied");
                          }}
                        />
                      </Tooltip>
                    </div>
                    <WhatsappShareButton
                      url={shareUrl}
                      title={title}
                      separator="Download Now : "
                      className="Demo__some-network__share-button"
                    >
                      <div className="invite_box">
                        {/* <FaWhatsapp className="refer_wp_icon refer_icon" /> */}

                        <FaWhatsapp className="refer_wp_icon refer_icon" />
                        {/* <WhatsappIcon size={52} round /> */}

                        <p>Invite Your Friends</p>
                      </div>
                    </WhatsappShareButton>
                    {/* {isShare && <Share />} */}
                    <div className="share_container">
                      <IoShareSocialOutline className="refer_icon refer_share_icon" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="how_it_works" data-aos="fade-left">
                <h2>How it Works?</h2>
                <p style={{ border: "1px solid #efefef" }}></p>

                <div className="how_it_works_lower">
                  <div>
                    <MdOutlineCampaign className="how_it_works_icon" />
                    <p>Share your referral code or link with your friends. </p>
                  </div>
                  <div>
                    <MdOutlineGroupAdd className="how_it_works_icon" />
                    <p>Friends sign-up with your link or referral code.</p>
                  </div>
                  <div>
                    <GiReceiveMoney className="how_it_works_icon" />
                    <p>
                      When your friend makes a purchase, you get ₹1000 cashback
                      form SD Campus. Your friends to get discount on any
                      purchase Form SD Campus.
                    </p>
                  </div>
                </div>
              </div>

              <div className="refer_t_c" data-aos="fade-left">
                <h2>Term and Conditions</h2>
                <p style={{ border: "1px solid #dfdfdf" }}></p>
                <p className="refer_t_c_text">
                  Cashback will be credited to your registered mobile number +
                  91{mobileNumber?.mobileNumber} . You may change your number to
                  get cashback in another mobile number.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferEarn;
