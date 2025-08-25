import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/auth/login/Login";
import OTP from "./pages/auth/otp/OTP";
import Referral from "./pages/auth/referral/Referral";
import ResetPassword from "./pages/auth/resetpasword/ResetPassword";
import CourseDetails from "./pages/course_details/CourseDetails";
import PreviousYearPapers from "./pages/previousYearPapers/PreviousYearPapers";
import CurrentAffair from "./pages/currentaffair/CurrentAffair";
import Signup from "./pages/auth/signup/Signup";
import About from "./pages/about/About";
import ContactUs from "./pages/contact_us/ContactUs";
import CarrierWith_Us from "./pages/carrier_with_us/CarrierWith_Us";
import Our_Initiative from "./pages/our_initiative/Our_Initiative";
import Terms_Conditions from "./pages/policies/T&C/Terms_Conditions";
import Privacy_Policy from "./pages/policies/privacy_policy/Privacy_Policy";
import R_R_Policy from "./pages/policies/R&R_policy/R_R_Policy";
import CategoryPage from "./pages/category_page/CategoryPage";
import Aos from "aos";
import "aos/dist/aos.css";
import OrderFailed from "./pages/payment/OrderFailed";
import OrderSuccess from "./pages/payment/OrderSuccess";
import ViewAll from "./pages/view_all/ViewAll";
import CourseInfo from "./pages/after_login/course_info/CourseInfo";
import SubjectDetails from "./pages/after_login/course_info/subjects/subject_detail/SubjectDetails";
import LiveLecture from "./pages/after_login/course_info/subjects/live_lectures/LiveLecture";
import QuizDescription from "./pages/after_login/course_info/quizzes/quiz_description/QuizDescription";
import QuizPage from "./pages/after_login/course_info/quizzes/quiz_page/QuizPage";
import AfterSubmit from "./pages/after_login/course_info/quizzes/quiz_page/after_submit/AfterSubmit";
import JobPage from "./pages/exams/job_particular_page/JobPage";
import NotFound404 from "./pages/404/NotFound";
import NameUpdate from "./pages/auth/name/NameUpdate";
import TagManager from "react-gtm-module";
import MyProfile from "./pages/my_profile/MyProfile";
import EmptyPurchase from "./pages/empty_purchase/EmptyPurchase";
import MyPurchase from "./pages/my_purchase/MyPurchase";
import CenterDetail from "./pages/home/campus_centers/center_detail_page/CenterDetail";
import Whatsapp from "./components/Whatsapp/Whatsapp";
import SearchPage from "./pages/search_page/SearchPage";
import AfterLogin from "./pages/after_login/AfterLogin";
import FeedDetails from "./pages/after_login/feed/feed_details/FeedDetails";
import CourseInfoAfterLogin from "./pages/after_login/pages/CourseInfoAfterLogin/CourseInfoAfterLogin";
import SubjectDetailsAfterLogin from "./pages/after_login/pages/SubjectDetails/SubjectDetailsAfterLogin";
import MyCoursesAfterLogin from "./pages/after_login/pages/MyCoursesAfterLogin/MyCoursesAfterLogin";
import Adhayayan from "./pages/after_login/pages/Adhayan/Adhayan";
import Shishak from "./pages/after_login/shishak/Shishak";
import Wallet from "./pages/after_login/Wallet/Wallet";
import AboutUs from "./pages/after_login/aboutUs/AboutUs";
import ReferEarn from "./pages/after_login/Refer_Earn/ReferEarn";
import Feeds from "./pages/after_login/feed/Feeds";
import CategoryAfterLogin from "./pages/after_login/pages/CategoryAfterLogin/CategoryAfterLogin";
import Contact from "./pages/after_login/contact_us/Contact";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import ViewMore from "./pages/after_login/home/category_view_more/ViewMore";
import CheckoutPage from "./pages/after_login/checkout/CheckoutPage";
import MyProfileAfterLogin from "./pages/after_login/pages/MyProfileAfterLogin/MyProfileAfterLogin";
import MyPurchaseAfterLogin from "./pages/after_login/pages/MyPurchaseAfterLogin/MyPurchaseAfterLogin";
import TwoWay from "./pages/after_login/two-way/TwoWay";
import Campaign from "./pages/campaign/Campaign";
import CampaignPage2 from "./pages/campaign/ugc_net_exam/CampaignPage2";
import Campaign3 from "./pages/campaign/competitive_exam/Campaign3";
import Campaign4 from "./pages/campaign/teachers_exam/Campaign4";
import QuizResult from "./pages/after_login/course_info/result/QuizResult";
import E_Book from "./pages/after_login/e-book/E_Book";
import Ebook_Details from "./pages/after_login/e-book/ebook_details/Ebook_Details";
import Ebook_Content from "./pages/after_login/e-book/book_tabs/My-E-Books/ebook-content/Ebook_Content";
import EbookPdf from "./pages/after_login/e-book/book_tabs/My-E-Books/ebook-pdf/EbookPdf";
import EbookCheckout from "./pages/after_login/e-book/e-book-checkout/EbookCheckout";
import Ebook_Page from "./pages/ebook-pages/home_page/Ebook_Page";
import ViewAllEbooks from "./pages/ebook-pages/view_all/ViewAllEbooks";
import OrderStatus from "./pages/order-status/OrderStatus";
import AllReviews from "./pages/after_login/e-book/ebook_details/all_reviews/AllReviews";
import { CoursesData } from "./context/courses/Courses";
import RedirectHandler from "./handler/RedirectHandler";
import RedirectHandlerAfterlogin from "./handler/RedirectHandlerAfterlogin";
import CampaignPage from "./pages/campaign-2/BPSC_EXAM/CampaignPage";
import JBT_Exam from "./pages/campaign-2/JBT_EXAM/JBT_Exam";
import UGC_Net from "./pages/campaign-2/UGC_NET/UGC_Net";
import Category from "./pages/auth/category/Category";
import MainPage from "./pages/after_login/short_learning/MainPage";
import ShortLearningProfile from "./pages/after_login/short_learning/ShortLearningProfile";
import NoSavedPost from "./pages/after_login/short_learning/NoSavedPost";
import ParticularVideo from "./pages/after_login/short_learning/ParticularVideo";
import AddValidity from "./pages/after_login/checkout/AddValidity";
import OurResult from "./pages/after_login/result/OurResult";



const App = () => {
  useEffect(() => {
    Aos.init({ duration: 600, once: true });
  }, []);

  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-TL7L7THB" });
  }, []);

  const redirectionMap = {
    "/blogs": "/exams",
    "/courses": "/",
    "/exam_info": "/exams",
    "/zfowysg37270betidm72m": "/",
    "/vjkrnwa31182xetidm37i.htm": "/",
    "/product/jnv/": "/",
    "/vakdzno8926xetidm81i": "/",
    "/chandigarh-jbt-teacher-salary": "/other-teaching-exams",
    "/all-courses/": "/",
    "/product/nda-prabal/": "/defence-online-coaching",
    // Add more redirections based on your provided data
  };

  const [redirectUrl, setRedirectUrl] = useState(null);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const redirectPath = redirectionMap[currentPath];
    if (redirectPath) {
      setRedirectUrl(redirectPath);
    }
  }, []);
  if (localStorage.getItem("token")) {
    let token = localStorage.getItem("token");
    let decodedToken = jwtDecode(token ? token : "");
    // console.log("Decoded Token", decodedToken);
    let currentDate = new Date();

    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      // console.log("Token expired.");
      toast.success("Session Expired..");
      localStorage.clear();
    } else {
      // console.log("Valid token");
      // result = true;
    }
  }

  //email, name, notification popups
  const { setShowPopups, showPopups } = useContext(CoursesData);

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const details = JSON.parse(localStorage.getItem("details"));
  useEffect(() => {
    if (isLoggedIn) {
      {
        setTimeout(() => {
          if (
            (details?.email == "user@gmail.com" ||
              details?.email == "" ||
              !details?.email) &&
            !showPopups?.name &&
            !showPopups?.category
          ) {
            setShowPopups({
              category: false,
              email: true,
              addEmail: false,
              name: false,
              pushNotification: false,
            });
          } else if (
            (details?.FullName == "Name" ||
              details?.FullName == "" ||
              details?.name == "Name" ||
              details?.name == "") &&
            !showPopups?.email &&
            !showPopups?.category
          ) {
            setShowPopups({
              category: false,
              email: false,
              addEmail: false,
              name: true,
              pushNotification: false,
            });
          } else if (
            (details?.stream == "" || details?.stream == []) &&
            !showPopups?.email &&
            !showPopups?.name
          ) {
            setShowPopups({
              category: true,
              email: false,
              addEmail: false,
              name: false,
              pushNotification: false,
            });
          }
        }, 2000);
      }
    }
  }, [isLoggedIn]);

  return (
    <>
      <div style={{ width: "100%" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route exact path="/login" element={<Login />} />
          <Route exact path="/name" element={<NameUpdate />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/otp" element={<OTP />} />
          <Route exact path="/referral" element={<Referral />} />
          <Route exact path="/resetPassword" element={<ResetPassword />} />
          <Route path="/:slug" element={<CategoryPage />} />
          <Route path="/:slug/:subCategorySlug" element={<RedirectHandler />} />
          {/* <Route path="/:categorySlug/:batchSlug" element={<RedirectHandler />} /> */}
          {/* <Route path="/batch/:batchSlug" element={<CourseDetails />} /> */}
          <Route path="/pyq" element={<PreviousYearPapers />} />
          <Route path="/current_affair" element={<CurrentAffair />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/carrier_with_us" element={<CarrierWith_Us />} />
          <Route path="/our_initiative" element={<Our_Initiative />} />
          <Route path="/terms-and-conditions" element={<Terms_Conditions />} />
          <Route path="/privacy-policy" element={<Privacy_Policy />} />
          <Route path="/return_refund_policy" element={<R_R_Policy />} />
          {/* <Route path="/exams" element={<Exams />} />
          <Route path="/exams/:categorySlug/:slug" element={<ExamsDetails />} /> */}
          <Route path="/orderSuccess" element={<OrderSuccess />} />
          <Route path="/orderFailed" element={<OrderFailed />} />
          <Route path="/:slug/view-all" element={<ViewAll />} />
          <Route
            path="/:slug/:subCategorySlug/view-all"
            element={<ViewAll />}
          />
          <Route path="/stream" element={<Category />} />
          {/* <Route path="/my-courses" element={<MyCourses />} /> */}
          <Route path="/my-courses/:slug" element={<CourseInfo />} />
          <Route path="/subject-details" element={<SubjectDetails />} />
          <Route
            path="/quiz-description/:quizId/:batchSlug"
            element={<QuizDescription />}
          />
          <Route path="/quiz-page/:quizId/:batchSlug" element={<QuizPage />} />
          <Route
            path="/quiz-result/:quizId/:batchSlug"
            element={<AfterSubmit />}
          />
          <Route path="/404" element={<NotFound404 />} />
          <Route
            path="/live-lecture/:batchSlug/:hashId"
            element={<LiveLecture />}
          />
          <Route path="/exams/:categorySlug" element={<JobPage />} />
          {/* <Route path="/sitemap" element={< />} /> */}
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/empty-purchase" element={<EmptyPurchase />} />
          <Route path="/my-purchase" element={<MyPurchase />} />
          <Route path="/center-details" element={<CenterDetail />} />
          <Route path="/search/:searchtext" element={<SearchPage />} />
          <Route path="*" exact={true} element={<NotFound404 />} />
          <Route path="/search-page" element={<SearchPage />} />
          <Route
            path="/school-entrance-exams-coaching"
            element={<Campaign />}
          />
          <Route path="/ugc-net-online-coaching" element={<CampaignPage2 />} />
          <Route path="/competitive-exams-coaching" element={<Campaign3 />} />
          <Route path="/teaching-exams-coaching" element={<Campaign4 />} />
          {/* AFTER LOGIN ROUTES */}
          <Route exact path="/learning" element={<AfterLogin />} />
          <Route path="/learning/home" element={<Adhayayan />} />
          <Route
            path="/learning/home/:slug/view-more/:index"
            element={<ViewMore />}
          />
          <Route path="/learning/shikshak" element={<Shishak />} />
          <Route path="/learning/refer" element={<ReferEarn />} />
          <Route path="/learning/short-learning" element={<MainPage />} />
          <Route
            exact={true}
            path="/learning/short-learning/short/:shortId"
            element={<ParticularVideo />}
          />
          <Route
            path="/learning/learning-profile/:channelId"
            element={<ShortLearningProfile />}
          />
          <Route path="/learning/saved-post" element={<NoSavedPost />} />
          <Route path="/learning/e-book/:index" element={<E_Book />} />
          <Route path="/learning/wallet" element={<Wallet />} />
          <Route path="/learning/about-us" element={<AboutUs />} />
          <Route path="/learning/contact-us" element={<Contact />} />
          <Route path="/learning/our-result" element={<OurResult />} />
          <Route path="/learning/feed" element={<Feeds />} />
          <Route path="/learning/privacy-policy" element={<Privacy_Policy />} />
          <Route path="/learning/:slug" element={<CategoryAfterLogin />} />
          <Route
            path="/learning/:slug/:subCategorySlug"
            element={<RedirectHandlerAfterlogin />}
          />
          {/* <Route
            path="/learning/:slug/:subCategorySlug"
            element={<RedirectHandlerAfterlogin />}
          /> */}
          {/* <Route
            path="/learning/:categorySlug/:batchSlug"
            element={<  DetailsAfterLogin />}
          /> */}
          <Route
            path="/learning/subject-details"
            element={<SubjectDetailsAfterLogin />}
          />
          {/* <Route path="/learning/subject-details" element={<SubjectDetails />} /> */}
          <Route
            path="/learning/my-courses"
            element={<MyCoursesAfterLogin />}
          />
          <Route
            path="/learning/my-courses/c/:slug"
            element={<CourseInfoAfterLogin />}
          />
          {/* <Route path="/course-details" element={<Course_Details />} /> */}
          <Route
            exact
            path="/learning/feed-details/:postId"
            element={<FeedDetails />}
          />
          <Route
            path="/learning/live-lecture/:batchSlug/:hashId/:index"
            element={<LiveLecture />}
          />
          <Route path="/course_details" element={<CourseDetails />} />
          <Route
            path="/learning/my-profile"
            element={<MyProfileAfterLogin />}
          />
          {/* <Route
            path="/learning/:slug"
            element={<CategoryAfterLogin />}
          /> */}
          <Route
            path="/learning/my-purchase"
            element={<MyPurchaseAfterLogin />}
          />
          <Route
            path="/learning/:categorySlug/:batchSlug/checkout"
            element={<CheckoutPage />}
          />
          <Route
            path="/learning/:batchSlug/add-validity"
            element={<AddValidity />}
          />
          <Route path="/ebook/checkout/:ebookId" element={<EbookCheckout />} />
          <Route
            path="/live-class/:lectureId/:batchSlug"
            element={<TwoWay />}
          />
          {/* <Route path="/two-way" element={<TwoWay />} /> */}
          <Route path="/quizresult" element={<QuizResult />} />
          <Route path="/ebook-details/:slug" element={<Ebook_Details />} />
          <Route path="/ebook-content/:ebookId" element={<Ebook_Content />} />
          <Route path="/ebook-pdf/:ebookId/:topicId" element={<EbookPdf />} />
          <Route path="/ebook-page" element={<Ebook_Page />} />
          <Route path="/view-all-ebooks" element={<ViewAllEbooks />} />{" "}
          <Route
            path="/ordersstatus/:orderId/:userId"
            element={<OrderStatus />}
          />
          <Route path="/all-reviews" element={<AllReviews />} />
          <Route path="/preparation/bpsc-exam" element={<CampaignPage />} />
          <Route path="/preparation/ugc-net-exam" element={<UGC_Net />} />
          <Route path="/preparation/jbt-exam" element={<JBT_Exam />} />
          <Route path="/cat" element={<Category />} />
        </Routes>

        <Whatsapp />
      </div>
    </>
  );
};

export default App;
