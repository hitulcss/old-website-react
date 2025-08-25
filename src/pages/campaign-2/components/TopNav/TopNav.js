import React from "react";
import "./TopNav.css";

const TopNav = ({ data }) => {
  //   const settings = {
  //     infinite: true,
  //     autoplay: true,
  //     speed: 800,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     cssEase: "linear",
  //     autoplaySpeed: 2000,
  //     pauseOnHover: true,
  //     lazyLoad: true,
  //     prevArrow: <CustomPrevArrow />,
  //     nextArrow: <CustomNextArrow />,
  //   };

  const handleClickScroll = () => {
    const element = document.getElementById("book-demo");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="alert-wrapper">
        <div className="alert-header">
          <div className="alert_msg">
            <p>
              Super Charge Your Preparation With SD+ Mock Test For All
              Government Exams. <a>Buy Now </a>
            </p>
          </div>
          <div className="top-nav-btn-wrapper">
            <p>{data?.title} </p>
            <button>Register Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

// const CustomPrevArrow = (props) => {
//   return (
//     <div className="custom-prev-arrow" onClick={props.onClick}>
//       {/* Your custom left arrow icon or content */}
//       <span className="arrow-alert-left">
//         <FaAngleLeft />
//       </span>
//     </div>
//   );
// };

// const CustomNextArrow = (props) => {
//   return (
//     <div className="custom-next-arrow" onClick={props.onClick}>
//       {/* Your custom right arrow icon or content */}
//       <span className=" arrow-alert-right">
//         <FaAngleRight />
//       </span>
//     </div>
//   );
// };

export default TopNav;
