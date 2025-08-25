import React, { useContext, useEffect, useState } from "react";
import "./Ebook_Details.css";
import Wrapper from "../../../../components/Wrapper/Wrapper";
import EbookHeader from "./header/EbookHeader";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineMobileFriendly } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { MdHistoryEdu } from "react-icons/md";
import { MdOutlineLocalLibrary } from "react-icons/md";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import ReviewModal from "../../../../components/Review_Modal/ReviewModal";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineRingVolume } from "react-icons/md";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import support from "../../../../assets/support.png";
import { IoMdArrowDropup } from "react-icons/io";
import { CoursesData } from "../../../../context/courses/Courses";
import Pdf_Popup from "../../../../components/Pdf_Popup/Pdf_Popup";

// Modal imports

import toast, { Toaster } from "react-hot-toast";
import NewAccordian from "../../../../components/Accordian/NewAccordian";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  borderRadius: "5px",
  outline: "none",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Ebook_Details = ({ from, ebooks }) => {
  //fetching slug
  const { slug } = useParams();

  //context
  const {
    getSpecficEbook,
    specificEbook,
    postReviewForEbook,
    getEbookReview,
    ebookReviews,
  } = useContext(CoursesData);

  const [loading, setLoading] = useState(true);

  //preview link
  const [previewLink, setPreviewLink] = useState(false);

  useEffect(() => {
    if (ebooks) {
      setLoading(false);
    }
  }, [ebooks]);

  //calling api
  useEffect(() => {
    if (slug) {
      getSpecficEbook({ slug: slug });
      getEbookReview({ slug: slug, page: 1, pageSize: 25 });
    }
  }, [slug]);

  const [isOpen, setIsOpen] = useState(true);
  const [dropdown, setDropdown] = useState({
    description: true,
    free_demo: true,
    reviews: true,
  });

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  //setting preview link
  useEffect(() => {
    if (specificEbook) {
      setLoading(false);
      setPreviewLink(specificEbook?.samplePdfs[0]?.fileLoc);
    }
  }, [specificEbook]);

  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //share link

  const title = "";
  const shareUrl = window?.location.href;

  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Toaster />
      <div className="ebook_details_wrapper">
        <EbookHeader handleOpen={handleOpen} />

        <Wrapper>
          {/* Modal Start */}
          {/* <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography
                  mb={2}
                  id="transition-modal-title"
                  variant="h5"
                  component="h2"
                >
                  Share
                </Typography>
                <div
                  className="share_platforms"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div>
                    {" "}
                    <WhatsappShareButton
                      url={shareUrl}
                      title={title}
                      separator="Download Now : "
                      className="Demo__some-network__share-button"
                    >
                      <FaWhatsappSquare className="link_share_icon share_wp" />{" "}
                      Whatsapp
                    </WhatsappShareButton>
                  </div>
                  <div>
                    {" "}
                    <TwitterShareButton
                      url={shareUrl}
                      title={title}
                      separator=":"
                      className="Demo__some-network__share-button"
                    >
                      <RiTwitterXFill className="link_share_icon " /> Twitter
                    </TwitterShareButton>
                  </div>
                  <div>
                    {" "}
                    <FacebookShareButton
                      url={shareUrl}
                      title={title}
                      separator=":"
                      className="Demo__some-network__share-button"
                    >
                      <FaFacebookSquare className="link_share_icon  share_fb" />{" "}
                      Facebook
                    </FacebookShareButton>
                  </div>
                  <div>
                    {" "}
                    Copy Link
                    <ContentCopyIcon
                      className="refer_icon refer_copy_icon"
                      onClick={() => {
                        navigator.clipboard.writeText(shareUrl);
                        toast.success("Copied");
                      }}
                    />
                  </div>
                </div>
              </Box>
            </Fade>
          </Modal> */}
          {/* Modal End */}{" "}
          <div className="ebook_details_container">
            <Pdf_Popup
              url={from !== "myebook" ? previewLink : ""}
              open={open}
              setOpen={setOpen}
            />
            <div className="ebook_detail_left" data-aos="fade-left">
              <div className="ebook_img_container">
                <img
                  src={specificEbook?.featuredImage}
                  alt="mainimg"
                  loading="lazy"
                />
                {/* <div className="ebook_lower_img">
                  <img src={bookImg} alt="mainimg" />
                  <img src={bookImg} alt="mainimg" />
                  <img src={bookImg} alt="mainimg" />
                  <img src={bookImg} alt="mainimg" />
                  <img src={bookImg} alt="mainimg" />
                  <img src={bookImg} alt="mainimg" />
                </div> */}
              </div>

              <div className="ebook-left-btns">
                <button className="preview-btn" onClick={() => setOpen(true)}>
                  Preview
                </button>
                <button
                  className="ebook-buy-btn"
                  onClick={() => navigate(`/ebook/checkout/${slug}`)}
                >
                  Buy Now
                </button>
              </div>
            </div>
            <div className="ebook_detail_right">
              <div className="ebook_detials">
                <div className="ebook-descrip" data-aos="fade-right">
                  <div
                    className="ebook-descrip-header"
                    onClick={() =>
                      setDropdown((prev) => ({
                        ...prev,
                        description: !dropdown.description,
                      }))
                    }
                  >
                    <h2>Description</h2>

                    {dropdown.description ? (
                      <IoMdArrowDropup className="dropdown-icon" />
                    ) : (
                      <IoMdArrowDropdown className="dropdown-icon" />
                    )}
                  </div>

                  {dropdown.description && (
                    <>
                      <p style={{ border: "1px solid #dfdfdf" }}></p>
                      <div className="ebook-descrip-lower">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: specificEbook?.description,
                          }}
                          style={{ lineHeight: "1.5rem" }}
                        />

                        <div className="ebook-facility">
                          <div>
                            <p className="ebook-fac-icon-container">
                              <GiNotebook className="ebook-fac-icon" />
                            </p>
                            <p>Study Materials</p>
                          </div>
                          <div>
                            <p className="ebook-fac-icon-container">
                              <MdHistoryEdu className="ebook-fac-icon" />
                            </p>
                            <p>Latest Pattern</p>
                          </div>
                          <div>
                            <p className="ebook-fac-icon-container">
                              <MdOutlineLocalLibrary className="ebook-fac-icon" />
                            </p>
                            <p>Self Paced Learning</p>
                          </div>
                          <div>
                            <p className="ebook-fac-icon-container">
                              <MdOutlineMobileFriendly className="ebook-fac-icon" />
                            </p>
                            <p>Device Compatibility</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="free-demo-ebooks" data-aos="fade-right">
                  <div
                    className="ebook-descrip-header"
                    onClick={() =>
                      setDropdown((prev) => ({
                        ...prev,
                        free_demo: !dropdown.free_demo,
                      }))
                    }
                  >
                    <h2>Free Demo E-Books</h2>
                    {dropdown.free_demo ? (
                      <IoMdArrowDropup className="dropdown-icon" />
                    ) : (
                      <IoMdArrowDropdown className="dropdown-icon" />
                    )}
                  </div>

                  {dropdown.free_demo && (
                    <>
                      {" "}
                      <p style={{ border: "1px solid #dfdfdf" }}></p>
                      <div className="sample-pdf">
                        {" "}
                        {specificEbook?.samplePdfs.map((item, index) => {
                          return (
                            <>
                              <div key={index}>
                                <div>
                                  {" "}
                                  <MdOutlinePictureAsPdf className="pdf-icon" />
                                  <p className="sample-pdf-text">
                                    {item?.name}
                                  </p>
                                </div>

                                <MdOutlineRemoveRedEye
                                  className="pdf-icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPreviewLink(item?.fileLoc);
                                    setOpen(true);
                                  }}
                                />
                              </div>
                              <p style={{ border: "1px solid #dfdfdf" }}></p>
                            </>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>

                <div className="review_wrapper" data-aos="fade-right">
                  <div
                    className="review_title"
                    onClick={() =>
                      setDropdown((prev) => ({
                        ...prev,
                        reviews: !dropdown.reviews,
                      }))
                    }
                  >
                    {" "}
                    <h2>All Reviews</h2>
                    {dropdown.reviews ? (
                      <IoMdArrowDropup className="dropdown-icon" />
                    ) : (
                      <IoMdArrowDropdown className="dropdown-icon" />
                    )}
                  </div>

                  {dropdown.reviews && (
                    <>
                      <p style={{ border: "1px solid #dfdfdf" }}></p>
                      <div className="review_upper">
                        <div className="review_upper_leftside">
                          <div className="review_rating">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                justifyContent: "center",
                              }}
                            >
                              <span
                                style={{ fontSize: "35px", fontWeight: "500" }}
                              >
                                {specificEbook?.averageRating}
                              </span>
                              <AiFillStar
                                size={30}
                                style={{ color: "var(--primaryColor)" }}
                              />
                            </div>
                            <p className="rating_count">
                              {specificEbook?.totalRatings} Ratings &{" "}
                              {specificEbook?.totalReviews} {""}
                              Reviews
                            </p>

                            <div className="rating_review-btn">
                              {" "}
                              <ReviewModal
                                modalOpen={modalOpen}
                                setModalOpen={setModalOpen}
                                postReviewForEbook={postReviewForEbook}
                                from="ebook"
                                ebookId={specificEbook?.id}
                              />
                              <button onClick={() => setModalOpen(true)}>
                                Share Review
                              </button>
                            </div>

                            {/* <div className="review_upper_rightside mobileview">
                    <ReviewModal productId={productBySlug?.data?.id} />
                  </div> */}
                          </div>
                        </div>
                        <div className="review_upper_rightside pcview">
                          <div className="rating_bar">
                            <p className="rating_bar_number">
                              5 <AiFillStar size={22} />
                              <span>
                                <ProgressBar style={{ color: "red" }} />
                              </span>
                              5
                            </p>
                            <p className="rating_bar_number">
                              4 <AiFillStar size={22} />
                              <span>
                                <ProgressBar />
                              </span>
                              4
                            </p>
                            <p className="rating_bar_number">
                              3 <AiFillStar size={22} />
                              <span>
                                <ProgressBar />
                              </span>
                              3
                            </p>
                            <p className="rating_bar_number">
                              2 <AiFillStar size={22} />
                              <span>
                                <ProgressBar />
                              </span>
                              2
                            </p>{" "}
                            <p className="rating_bar_number">
                              &nbsp;1 <AiFillStar size={22} />
                              <span>
                                <ProgressBar />
                              </span>
                              1
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="review_lower">
                        {ebookReviews?.reviews?.map((item, index) => {
                          return (
                            <div className="review_container" key={index}>
                              <span className="review_user">
                                <img src={item?.user?.profilePhoto} />{" "}
                                {item?.user?.name}
                              </span>
                              <div className="rev">
                                <span className="review_rating_down">
                                  <AiFillStar />
                                  {item?.rating}
                                </span>
                                {/* <span className="review">{item?.review}</span> */}
                              </div>

                              <p className="review_comment">{item?.title}</p>
                            </div>
                          );
                        })}

                        <p style={{ border: "1px solid #dfdfdf" }}></p>
                        <NavLink to="/all-reviews">
                          <p className="show-all-review">Show All Review</p>
                        </NavLink>
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <NewAccordian />
                </div>

                <div>
                  <div className="need_our_help ebook-help">
                    <div className="need_help_left_side">
                      <p>Need Our Help?</p>
                      <NavLink to="tel:+917428394524">
                        <button className="call_button">
                          <MdOutlineRingVolume className="help_icon" /> Call
                          +917428394524
                        </button>
                      </NavLink>

                      <button
                        className="wp_button"
                        onClick={() =>
                          window.open(
                            "https://api.whatsapp.com/send/?phone=7428394524&text&type=phone_number&app_absent=0"
                          )
                        }
                      >
                        {" "}
                        <FaWhatsapp className="help_icon" />
                        Chat on WhatsApp
                      </button>
                    </div>
                    <div className="need_help_right_side">
                      <img src={support} alt="support" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default Ebook_Details;
