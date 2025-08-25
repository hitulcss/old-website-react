import { Category } from "@mui/icons-material";
import axios from "axios";
// import React, { useState } from 'react';

// export const CoursesContext = React.createContext();

// const CoursesProvider = ({ children }) => {

//     return (
//         <CoursesContext.Provider value={contextData}>
//             {children}
//         </CoursesContext.Provider>
//     );
// };

import { createContext, useState } from "react";
import { GET_COURSES } from "../apis/APIS";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { createBrowserHistory } from "history";
import Cookies from "js-cookie";
import { pushToDataLayer } from "../../gtm/gtm";

const history = createBrowserHistory();
export const CoursesData = createContext();
export const CoursesDataContext = ({ children }) => {
  const navigate = useNavigate();

  var previousPageURL = document.refrer;

  //popups
  const [showPopups, setShowPopups] = useState({
    category: false,
    email: false,
    addEmail: false,
    name: false,
    pushNotification: false,
  });

  //sidebar login
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [withBook, setWithBook] = useState(false);
  const [courses, setCourses] = useState();
  const [course, setCourse] = useState();
  const [testSeries, setTestSeries] = useState();
  const [testimonial, setTestimonial] = useState();
  const [quiz, setAllQuiz] = useState();
  const [test, setAllTest] = useState();
  const [category, setAllCategory] = useState();
  const [subCategory, setAllSubCategory] = useState();
  const [freeTestSeries, setFreeTestSeries] = useState();
  const [latestTestSeries, setLatestTestSeries] = useState();
  const [staff, setStaff] = useState();
  const [youtube, setYoutube] = useState();
  const [coupon, setCoupon] = useState();
  const [lectures, setLectures] = useState();
  const [banner, setBanner] = useState();
  const [resultBanner, setResultBanner] = useState();
  const [successStory, setSuccessStory] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingForMyCourse, setLoadingForMyCourse] = useState(false);
  // const [blog, setBlog] = useState();
  // const [blogData, setBlogData] = useState();
  const [categoryBlogs, setCategoryBlogs] = useState([]);
  const [blog, setBlog] = useState();
  const [blogCategory, setBlogCategory] = useState();
  const [blogById, setBlogById] = useState();
  const [blogFeaturedMedia, setBlogFeaturedMedia] = useState();
  const [latestBlogs, setLatestBlogs] = useState();
  const [allBlogs, setAllBlogs] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [recommendedCourses, setRecommededCourses] = useState([]);
  const [myCourseByBatchId, setMyCourseByBatchId] = useState([]);
  const [subjectOfBatch, setSubjectOfBatch] = useState([]);
  const [lecturesOfBatch, setLecturesOfBatch] = useState([]);
  const [notesOfBatch, setNotesOfBatch] = useState([]);
  const [dppsOfBatch, setDppsOfBatch] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [lectureDetails, setLectureDetails] = useState({});
  const [quizDetails, setQuizDetails] = useState([]);
  const [particularCategoryBlogs, setParticularCategory] = useState([]);
  const [paidCoursesData, setPaidCoursesData] = useState([]);
  const [freeCoursesData, setFreeCoursesData] = useState([]);
  const [freePurchaseCourse, setFreePurchaseCourse] = useState([]);
  const [myProfileData, setMyProfileData] = useState([]);
  const [myPurchaseData, setMyPurchaseData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [stickyNav, setStickyNav] = useState(true);

  const [emiInstallment, setEmiInstallment] = useState(0);
  const [totalAmountOfInstallment, setTotalAmountOfInstallment] = useState("");

  //sidebar
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);

  //selected Category

  const [selectedCategory, setSelectedCategory] = useState(
    localStorage?.getItem("currentCategoryName")
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    localStorage?.getItem("currentCategoryId")
  );

  //payment
  const [initiatePaymentDetails, setInitiatePaymnetDetails] = useState();
  const [verifyCouponResponse, setVerifyCouponResponse] = useState();

  // ctaBanner
  const [ctaBanner, setCtaBanner] = useState([]);

  //Feed-section
  const [allFeed, setAllFeed] = useState([]);
  const [postData, setPostData] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);

  //Today-Classes
  const [todayClasses, setTodayClasses] = useState([]);

  //Dropdown-category
  const [dropdownCategory, setDropDownCategory] = useState(
    localStorage?.getItem("currentCategorySlug")
  );

  //notifications
  const [notifications, setNotifications] = useState();

  //Store Products
  const [storeProducts, setStoreProducts] = useState();

  const getAllStoreProduct = async (category, run, page, pageSize, text) => {
    let filter = "";
    if (category) {
      filter = category;
    } else filter = "";
    const token = localStorage.getItem("token");
    const authToken = token;
    // const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNkY2FtcHVzQHRyYW5kby5pbiIsInN0dWRlbnRJZCI6IjNjZjcwODYwLTZjMWMtMTFlZC04YjVlLWMxZjc4OTdkMzM5OCIsImlhdCI6MTcwMTE2MDczMCwiZXhwIjoxNzAxMzMzNTMwfQ.0YxN28TDawL-dV5tuo0buJRG6kXiaHqWsaVWmu3-jV8";
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    if (run == "categoryFilter") {
      axios
        .get(
          `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/store/getStoreProducts?limit=200&categorySlug=${filter}&page=${page}&pageSize=${pageSize}&text=${text}`,
          config
        )
        .then((res) => {
          if (res?.data?.status) {
            setStoreProducts(res?.data);
          } else {
            navigate("/404");
          }

          // console.log('line48', res?.data)
        })
        .catch((e) => console.log(e));
    }
    if (run !== "categoryFilter") {
      axios
        .get(
          `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/store/getStoreProducts`,
          config
        )
        .then((res) => {
          setStoreProducts(res?.data);
          // console.log('line48', res?.data)
        })
        .catch((e) => console.log(e));
    }
    // console.log("API RESULT => " + process.env.REACT_APP_PRODUCTION_LIVE_URL);
  };

  //create campaign
  const [createCampaignData, setCreateCampaignData] = useState();
  const createCampaign = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/createCampaign`,
        data,
        config
      )
      .then((res) => {
        setCreateCampaignData(res?.data);
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          pushToDataLayer({
            ecommerce: null, // Clear the previous ecommerce object.
          });
          pushToDataLayer({
            event: "create_campaign",
            isLoggedIn: localStorage?.getItem("isLoggedIn"),
            counselling_number: data?.phone,
          });
          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  //create campaign
  const [sendOtpToPhoneData, setsendOtpToPhone] = useState();
  const sendOtpToPhone = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/sendOtpToPhone`,
        data,
        config
      )
      .then((res) => {
        setsendOtpToPhone(res?.data);
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          localStorage.setItem("token", res?.data?.data);
          pushToDataLayer({
            ecommerce: null, // Clear the previous ecommerce object.
          });
          pushToDataLayer({
            event: "signup",
            isLoggedIn: localStorage?.getItem("isLoggedIn"),
            counselling_number: data?.phone,
          });
          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };

  //getEbooks
  const [ebooks, setEbooks] = useState();
  //getEbooks
  const getEbooks = async (data) => {
    // setLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    let param = {};
    if (data?.page) {
      param.page = data?.page;
    }
    if (data?.size) {
      param.pageSize = data?.size;
    }
    if (data?.priceMin) {
      param.priceMin = data?.priceMin;
    }
    if (data?.priceMax) {
      param.priceMax = data?.priceMax;
    }
    if (data?.text) {
      param.text = data?.text;
    }
    if (data?.language) {
      param.language = data?.language;
    }
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
      params: {
        ...param,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/ebook/getAllEbooks`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setEbooks(res?.data?.data);
          // setLoading(false);
        } else {
          // toast.error('No Classes')
          // navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };
  const [specificEbook, setSpecificEbook] = useState();
  //getEbooks
  const getSpecficEbook = async (data) => {
    // setLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/ebook/getSpecficEbook?slug=${data?.slug}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setSpecificEbook(res?.data?.data);
          // setLoading(false);
        } else {
          // toast.error('No Classes')
          // navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };
  const [myEbook, setMyEbook] = useState();
  //getEbooks
  const getMyEbooks = async (data) => {
    // setLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/ebook/getMyEbooks`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setMyEbook(res?.data?.data);
          // setLoading(false);
        } else {
          // toast.error('No Classes')
          // navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };
  const [myEbookById, setMyEbookById] = useState();
  //getEbooks
  const getMyEbookById = async (data) => {
    // setLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/ebook/getMyEbookById/${data?.id}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setMyEbookById(res?.data?.data);
          // setLoading(false);
        } else {
          // toast.error('No Classes')
          // navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };
  const [ebookTopic, setMyEbookTopic] = useState();
  //getEbooks
  const getTopic = async (data) => {
    // setLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/ebook/getTopic?topicId=${data?.topicId}&ebookId=${data?.ebookId}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setMyEbookTopic(res?.data?.data);
          // setLoading(false);
        } else {
          // toast.error('No Classes')
          // navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };
  //review post ebook
  const postReviewForEbook = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/ebook/postReview`,
        data,
        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success("Review Posted...");
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };

  //getFAQs
  const [ebookReviews, setEbookReviews] = useState();
  //getFAQs
  const getEbookReview = async (data) => {
    // setLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/ebook/getEbookReviews?slug=${data?.slug}&page=${data?.page}&pageSize=${data?.pageSize}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setEbookReviews(res?.data?.data);
          // setLoading(false);
        } else {
          // toast.error('No Classes')
          // navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };

  //
  // const []
  const ebook_initiate_payment = async (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    const response = await axios.post(
      `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/ebook/ebook_initiate_payment`,
      data,
      config
    );

    return response?.data?.data;
  };
  const [ebookPayment, setEbookPayment] = useState();
  const verify_ebook_payment = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/ebook/verify_ebook_payment?orderId=${details?.orderId}`,
        data,
        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          setEbookPayment(res?.data);
          setTimeout(() => {
            setVerifyCouponResponse("");
            navigate("/");
          }, 1500);
          toast.success("Request Sent...");
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };

  //getFAQs
  const [faq, setFaq] = useState();
  //getFAQs
  const getFAQs = async (data) => {
    // setLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getFAQs?type=${data?.type}&id=${data?.id}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setFaq(res?.data?.data);
          // setLoading(false);
        } else {
          // toast.error('No Classes')
          // navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };
  //wallet
  const [walletDetails, setWalletDetails] = useState();
  //wallet
  const getRefaralTxn = async (quizId) => {
    // setLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/adminPanel/getRefaralTxn`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setWalletDetails(res?.data?.data);
          // setLoading(false);
        } else {
          // toast.error('No Classes')
          // navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };

  const withdrawalRequest = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/adminPanel/withdrawalRequest`,
        data,
        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          getRefaralTxn();
          toast.success("Request Sent...");
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };

  //rating
  const postRating = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/lecture/postRating`,
        data,
        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success("Rating Posted...");
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  //report
  const postReport = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/lecture/postReport`,
        data,
        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success("Report Sent...");
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  //updateCurrentCategory
  const updateCurrentCategory = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/adminPanel/updateCurrentCategory`,
        data,
        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success("Report Sent...");
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };

  //quiz
  const [particularQuizDetails, setParticularQuizDetails] = useState();
  //quiz
  const getQuizById = async (quizId) => {
    // setLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getQuizById/${quizId}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setParticularQuizDetails(res?.data?.data);
          // setLoading(false);
        } else {
          // toast.error('No Classes')
          // navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };
  //quiz-questions
  const [particularQuizQuestions, setParticularQuizQuestions] = useState();
  //quiz-question
  const getQuestionsByQuizId = async (quizId) => {
    // setLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/adminPanel/getQuestionsByQuizId/${quizId}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setParticularQuizQuestions(res?.data?.data);
          // setLoading(false);
        } else {
          // toast.error('No Classes')
          // navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };

  const [quizLeaderboard, setQuizLeaderboard] = useState();
  const getleaderBoard = async (quizId) => {
    // setLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getleaderBoard/${quizId}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setQuizLeaderboard(res?.data?.data);
          // setLoading(false);
        } else {
          // toast.error('No Classes')
          // navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };
  //quiz-result
  const [quizResult, setQuizResult] = useState();
  //quiz-question
  const getQuizResult = async (details) => {
    // setLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getQuizResult?quizId=${details?.quizId}&attemptId=${details?.attemptId}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setQuizResult(res?.data?.data);
          // setLoading(false);
        } else {
          // toast.error('No Classes')
          // navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };

  //quiz-submission
  const attemptQuiz = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/attemptQuiz/${details?.quizId}`,
        data,
        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          getQuizResult({ quizId: res?.data?.data?.quizId, attemptId: "" });
          toast.success("Quiz Submitted..");
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };

  //notification
  const getNotification = async () => {
    // setLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/Notification/getNotifications`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setNotifications(res?.data?.data);
          // setLoading(false);
        } else {
          // toast.error('No Classes')
          // navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };

  const updateIsRead = (id) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .put(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/Notification/updateIsRead/${id}`,

        {},
        config
      )
      .then((res) => {
        // var previousPageURL = document.refrer;

        if (res?.data?.status) {
          getNotification();
          // getAllFeed()
        }
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
      })
      .catch((e) => console.log(e));
  };

  //Today Classes
  const getTodayClasses = async () => {
    // setLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/adminPanel/getTodayClasses`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setTodayClasses(res?.data?.data);
          // setLoading(false);
        } else {
          // toast.error('No Classes')
          // navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };

  //Feed API
  const getAllFeed = async (details) => {
    // setLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/community/getAllPosts?page=${details?.page}&pageSize=${details?.pageSize}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setAllFeed(res?.data);
          // setLoading(false);
        } else {
          navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };
  const getpostById = async (postId) => {
    // setLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/community/getPostById/${postId}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setPostData(res?.data?.data);
          // setLoading(false);
        } else {
          navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };
  const getCommentsByPostId = async (details) => {
    setCommentsLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/community/getCommentsByPostId/${details?.postId}?page=${details?.page}&pageSize=${details?.pageSize}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setPostComments(res?.data?.data);
          setCommentsLoading(false);
        } else {
          navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };
  const [lectureComments, setLectureComments] = useState([]);
  const getCommentsByLectureId = async (lectureId) => {
    // setCommentsLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/lecture/getRecordedComments?lectureId=${lectureId}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setLectureComments(res?.data?.data);
          // setCommentsLoading(false);
        } else {
          navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };

  //comment report
  const markCommentToReport = (id) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .put(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/lecture/markCommentToReport?commentId=${id}`,

        {},
        config
      )
      .then((res) => {
        // var previousPageURL = document.refrer;

        if (res?.data?.status) {
          toast.success("Comment reported");
          // getNotification();
          // getAllFeed()
        }
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
      })
      .catch((e) => console.log(e));
  };
  //comment report
  const markCommentToPin = (id) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .put(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/lecture/markCommentToPin?commentId=${id}`,

        {},
        config
      )
      .then((res) => {
        // var previousPageURL = document.refrer;

        if (res?.data?.status) {
          toast.success("Comment Pinned");
          // getNotification();
          // getAllFeed()
        }
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
      })
      .catch((e) => console.log(e));
  };

  const likeOrRemoveLike = (postId) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .put(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/community/likeOrRemoveLike?postId=${postId}`,

        {},
        config
      )
      .then((res) => {
        // var previousPageURL = document.refrer;

        if (res?.data?.status) {
          getAllFeed();
        }
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        // if (res?.data?.msg == "jwt malformed") {
        //   navigate("/login");
        // } else {
        //   toast.success("Review posted");
        //   // getProductReviews(Id);
        // }

        // setBanner(res?.data);
      })
      .catch((e) => console.log(e));
  };

  //post
  const replyToComments = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/community/replyToComments`,
        data,
        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success("Comment Added...");
          getCommentsByPostId({ postId: details?.postId });
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  //lecture
  const replyToCommentsLecture = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/lecture/replyToCommentForRecorded`,
        data,
        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success("Comment Added...");
          getCommentsByLectureId(details?.lectureId);
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };

  //post
  const addCommentToPost = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/community/addCommentToPost`,
        data,
        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success("Comment Added...");
          getCommentsByPostId({ postId: details?.postId });
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };

  //lecture
  const addCommentToLecture = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/lecture/postCommentForRecorded`,
        data,
        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success("Comment Added...");
          getCommentsByLectureId(details?.lectureId);
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };

  //post
  const deleteComment = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .delete(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/community/deleteComment?commentId=${details?.commentId}`,

        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success("Comment Deleted...");
          getCommentsByPostId({ postId: details?.postId });
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };

  //lecture
  const deleteCommentForLecture = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .delete(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/lecture/deleteCommentForRecorded?commentId=${details?.commentId}`,

        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success("Comment Deleted...");
          getCommentsByLectureId(details?.lectureId);
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };

  //post
  const deleteReplyComment = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .delete(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/community/deleteReplyComment?replyCommentId=${details?.commentId}`,

        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success("Comment Deleted...");
          getCommentsByPostId({ postId: details?.postId });
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };

  const getCTABanners = async (link, linkWith) => {
    setLoading(true);

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getCTABanners?link=${link}&linkWith=${linkWith}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setCtaBanner(res?.data?.data);
          setLoading(false);
        } else {
          navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };

  const getCourses = async (stream, limit, from, subCategorySlug) => {
    // console.log("1335", stream);
    setLoading(true);
    stream = stream === "All" ? "" : stream;
    if (!stream) stream = "";
    if (!limit) limit = 100;
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${
          process.env.REACT_APP_PRODUCTION_LIVE_URL
        }${GET_COURSES}?categorySlug=${stream}&subCategorySlug=${
          subCategorySlug ? subCategorySlug : ""
        }&limit=${limit}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          if (from == "CategoryPage" && res?.data?.status == false) {
            navigate("/404");
          } else {
            if (stream !== "") {
              // console.log('res', res?.data?.data?.batches)
              pushToDataLayer({
                ecommerce: null, // Clear the previous ecommerce object.
              });
              pushToDataLayer({
                event: "view_item_list",
                isLoggedIn: localStorage?.getItem("isLoggedIn"),
                ecommerce: {
                  item_list_id: res?.data?.data?.batches?.category?.id,
                  item_list_name: res?.data?.data?.batches?.category?.title,
                  items: res?.data?.data?.batches?.map((item) => {
                    return {
                      item_id: item.id,
                      item_name: item.batchName,
                      affiliation: item.category.title,
                      coupon: "",
                      discount: 0,
                      index: 0,
                      item_category: item.category.title,

                      item_list_id: item?.category?.id,
                      item_list_name: item?.category?.title,
                      item_brand: "Book",

                      price: parseInt(item.discount),
                      quantity: 1,
                    };
                  }),
                },
              });
            }
            setCourses(res?.data);
            setLoading(false);
          }
        } else {
          // console.log(res?.data)
          setCourses(res?.data);
          // navigate(`/batch/${subCategorySlug}`);
          // navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };

  const [selectedPlan, setSelectedPlan] = useState("");
  const getBatchDetailsById = async (slug) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getBatchDetailsBySlug/${slug}`,
        config
      )
      .then((res) => {
        if (res?.data?.status) {
          if (slug) {
            // console.log({
            //   event: "view_item",
            //   isLoggedIn: localStorage?.getItem('isLoggedIn'),
            //   ecommerce: {
            //     currency: "INR",
            //     value: parseInt(res?.data?.data?.discount),
            //     items: {
            //       item_id: res?.data?.data?.id,
            //       item_name: res?.data?.data?.batchName,
            //       affiliation: res?.data?.data?.categoryDetails.title,
            //       coupon: "",
            //       discount: parseInt(res?.data?.data?.discount) - parseInt(res?.data?.data?.discount),
            //       index: 0,
            //       item_brand: "Book",
            //       item_category: res?.data?.data?.categoryDetails.title,
            //       price: parseInt(res?.data?.data?.discount),
            //       quantity: 1
            //     }

            //   }
            // })

            pushToDataLayer({
              ecommerce: null, // Clear the previous ecommerce object.
            });
            pushToDataLayer({
              event: "view_item",
              isLoggedIn: localStorage?.getItem("isLoggedIn"),
              ecommerce: {
                currency: "INR",
                isLoggedIn: localStorage?.getItem("isLoggedIn"),
                value: parseInt(res?.data?.data?.discount),
                items: {
                  item_id: res?.data?.data?.id,
                  item_name: res?.data?.data?.batchName,
                  affiliation: res?.data?.data?.categoryDetails.title,
                  coupon: "",
                  discount:
                    parseInt(res?.data?.data?.discount) -
                    parseInt(res?.data?.data?.discount),
                  index: 0,
                  item_brand: "Book",
                  item_category: res?.data?.data?.categoryDetails.title,
                  price: parseInt(res?.data?.data?.discount),
                  quantity: 1,
                },
              },
            });
          }
          setCourse(res?.data);
          setSelectedPlan(res?.data?.data?.emiOptions[0]);
        } else {
          navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };
  const getAllTestSeries = async (stream) => {
    setLoading(true);
    stream = stream ? stream : "";
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        // Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getAllTestSeries?stream=${stream}`,
        config
      )
      .then((res) => {
        setTestSeries(res?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const getAllTestimonal = async (stream) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getAllTestimonal`,
        config
      )
      .then((res) => {
        setTestimonial(res?.data);
      })
      .catch((e) => console.log(e));
  };
  const getAllQuiz = async (stream) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getAllQuiz`,
        config
      )
      .then((res) => {
        setAllQuiz(res?.data);
      })
      .catch((e) => console.log(e));
  };
  const getAllTest = async (stream) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getAllTest`,
        config
      )
      .then((res) => {
        setAllTest(res?.data);
      })
      .catch((e) => console.log(e));
  };
  const getAllCategory = async (stream) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getAllCategory`,
        config
      )
      .then((res) => {
        setAllCategory(res?.data);
      })
      .catch((e) => console.log(e));
  };
  const getAllSubCategory = async (stream) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getAllSubCategory`,
        config
      )
      .then((res) => {
        setAllSubCategory(res?.data);
      })
      .catch((e) => console.log(e));
  };
  const getFreeTestSeries = async (stream) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getFreeTestSeries`,
        config
      )
      .then((res) => {
        setFreeTestSeries(res?.data);
      })
      .catch((e) => console.log(e));
  };
  const getAllFreeTest = async () => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getAllFreeTest`,
        config
      )
      .then((res) => {
        setLatestTestSeries(res?.data);
      })
      .catch((e) => console.log(e));
  };
  const getAllStaff = async () => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getAllStaff?limit=25`,
        config
      )
      .then((res) => {
        setStaff(res?.data);
      })
      .catch((e) => console.log(e));
  };
  const getLatestTestSeries = async () => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        // Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getLatestTestSeries`,
        config
      )
      .then((res) => {
        setLatestTestSeries(res?.data);
      })
      .catch((e) => console.log(e));
  };
  const getallYoutube = async (categoryId) => {
    let category = null;
    if (categoryId) {
      category = categoryId;
    } else {
      category = "";
    }

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getallYoutube?category=${category}`,
        config,
        {}
      )
      .then((res) => {
        if (res?.data?.data?.length == 0 && categoryId) {
          getallYoutube();
        } else {
          setYoutube(res?.data);
        }
      })
      .catch((e) => console.log(e));
  };
  const getCoupons = async () => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getCoupons`,
        config
      )
      .then((res) => {
        setCoupon(res?.data);
      })
      .catch((e) => console.log(e));
  };
  const getLecturesByBatchId = async (batchSlug) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getLecturesByBatchSlug/${batchSlug}`,
        config
      )
      .then((res) => {
        setLectures(res?.data);
      })
      .catch((e) => console.log(e));
  };
  const getBanner = async (categoryId, BannerType) => {
    let category = null;
    if (categoryId && categoryId !== "") {
      category = categoryId;
    } else {
      category = "";
    }
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getBanner?category=${category}&BannerType=${BannerType}`,

        config,
        {}
      )
      .then((res) => {
        if (res?.data?.data?.length == 0 && categoryId) {
          if (window.innerWidth < 450) {
            getBanner(categoryId, "APP");
          } else {
            getBanner(categoryId, "WEB");
          }
        } else {
          setBanner(res?.data);
        }
      })
      .catch((e) => console.log(e));
  };

  const getResultBanner = async (categoryId, resultYear) => {
    let category = null;
    if (categoryId && categoryId !== "") {
      category = categoryId;
    } else {
      category = "";
    }

    let year = null;
    if (resultYear && resultYear !== "") {
      year = resultYear;
    } else {
      year = "";
    }

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/getResultBanner?category=${category}&year=${year}`,

        config,
        {}
      )
      .then((res) => {
        if (res?.data?.data?.length == 0 && categoryId) {
          setResultBanner(res?.data?.data);
        } else {
          setResultBanner([]);
        }
      })
      .catch((e) => console.log(e));
  };

  const getSuccessStory = async (categoryId, resultYear) => {
    let category = null;
    if (categoryId && categoryId !== "") {
      category = categoryId;
    } else {
      category = "";
    }

    let year = null;
    if (resultYear && resultYear !== "") {
      year = resultYear;
    } else {
      year = "";
    }

    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/successStories?category=${category}&year=${year}`,

        config,
        {}
      )
      .then((res) => {
        if (res?.data?.data?.length == 0 && categoryId) {
          setSuccessStory(res?.data?.data);
        } else {
          setSuccessStory([]);
        }
      })
      .catch((e) => console.log(e));
  };

  //Auth
  const register = (details, from) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };
    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/register`,
        data,
        config
      )
      .then((res) => {
        // setBanner(res?.data);
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }

        if (res?.data?.status) {
          if (res?.data?.msg == "This Email Already Exists.") {
            toast.error(res?.data?.msg);
          }
          if (res?.data?.msg == "This Phone Number Already Exists.") {
            toast.error(res?.data?.msg);
          } else {
            navigate("/");
            toast.success(
              res?.data?.msg !== "" ? res?.data?.msg : "Successfully registered"
            );
          }
        }
      })
      .catch((e) => console.log(e));
  };
  const login = (details, from) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };
    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/login`,
        data,
        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          if (res?.data?.msg !== "jwt malformed") {
            if (res?.data?.msg !== "You are not our user") {
              if (res?.data?.msg == "Welcome Back !") {
                toast.success(res?.data?.msg);

                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("token", res?.data?.data.accessToken);
                localStorage.setItem(
                  "userDetails",
                  JSON.stringify(res?.data?.data)
                );
                // navigate('/');
                if (from !== "register") {
                  history.go(-1);
                } else {
                  navigate("/");
                }
              } else {
                if (res?.data?.msg == "google_signin") {
                  toast.error(res?.data?.msg);
                } else {
                  toast.success(res?.data?.msg);
                }
              }
            } else if (res?.data?.msg == "You are not our user") {
              toast.error("Invalid Id Or Password");
            }
          } else {
            toast.success(res?.data?.msg);
          }
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };

  //CTA
  const addCategoryDetails = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    const data = { ...details };
    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/authentication/addCategoryDetails`,
        data,
        config
      )
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.msg);
          setTimeout(() => {
            localStorage.setItem("index", 1);
            navigate("/learning/my-courses");
          }, 1000);
        } else {
          toast.error(res?.data?.msg);
        }
        // setBanner(res?.data);
        // alert(res?.data?.msg)
      })
      .catch((e) => console.log(e));
  };
  //CTA
  const postCTA = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    if (details.utm_campaign == "" || details.utm_campaign == null) {
      details.utm_campaign = "direct_search";
    }
    if (details.utm_medium == "" || details.utm_medium == null) {
      details.utm_medium = "direct_search";
    }
    if (details.utm_source == "" || details.utm_source == null) {
      details.utm_source = window.location.href;
    }
    const data = { ...details };
    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/createCTA`,
        data,
        config
      )
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.msg);
        } else {
          toast.error(res?.data?.msg);
        }
        // setBanner(res?.data);
        // alert(res?.data?.msg)
      })
      .catch((e) => console.log(e));
  };

  //get desc
  // const getBlog = async () => {
  //     const token = localStorage.getItem("token");
  //     const authToken = token;
  //     const config = {
  //         headers: {
  //             "content-type": "application/json",
  //             Authorization: `Bearer ${authToken}`,
  //         },
  //     };
  //     axios
  //         .get(
  //             // `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getBanner`,
  //             `https://sdblog.trando.in/wp-json/wp/v2/posts`,
  //             config
  //         )
  //         .then((res) => {
  //             setBlog(res);
  //         })
  //         .catch((e) => console.log(e));
  // };
  // const getBlogData = async (id) => {
  //     const token = localStorage.getItem("token");
  //     const authToken = token;
  //     const config = {
  //         headers: {
  //             "content-type": "application/json",
  //             Authorization: `Bearer ${authToken}`,
  //         },
  //     };
  //     axios
  //         .get(
  //             // `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getBanner`,
  //             `https://sdblog.trando.in/wp-json/wp/v2/posts/${id}`,
  //             config
  //         )
  //         .then((res) => {
  //             setBlogData(res);
  //         })
  //         .catch((e) => console.log(e));
  // };

  //Sd Store Blogs

  const getBlogs = async (stream) => {
    let category = "";
    if (stream) category = stream;
    setLoading(true);
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    let allCategory = await axios.get(
      `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getAllCategory`,
      config
    );
    let data = await Promise.all(
      allCategory.data?.data?.map(async (item, index) => {
        const newDataForItem = await axios.get(
          `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/adminPanel/getBlogs?categorySlug=${item.slug}&platform=website`,
          config
        );
        if (newDataForItem?.data?.data?.blogs.length > 0) {
          return {
            index,
            title: item?.name,
            data: newDataForItem?.data?.data?.blogs,
          };
        }
      })
    );
    data = data.filter((element) => element !== undefined);

    setCategoryBlogs(data);
  };

  const getBlogsByCategory = async (categorySlug) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/adminPanel/getBlogs?platform=website&categorySlug=${categorySlug}`,
        config
      )
      .then((res) => {
        if (res?.data?.status) {
          setParticularCategory(res?.data?.data);
          setLoading(false);
        } else {
          navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };

  const getAllBlogs = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/adminPanel/getBlogs?platform=website`,
        config
      )
      .then((res) => {
        if (res?.data?.status) {
          setAllBlogs(res?.data?.data);
          setLoading(false);
        } else {
          navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };
  const getBlogById = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/adminPanel/getBlog?slug=${id}`,
        config
      )
      .then((res) => {
        if (res?.data?.status) {
          setBlogById(res?.data?.data);
          setLoading(false);
        } else {
          navigate("/404");
        }
      })
      .catch((e) => console.log(e));
  };
  const getBlogFeaturedMedia = async (id) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(`https://sdblog.trando.in/wp-json/wp/v2/media?post=${id}`, config)
      .then((res) => {
        setBlogFeaturedMedia(res?.data);
      })
      .catch((e) => console.log(e));
  };
  const getLatestBlogs = (limit) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/adminPanel/getLatestBlog?platform=website&pageSize=${limit}`,
        config
      )
      .then((res) => {
        // setBlog(res?.data?.data);

        setLatestBlogs(res?.data?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  //Payment Gateway
  const initiatePayment = async (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = details;
    // const data = {
    //   batchId: "66d5aaa1ee3a7b3945052f27"
    //   , couponId: "676673f519b52825c655d385"
    //   , amount: "1.0"
    //   , utm_campaign: "new_payment"
    //   , utm_medium: "new_payment"
    //   , utm_source: "newpayment"
    //   , validityId: "6766700f19b52825c655d358"
    // };

    axios
      .post(
        // `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/payment/initiate_course_payment`,
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/purchase/initiateCoursePayment`,
        data,
        config
      )
      .then((res) => {
        localStorage.setItem("orderId", res?.data?.orderId);

        setInitiatePaymnetDetails(res?.data);

        setVerifyCouponResponse("");
        window.location.href = res?.data?.data?.paymentUrl;
      })
      .catch((e) => console.log(e));
  };
  //extend validity
  const addValidity = async (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = details;
    // const data = {
    //   batchId: "66d5aaa1ee3a7b3945052f27"
    //   , couponId: "676673f519b52825c655d385"
    //   , amount: "1.0"
    //   , utm_campaign: "new_payment"
    //   , utm_medium: "new_payment"
    //   , utm_source: "newpayment"
    //   , validityId: "6766700f19b52825c655d358"
    // };

    axios
      .post(
        // `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/payment/initiate_course_payment`,
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/purchase/addValidity`,
        data,
        config
      )
      .then((res) => {
        localStorage.setItem("orderId", res?.data?.orderId);

        setInitiatePaymnetDetails(res?.data);

        setVerifyCouponResponse("");
        window.location.href = res?.data?.data?.paymentUrl;
      })
      .catch((e) => console.log(e));
  };

  const reInitiatePayment = async (id) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { courseOrderId: id };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/payment/reInitiate_course_payment`,
        data,
        config
      )
      .then((res) => {
        // setInitiatePaymnetDetails(res?.data);
        // setVerifyCouponResponse("");
        window.location.href = res?.data?.data?.paymentUrl;
      })
      .catch((e) => console.log(e));
  };

  const emiInitiatePayment = async (
    emiId,
    courseOrderId,
    installmentNumber,
    amount
  ) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = {
      emiId: emiId,
      courseOrderId: courseOrderId,
      installmentNumber,
      amount,
    };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/payment/emiInitiatePayment`,
        data,
        config
      )
      .then((res) => {
        window.location.href = res?.data?.data?.paymentUrl;
      })

      .catch((e) => console.log(e));
  };
  //verufy coupon
  const verifyCoupon = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };
    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/verifyCoupon`,
        data,
        config
      )
      .then((res) => {
        // getAllStoreAddress()
        setVerifyCouponResponse(res?.data);
        if (
          res?.data?.msg == "Coupon Code Not Found Or Expired" ||
          res?.data?.msg == "Invalid Coupon Code" ||
          res?.data?.status == false
        ) {
          toast.error(res?.data?.msg);
        } else {
          toast.success("Coupon Applied");
        }
        // if (res?.data?.msg !== 'wishlist fetched' && res?.data?.msg !== 'jwt malformed') { toast.success(res?.data?.msg) }
        // if (details && res?.data?.msg == 'jwt malformed') {
        //   toast.error('Please Login')
        //   navigate('/login')
        // }

        // setWishlist(res?.data);
      })
      .catch((e) => console.log(e));
  };

  const signup = (details, from, ref, source) => {
    // const previousPageBase = previousPageURL?.split("?")[0];

    let refSplit = ref ? ref?.split("learning/")[1] : "";

    if (source !== "login-drawer" && source) {
      if (source == `${window.location.origin}/`) {
        Cookies.set("utm_campaign", "home-page");
        Cookies.set("utm_medium", "home-page");
        // Cookies.set('utm_source', 'home-page')
      } else {
        Cookies.set("utm_medium", source);
        Cookies.set("utm_campaign", source);
      }
    }

    var utm_campaign = Cookies.get("utm_campaign");
    var utm_medium = Cookies.get("utm_medium");
    var utm_source = Cookies.get("utm_source");

    if (utm_campaign == "" || !utm_campaign) {
      Cookies.set(utm_campaign, refSplit);
      utm_campaign = refSplit;
    }
    if (utm_medium == "" || !utm_medium) {
      utm_medium = refSplit;
    }
    if (utm_source == "" || !utm_source) {
      utm_source = "sdcampusweb";
    }
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = {
      ...details,
      utm_campaign: utm_campaign,
      utm_medium: utm_medium,
      utm_source: utm_source,
      platform: "website",
    };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/signup`,
        data,
        config
      )
      .then((res) => {
        if (!res?.data.status) {
          toast.error(res?.data?.msg);
        }

        if (res?.data?.status) {
          if (res?.data?.msg == "This Email Already Exists.") {
            toast.error(res?.data?.msg);
          }
          if (res?.data?.msg == "This Phone Number Already Exists.") {
            toast.error(res?.data?.msg);
          } else {
            localStorage.setItem("token", res?.data?.data);
            toast.success(
              res?.data?.msg !== "" ? res?.data?.msg : "Successfully registered"
            );

            pushToDataLayer({
              ecommerce: null, // Clear the previous ecommerce object.
            });
            pushToDataLayer({
              event: "signup",
              user_info: {
                ...data,
              },
            });
            // toast.success('OTP Sent')
            // localStorage.setItem('isOtpAccess', true)
            setTimeout(() => {
              if (from !== "sidebar") {
                navigate(`/otp?ref=${ref}`, {
                  state: {
                    otp: res?.data?.msg,
                    phone: details?.user_phone,
                    from: "login",
                  },
                });
              }
            }, 2000);

            // navigate('/')
          }
        }
      })
      .catch((e) => console.log(e));
  };

  const resendOtp = (phone) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = {
      user_phone: phone,
    };
    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/resendOtp`,
        data,
        config
      )
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.msg);
          localStorage.setItem("token", res?.data?.data);

          // localStorage.setItem('isLoggedIn', true)
          // navigate('/')
        }
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        // if (res?.data?.msg == "jwt malformed") {
        //   navigate("/login");
        // } else {
        //   toast.success("Review posted");
        //   // getProductReviews(Id);
        // }

        // setBanner(res?.data);
      })
      .catch((e) => console.log(e));
  };
  //verify OTP
  const [verifyOtpData, setVerifyOtp] = useState();
  const verifyOtp = (otp, ref, from = "") => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { otp: otp };
    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/verifyOtp`,
        data,
        config
      )
      .then((res) => {
        // var previousPageURL = document.refrer;

        if (res?.data?.status) {
          setVerifyOtp(res?.data);
          toast.success(res?.data?.msg);
          localStorage.setItem("token", res?.data?.data?.token);
          localStorage.setItem("details", JSON.stringify(res?.data?.data));

          pushToDataLayer({
            ecommerce: null, // Clear the previous ecommerce object.
          });
          pushToDataLayer({
            event: "verify_otp",
            user_info: {
              otp: otp,
              token: res?.data?.data?.token,
            },
          });
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("currentCategoryName", "");
          localStorage.setItem("currentCategoryId", "");
          localStorage.setItem("currentCategorySlug", "");
          localStorage.removeItem("isOtpAccess");

          if (
            (res?.data?.data?.name == "Name") | (res?.data?.data?.name == "") &&
            ref !== "campaign"
          ) {
            navigate(`/name?ref=${ref}`);
          } else {
            if (ref == "null" || (!ref && ref !== "campaign")) {
              localStorage.setItem("index", 1);
              navigate("/learning/my-courses");
            } else {
              if (from !== "sidebar" && from !== "campaign")
                window.location.replace(ref);
              setDrawerOpen(false);
              // window.location.replace(ref);
            }
            // navigate('/my-courses')
          }
        }
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        // if (res?.data?.msg == "jwt malformed") {
        //   navigate("/login");
        // } else {
        //   toast.success("Review posted");
        //   // getProductReviews(Id);
        // }

        // setBanner(res?.data);
      })
      .catch((e) => console.log(e));
  };
  const updateUserName = (name, ref) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { name: name };
    axios
      .put(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/updateUserName`,
        data,
        config
      )
      .then((res) => {
        // var previousPageURL = document.refrer;

        if (res?.data?.status) {
          toast.success(res?.data?.msg);
          // localStorage.setItem('token', res?.data?.data?.token)
          localStorage.setItem("details", JSON.stringify(res?.data?.data));
          // navigate('/stream')
          // localStorage.setItem('isLoggedIn', true)
          // localStorage.removeItem('isOtpAccess')
          if (res?.data?.data?.isNew) {
            navigate(`/stream?ref=${ref}`);
          } else {
            // window.location.replace(ref);
            // navigate('/my-courses')
          }
        }
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        // if (res?.data?.msg == "jwt malformed") {
        //   navigate("/login");
        // } else {
        //   toast.success("Review posted");
        //   // getProductReviews(Id);
        // }

        // setBanner(res?.data);
      })
      .catch((e) => console.log(e));
  };
  const updateUserProfile = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };
    axios
      .put(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/updateProfile`,
        data,
        config
      )
      .then((res) => {
        // var previousPageURL = document.refrer;

        if (res?.data?.status) {
          toast.success(res?.data?.msg);
          myProfile();
          // localStorage.setItem('token', res?.data?.data?.token)
          // localStorage.setItem('details', JSON.stringify(res?.data?.data))
          // navigate('/stream')
          // localStorage.setItem('isLoggedIn', true)
          // localStorage.removeItem('isOtpAccess')
          // if (res?.data?.data?.isNew) {
          //     navigate(`/stream?ref=${ref}`)
          // }
          // else {
          //     window.location.replace(ref)
          //     // navigate('/my-courses')
          // }
        }
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        // if (res?.data?.msg == "jwt malformed") {
        //   navigate("/login");
        // } else {
        //   toast.success("Review posted");
        //   // getProductReviews(Id);
        // }

        // setBanner(res?.data);
      })
      .catch((e) => console.log(e));
  };
  //User Language
  const updateUserlanguage = (language) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { language: language };
    axios
      .put(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/updateUserLanguage`,
        data,
        config
      )
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.msg);
          localStorage.setItem("details", JSON.stringify(res?.data?.data));
          // localStorage.setItem('token', res?.data?.data?.token)
          // localStorage.setItem('isLoggedIn', true)
          // localStorage.removeItem('isOtpAccess')
          // navigate('/')
        }
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        // if (res?.data?.msg == "jwt malformed") {
        //   navigate("/login");
        // } else {
        //   toast.success("Review posted");
        //   // getProductReviews(Id);
        // }

        // setBanner(res?.data);
      })
      .catch((e) => console.log(e));
  };
  const updateUserStream = (stream) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { Stream: stream };
    axios
      .put(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/updateUserStream`,
        data,
        config
      )
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.msg);
          localStorage.setItem("details", JSON.stringify(res?.data?.data));
          // localStorage.setItem('token', res?.data?.data?.token)
          // localStorage.setItem('isLoggedIn', true)
          // localStorage.removeItem('isOtpAccess')
          // navigate('/')
        }
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        // if (res?.data?.msg == "jwt malformed") {
        //   navigate("/login");
        // } else {
        //   toast.success("Review posted");
        //   // getProductReviews(Id);
        // }

        // setBanner(res?.data);
      })
      .catch((e) => console.log(e));
  };

  // My Courses

  const getMyCourses = async () => {
    setLoading(true);
    setLoadingForMyCourse(true);
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getMyCourses`,
        config
      )
      .then((res) => {
        // setBlog(res?.data?.data);

        setMyCourses(res?.data?.data);
        setLoading(false);
        setLoadingForMyCourse(false);
      })
      .catch((e) => console.log(e));
  };
  const getRecommendedCourses = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getRecommendedCourses`,
        config
      )
      .then((res) => {
        // setBlog(res?.data?.data);

        setRecommededCourses(res?.data?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const getMyCoursesByBatchId = async (slug) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getMyCoursesByBatch/${slug}`,
        config
      )
      .then((res) => {
        // setBlog(res?.data?.data);

        setMyCourseByBatchId(res?.data?.data);
        // console.log(res?.data?.data);

        pushToDataLayer({
          ecommerce: null, // Clear the previous ecommerce object.
        });
        pushToDataLayer({
          event: "view_purchased_batch",
          isLoggedIn: localStorage?.getItem("isLoggedIn"),

          items: {
            item_id: res?.data?.data?.batchId,
            item_name: res?.data?.data?.batchName,
            affiliation: res?.data?.data?.categoryDetails.title,
            startingDate: res?.data?.data?.startingDate,

            item_category: res?.data?.data?.categoryDetails.title,
          },
        });
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const getSubjectOfBatch = async (slug) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getSubjectOfBatch?batchSlug=${slug}`,
        config
      )
      .then((res) => {
        // setBlog(res?.data?.data);

        setSubjectOfBatch(res?.data?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const getNotes = async (batchSlug, subjectId) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getNotes?batchSlug=${batchSlug}&subjectId=${subjectId}`,
        config
      )
      .then((res) => {
        // setBlog(res?.data?.data);

        setNotesOfBatch(res?.data?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const getDPPs = async (batchSlug, subjectId) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getDPPs?batchSlug=${batchSlug}&subjectId=${subjectId}`,
        config
      )
      .then((res) => {
        // setBlog(res?.data?.data);

        setDppsOfBatch(res?.data?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const getLecturesOfSubject = async (batchSlug, subjectId) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getLecturesOfSubject?subjectId=${subjectId}&batchSlug=${batchSlug}`,
        config
      )
      .then((res) => {
        // setBlog(res?.data?.data);

        setLecturesOfBatch(res?.data?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const getAnnouncements = async (batchSlug) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getAnnouncementsByBatch/${batchSlug}`,
        config
      )
      .then((res) => {
        // setBlog(res?.data?.data);

        setAnnouncements(res?.data?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const [announcementsOfBatch, setAnnouncementsOfBatch] = useState();
  const getAnnouncementsOfBatch = async (batchSlug) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getAnnouncementsOfBatch/${batchSlug}`,
        config
      )
      .then((res) => {
        // setBlog(res?.data?.data);

        setAnnouncementsOfBatch(res?.data?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  const [loadingForTwoWay, setLoadingForTwoWay] = useState(true);
  const getLectureById = async (id, slug, from = "") => {
    setLoadingForTwoWay(true);
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getLecture?id=${id}&batchSlug=${slug}`,
        config
      )
      .then((res) => {
        // setBlog(res?.data?.data);

        setLectureDetails(res?.data?.data);
        if (from == "two-way") {
          // document.getElementById('join-button').click()
          setTimeout(() => {
            setLoadingForTwoWay(false);
            // document.getElementById('join-button').click()
          }, 1000);
        }
      })
      .catch((e) => console.log(e));
  };
  const getQuizByBatch = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getQuizDetailsByBatchId/${id}`,
        config
      )
      .then((res) => {
        // setBlog(res?.data?.data);

        setQuizDetails(res?.data?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const [quizDetailsOfBatch, setQuizDetailsOfBatch] = useState();
  const getQuizDetailsOfBatchId = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getQuizDetailsByBatchId/${id}`,
        config
      )
      .then((res) => {
        // setBlog(res?.data?.data);

        setQuizDetailsOfBatch(res?.data?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const [quizDetailsOfBatchPrepurchase, setQuizDetailsOfBatchPrepurchase] =
    useState();
  const getQuizDetailsOfBatchIdPrePurchase = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getQuizDetailsOfBatchId/${id}`,
        config
      )
      .then((res) => {
        // setBlog(res?.data?.data);

        setQuizDetailsOfBatchPrepurchase(res?.data?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const getPaidCourses = async (stream, limit, subCategorySlug) => {
    // setLoading(true)
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };

    axios
      .get(
        `${
          process.env.REACT_APP_PRODUCTION_LIVE_URL
        }/webContains/paidCourses?categorySlug=${stream}&subCategorySlug=${
          subCategorySlug ? subCategorySlug : ""
        }&limit=${limit}`,
        config
      )
      .then((res) => {
        // setBlog(res?.data?.data);

        setPaidCoursesData(res?.data?.data);
        // setLoading(false)
      })
      .catch((e) => console.log(e));
  };
  const getFreeCourses = async (stream, limit, subCategorySlug) => {
    // setLoading(true)
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };

    axios
      .get(
        `${
          process.env.REACT_APP_PRODUCTION_LIVE_URL
        }/webContains/freeCourses?categorySlug=${stream}&subCategorySlug=${
          subCategorySlug ? subCategorySlug : ""
        }&limit=${limit}`,
        config
      )
      .then((res) => {
        // setBlog(res?.data?.data);

        setFreeCoursesData(res?.data?.data);
        // setLoading(false)
      })
      .catch((e) => console.log(e));
  };

  //free course purchase
  const freePurchaseCourses = (batchId) => {
    // setLoading(true)
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { batchId: batchId };
    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/freePurchaseCourses`,
        data,
        config
      )
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.msg);
          setTimeout(() => {
            // setLoading(false)
            localStorage.setItem("index", 1);
            navigate("/learning/my-courses");
          }, 1500);
        } else {
          toast.error(res?.data?.msg);
          setTimeout(() => {
            // setLoading(false)
            localStorage.setItem("index", 1);
            navigate("/learning/my-courses");
          }, 1500);
        }
        // setBanner(res?.data);
      })
      .catch((e) => console.log(e));
  };

  //My Profile
  const myProfile = async (stream, limit) => {
    // setLoading(true)
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/myProfile`,
        config
      )
      .then((res) => {
        // setBlog(res?.data?.data);

        setMyProfileData(res?.data?.data);
        // setLoading(false)
      })
      .catch((e) => console.log(e));
  };
  //My Purchase
  const myPurchase = async (stream, limit) => {
    // setLoading(true)
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/myPurchase`,
        config
      )
      .then((res) => {
        // setBlog(res?.data?.data);

        setMyPurchaseData(res?.data?.data);
        // setLoading(false)
      })
      .catch((e) => console.log(e));
  };
  //SiteMap
  const [sitemapData, setSiteMapData] = useState();
  const getSiteMap = async () => {
    // setLoading(true)
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getSiteMap`,
        config
      )
      .then((res) => {
        setSiteMapData(res);
        // setBlog(res?.data?.data);

        // setMyPurchaseData(res?.data?.data);
        // setLoading(false)
      })
      .catch((e) => console.log(e));
  };

  const getSearch = async (query) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/searchCourses`,
        {
          params: {
            search: query,
            limit: 100,
          },
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
        config
      )
      .then((res) => {
        setSearchResult(res?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const [prePurchaseSubject, setPrePurchaseSubject] = useState();
  const getSubjectDetailsOfBatch = async (batchSlug) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getSubjectDetailsOfBatch`,
        {
          params: {
            batchSlug: batchSlug,
          },
          headers: {
            "content-type": "application/json",
            // Authorization: `Bearer ${authToken}`,
          },
        },
        config
      )
      .then((res) => {
        setPrePurchaseSubject(res?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const [prePurchaseLecture, setPrePurchaseLecture] = useState();
  const getLectureDetailsOfSubject = async (batchSlug, subjectId) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getLectureDetailsOfSubject`,
        {
          params: {
            batchSlug: batchSlug,
            subjectId: subjectId,
          },
          headers: {
            "content-type": "application/json",
            // Authorization: `Bearer ${authToken}`,
          },
        },
        config
      )
      .then((res) => {
        setPrePurchaseLecture(res?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const [prePurchaseNotes, setPrePurchaseNotes] = useState();
  const getNoteDetails = async (batchSlug, subjectId) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getNoteDetails`,
        {
          params: {
            batchSlug: batchSlug,
            subjectId: subjectId,
          },
          headers: {
            "content-type": "application/json",
            // Authorization: `Bearer ${authToken}`,
          },
        },
        config
      )
      .then((res) => {
        setPrePurchaseNotes(res?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const [prePurchaseDpp, setPrePurchaseDpp] = useState();
  const getDppDetails = async (batchSlug, subjectId) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/getDppDetails`,
        {
          params: {
            batchSlug: batchSlug,
            subjectId: subjectId,
          },
          headers: {
            "content-type": "application/json",
            // Authorization: `Bearer ${authToken}`,
          },
        },
        config
      )
      .then((res) => {
        setPrePurchaseDpp(res?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const [batchDoubts, setBatchDoubts] = useState();
  const getBatchDoubts = async (batchId, page, pageSize) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/getBatchCommunities`,
        {
          params: {
            batchId: batchId,
            page: page ?? 1,
            pageSize: pageSize ?? 10,
          },
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
        config
      )
      .then((res) => {
        setBatchDoubts(res?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const [batchCommunityData, setBatchCommunityData] = useState();
  const getBatchCommunity = async (batchId) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/getCommunity`,
        {
          params: {
            batchCommunityId: batchId,
          },
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
        config
      )
      .then((res) => {
        setBatchCommunityData(res?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const [particularBatchDoubtData, setParticularBatchDoubtData] = useState();
  const getDoubt = async (batchId) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/getDoubt`,
        {
          params: {
            batchDoubtId: batchId,
          },
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
        config
      )
      .then((res) => {
        setParticularBatchDoubtData(res?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const [batchDoubtData, setBatchDoubtData] = useState();
  const getDoubtsOfBatch = async (batchId, page, pageSize) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = {
      batchId: batchId,
      page: 1,
      pageSize: 10,
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/getBatchDoubts`,
        {
          params: {
            batchId: batchId,
            page: page,
            pageSize: pageSize,
          },
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
        config
      )
      .then((res) => {
        setBatchDoubtData(res?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const [myBatchDoubtData, setMyBatchDoubtData] = useState();
  const getMyBatchDoubts = async (batchId, page, pageSize) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = {
      batchId: batchId,
      page: 1,
      pageSize: 10,
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/getMyBatchDoubts`,
        {
          params: {
            batchId: batchId,
            page: page,
            pageSize: pageSize,
          },
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
        config
      )
      .then((res) => {
        setMyBatchDoubtData(res?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const [myCommunities, setMyBatchCommunitiesData] = useState();
  const getBatchMyCommunities = async (batchId, page, pageSize) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = {
      batchId: batchId,
      page: 1,
      pageSize: 10,
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/getBatchMyCommunities`,
        {
          params: {
            batchId: batchId,
            page: page,
            pageSize: pageSize,
          },
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
        config
      )
      .then((res) => {
        setMyBatchCommunitiesData(res?.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  const [createDoubtData, setCreateDoubtData] = useState();
  const createDoubt = (details, file) => {
    const token = localStorage.getItem("token");

    const formdata = new FormData();
    formdata.append("batchId", details?.batchId);

    formdata.append("file", file);

    // formdata.append('batchId', details?.batchId);
    // formdata.append('lectureId', details?.lectureId);
    // formdata.append('subjectId', details?.subjectId);
    formdata.append("desc", details?.desc);

    const authToken = token;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "community_created",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      batchId: details?.batchId,
    });

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/createCommunity`,
        formdata,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setCreateDoubtData(res?.data);
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          getBatchDoubts(details?.batchId, 1, 10);
          if (file) {
            toast.success(
              "Your Post will shown in community after the approval"
            );
          } else {
            toast.success(res?.data?.msg);
          }
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const [createDoubtBatchData, setCreateDoubtbatchData] = useState();
  const createDoubtBatch = (details, file) => {
    const token = localStorage.getItem("token");

    const formdata = new FormData();
    formdata.append("batchId", details?.batchId);

    formdata.append("file", file);

    // formdata.append('batchId', details?.batchId);
    formdata.append("lectureId", details?.lectureId);
    formdata.append("subjectId", details?.subjectId);
    formdata.append("desc", details?.desc);

    const authToken = token;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "doubt_created",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      batchId: details?.batchId,
    });

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/createDoubt`,
        formdata,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setCreateDoubtbatchData(res?.data);
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          getDoubtsOfBatch(details?.batchId, 1, 10);
          if (file) {
            toast.success(
              "Your Post will shown in community after the approval"
            );
          } else {
            toast.success(res?.data?.msg);
          }
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const [
    createBatchCommunityCommentsData,
    setCreateBatchCommunityCommentsData,
  ] = useState();
  const createBatchCommunityComments = (details, file) => {
    const token = localStorage.getItem("token");

    const formdata = new FormData();
    if (file) {
      formdata.append("file", file);
    }
    formdata.append("msg", details?.msg);
    formdata.append("batchCommunityId", details?.batchCommunityId);

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "add_comment_community",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      batchCommunityId: details?.batchCommunityId,
      batchId: details?.batchId,
    });

    const authToken = token;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/createBatchCommunityComment`,
        formdata,
        config
      )
      .then((res) => {
        setCreateBatchCommunityCommentsData(res?.data);
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          getCommunityComments({
            batchCommunityId: details?.batchCommunityId,
            page: 1,
            pageSize: 10,
          });
          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  //short comment
  const [shortCommentsData, setShortCommentsData] = useState();
  const addCommentToShort = (details) => {
    const token = localStorage.getItem("token");

    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    const data = { ...details };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "add_comment_short",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      shortId: details?.shortId,
      msg: details?.msg,
    });
    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/addCommentToShort`,
        data,
        config
      )
      .then((res) => {
        setShortCommentsData(res?.data);
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          getCommentsShorts({
            shortId: details.shortId,
            page: 1,
            pageSize: 10,
          });

          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const [createBatchDoubtCommentsData, setcreateBatchDoubtCommentsData] =
    useState();
  const createBatchDoubtComment = (details, file) => {
    const token = localStorage.getItem("token");

    const formdata = new FormData();
    if (file) {
      formdata.append("file", file);
    }
    formdata.append("msg", details?.msg);
    formdata.append("batchDoubtId", details?.batchDoubtId);

    const authToken = token;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "add_comment_doubt",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      batchCommunityId: details?.batchCommunityId,
      batchId: details?.batchId,
    });

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/createBatchDoubtComment`,
        formdata,
        config
      )
      .then((res) => {
        setcreateBatchDoubtCommentsData(res?.data);
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          getDoubt(details?.batchDoubtId);
          // getCommunityComments({ batchCommunityId: details?.batchCommunityId, page: 1, pageSize: 10 })
          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const [reportCommunityData, setReportCommunity] = useState();
  const reportCommunity = (details) => {
    const token = localStorage.getItem("token");

    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { batchCommunityId: details?.id, reason: details?.reason };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "report_community",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      batchCommunityId: details?.id,
      reason: details?.reason,
    });
    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/reportCommunity`,
        data,
        config
      )
      .then((res) => {
        setReportCommunity(res?.data);
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const reportShort = (details) => {
    const token = localStorage.getItem("token");

    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { shortId: details?.id, reason: details?.reason };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/reportShort`,
        data,
        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const [reportDoubtData, setReportDoubt] = useState();
  const reportDoubt = (details) => {
    const token = localStorage.getItem("token");

    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { batchDoubtId: details?.id, reason: details?.reason };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "report_doubt",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      batchCommunityId: details?.id,
      reason: details?.reason,
    });

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/reportDoubt`,
        data,
        config
      )
      .then((res) => {
        setReportDoubt(res?.data);
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const [reportCommentData, setReportComment] = useState();
  const reportComment = (details) => {
    const token = localStorage.getItem("token");

    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { commentId: details?.id, reason: details?.reason };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "report_comment_community",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      commentId: details?.id,
      reason: details?.reason,
    });
    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/reportComment`,
        data,
        config
      )
      .then((res) => {
        setReportComment(res?.data);
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const reportCommentShort = (details) => {
    const token = localStorage.getItem("token");

    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { commentId: details?.id, reason: details?.reason };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "report_comment_short",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      commentId: details?.id,
      reason: details?.reason,
    });

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/reportComment`,
        data,
        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const [reportDoubtCommentData, setreportDoubtComment] = useState();
  const reportDoubtComment = (details) => {
    const token = localStorage.getItem("token");

    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { commentId: details?.id, reason: details?.reason };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "report_comment_doubt",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      commentId: details?.id,
      reason: details?.reason,
    });

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/reportDoubtComment`,
        data,
        config
      )
      .then((res) => {
        setreportDoubtComment(res?.data);
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const reportReplyComment = (details) => {
    const token = localStorage.getItem("token");

    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { replyCommentId: details?.id, reason: details?.reason };
    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "report_comment_short",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      commentId: details?.id,
      reason: details?.reason,
    });
    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/reportReplyComment`,
        data,
        config
      )
      .then((res) => {
        // setReportComment(res?.data)
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const reportReplyCommentShort = (details) => {
    const token = localStorage.getItem("token");

    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { replyCommentId: details?.id, reason: details?.reason };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "report_comment_short",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      replyCommentId: details?.id,
      reason: details?.reason,
    });
    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/reportReplyComment`,
        data,
        config
      )
      .then((res) => {
        // setReportComment(res?.data)
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const [batchCommunityLikeAndDislikeData, setBatchCommunityLikeAndDislike] =
    useState();
  const batchCommunityLikeAndDislike = (details, batchId) => {
    const token = localStorage.getItem("token");

    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "community_liked",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      batchId: batchId,
      batchCommunityId: details.batchCommunityId,
    });
    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/batchCommunityLikeAndDislike`,
        data,
        config
      )
      .then((res) => {
        setBatchCommunityLikeAndDislike(res?.data);
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          if (batchId !== "") {
            // getBatchDoubts(batchId, 1, 10);
          } else {
            getBatchCommunity(details?.batchCommunityId);
          }

          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const [batchDoubtLikeAndDislikeData, setBatchDoubtLikeAndDislike] =
    useState();
  const batchDoubtLikeAndDislike = (details, batchId) => {
    const token = localStorage.getItem("token");

    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "doubt_liked",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      batchId: batchId,
      batchCommunityId: details.batchCommunityId,
    });

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/batchDoubtLikeAndDislike`,
        data,
        config
      )
      .then((res) => {
        setBatchDoubtLikeAndDislike(res?.data);
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          if (batchId !== "") {
            // getDoubtsOfBatch(batchId, 1, 10);
          } else {
            getDoubt(details?.batchDoubtId);
          }

          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const [replyToCommentsCommunity, setReplyToCommentsCommunity] = useState();
  const replyToCommentsBatchCommunity = (details) => {
    const token = localStorage.getItem("token");

    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { msg: details?.msg, commentId: details?.commentId };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/replyToComments`,
        data,
        config
      )
      .then((res) => {
        setReplyToCommentsCommunity(res?.data);
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          getCommunityComments({
            batchCommunityId: details?.batchCommunityId,
            page: 1,
            pageSize: 10,
          });

          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const [replyToCommentsShortsData, setReplyToCommentsShorts] = useState();
  const replyToCommentsShorts = (details) => {
    const token = localStorage.getItem("token");

    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = {
      msg: details?.msg,
      commentId: details?.commentId,
      replyTo: details?.replyId,
    };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/replyToComments`,
        data,
        config
      )
      .then((res) => {
        setReplyToCommentsShorts(res?.data);
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          getCommentsShorts({
            shortId: details.shortId,
            page: details?.page,
            pageSize: details?.pageSize,
          });

          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };

  //community comments
  const [batchCommunityCommentsData, setBatchCommunityCommentsData] =
    useState();
  const getCommunityComments = (details) => {
    const token = localStorage.getItem("token");

    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/getCommunityComments`,
        {
          params: {
            batchCommunityId: details?.batchCommunityId,
            page: details?.page,
            pageSize: details?.pageSize,
          },
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
        config
      )
      .then((res) => {
        setBatchCommunityCommentsData(res?.data);
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          // toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  //community comments
  const [shortComments, setShortsCommentsData] = useState();
  const getCommentsShorts = (details) => {
    const token = localStorage.getItem("token");

    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/getComments`,
        {
          params: {
            shortId: details?.shortId,
            page: details?.page,
            pageSize: details?.pageSize,
          },
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
        config
      )
      .then((res) => {
        setShortsCommentsData(res?.data);
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          // toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };

  //delete comment

  const deleteCommentBatchCommunity = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "community_comment_delete",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      batchId: details?.batchId,
      commentId: details.commentId,
      batchCommunityId: details.batchCommunityId,
    });
    axios
      .delete(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/deleteComment?commentId=${details?.commentId}`,

        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success("Comment Deleted...");
          getCommunityComments({
            batchCommunityId: details?.batchCommunityId,
            page: 1,
            pageSize: 10,
          });
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const deleteCommentShorts = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .delete(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/deleteComment?commentId=${details?.commentId}`,

        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          getCommentsShorts({
            shortId: details.shortId,
            page: 1,
            pageSize: 10,
          });

          toast.success("Comment Deleted...");
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };

  const deleteDoubtComment = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "doubt_comment_delete",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      batchId: details?.batchId,
      commentId: details.commentId,
      batchCommunityId: details.batchCommunityId,
    });

    axios
      .delete(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/deleteDoubtComment?commentId=${details?.commentId}`,

        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success("Comment Deleted...");
          getDoubt(details?.batchCommunityId);
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const deleteReplyCommentCommunity = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "doubt_comment_delete",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      batchId: details?.batchId,
      commentId: details.commentId,
      batchCommunityId: details.batchCommunityId,
    });

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "community_comment_delete",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      batchId: details?.batchId,
      commentId: details.replyCommentId,
      batchCommunityId: details.batchCommunityId,
    });
    axios
      .delete(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/deleteReplyComment?replyCommentId=${details?.replyCommentId}`,

        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success("Comment Deleted...");
          getCommunityComments({
            batchCommunityId: details?.batchCommunityId,
            page: 1,
            pageSize: 10,
          });
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const deleteReplyCommentShorts = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    axios
      .delete(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/deleteReplyComment?replyCommentId=${details?.replyCommentId}`,

        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          toast.success("Comment Deleted...");
          getCommentsShorts({
            shortId: details.shortId,
            page: 1,
            pageSize: 10,
          });
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const deleteCommunity = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "community_delete",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      batchId: details?.batchId,
      batchCommunityId: details.batchCommunityId,
    });
    axios
      .delete(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/deleteCommunity?batchCommunityId=${details?.batchCommunityId}`,

        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          getBatchDoubts(details?.batchId, 1, 10);
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          getBatchDoubts(details?.batchId, 1, 10);
          toast.success("Community Deleted...");
          // getCommunityComments({ batchCommunityId: details?.batchCommunityId, page: 1, pageSize: 10 })
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  const deleteBatchDoubt = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "community_delete",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      batchId: details?.batchId,
      batchCommunityId: details.batchCommunityId,
    });

    axios
      .delete(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/deleteBatchDoubt?doubtId=${details?.batchCommunityId}`,

        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          getDoubtsOfBatch(details?.batchId, 1, 10);
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          getDoubtsOfBatch(details?.batchId, 1, 10);
          toast.success("Community Deleted...");
          // getCommunityComments({ batchCommunityId: details?.batchCommunityId, page: 1, pageSize: 10 })
        }
        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };

  //update comment
  const editComment = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { commentId: details?.commentId, msg: details?.msg };

    axios
      .put(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/editComment`,
        data,
        config
      )
      .then((res) => {
        // var previousPageURL = document.refrer;

        if (res?.data?.status) {
          toast.success(res?.data?.msg);
          getCommunityComments({
            batchCommunityId: details?.batchCommunityId,
            page: 1,
            pageSize: 10,
          });
        }
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
      })
      .catch((e) => console.log(e));
  };

  const editDoubtComment = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { commentId: details?.commentId, msg: details?.msg };

    axios
      .put(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/editDoubtComment`,
        data,
        config
      )
      .then((res) => {
        // var previousPageURL = document.refrer;

        if (res?.data?.status) {
          toast.success(res?.data?.msg);
          getDoubt(details?.batchCommunityId);
        }
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
      })
      .catch((e) => console.log(e));
  };
  const editReplyComment = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { replyCommentId: details?.replyCommentId, msg: details?.msg };
    console.log("damy=t", data);
    axios
      .put(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/editReplyComment`,
        data,
        config
      )
      .then((res) => {
        // var previousPageURL = document.refrer;

        if (res?.data?.status) {
          toast.success(res?.data?.msg);

          getCommunityComments({
            batchCommunityId: details?.batchCommunityId,
            page: 1,
            pageSize: 10,
          });
        }
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
      })
      .catch((e) => console.log(e));
  };
  const editShortComment = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { commentId: details?.commentId, msg: details?.msg };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/editComment`,
        data,
        config
      )
      .then((res) => {
        // var previousPageURL = document.refrer;

        if (res?.data?.status) {
          toast.success(res?.data?.msg);
          getCommentsShorts({
            shortId: details.shortId,
            page: 1,
            pageSize: 10,
          });
        }
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
      })
      .catch((e) => console.log(e));
  };
  const editShortReplyComment = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { replyCommentId: details?.replyCommentId, msg: details?.msg };

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/editReplyComment`,
        data,
        config
      )
      .then((res) => {
        // var previousPageURL = document.refrer;

        if (res?.data?.status) {
          toast.success(res?.data?.msg);
          getCommentsShorts({
            shortId: details.shortId,
            page: 1,
            pageSize: 10,
          });
        }
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
      })
      .catch((e) => console.log(e));
  };
  //view reel
  const viewed = (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { shortId: details?.shortId };
    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "short_viewed",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      short_id: details?.shortId,
    });

    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/viewed`,
        data,
        config
      )
      .then((res) => {
        // var previousPageURL = document.refrer;

        if (res?.data?.status) {
          // toast.success(res?.data?.msg);
        }
        if (!res?.data?.status) {
          // toast.error(res?.data?.msg);
        }
      })
      .catch((e) => console.log(e));
  };
  const editCommunity = (details, file, problemImage) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const formdata = new FormData();
    if (file && file !== "") {
      formdata.append("file", file);
    }
    if (problemImage) {
      formdata.append("problemImage", problemImage);
    }
    // else {
    //   formdata.append('problemImage', file)
    // }
    formdata.append("batchCommunityId", details?.batchCommunityId);
    formdata.append("desc", details?.desc);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };
    axios
      .put(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/editCommunity`,
        formdata,
        config
      )
      .then((res) => {
        // var previousPageURL = document.refrer;

        if (res?.data?.status) {
          if (file) {
            toast.success(
              "Your Post will shown in community after the approval"
            );
          } else {
            toast.success(res?.data?.msg);
          }

          getBatchDoubts(details?.batchId, 1, 10);
        }
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
      })
      .catch((e) => console.log(e));
  };
  const editBatchDoubt = (details, file, problemImage) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const formdata = new FormData();
    if (file) {
      formdata.append("file", file);
    }
    if (problemImage) {
      formdata.append("problemImage", problemImage);
    }
    //  else {
    //   formdata.append('file', '')
    // }
    formdata.append("batchDoubtId", details?.batchCommunityId);
    formdata.append("desc", details?.desc);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { ...details };
    axios
      .put(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/editBatchDoubt`,
        formdata,
        config
      )
      .then((res) => {
        // var previousPageURL = document.refrer;

        if (res?.data?.status) {
          if (file) {
            toast.success(
              "Your Post will shown in community after the approval"
            );
          } else {
            toast.success(res?.data?.msg);
          }

          getDoubtsOfBatch(details?.batchId, 1, 10);
        }
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
      })
      .catch((e) => console.log(e));
  };

  //Quick-Learning
  //Quick-Learning
  const [shortVideosData, setShortVideosData] = useState();
  const getShortVideos = async (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/getShortVideos?page=${details?.page}&pageSize=${details?.pageSize}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setShortVideosData(res?.data?.data);
        } else {
          toast.error(res?.data?.msg);
        }
      })
      .catch((e) => console.log(e));
  };
  //Quick-Learning
  const [savedShortVideosData, setSavedShortVideosData] = useState();
  const mySaved = async () => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/mySaved?page=1&pageSize=10`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setSavedShortVideosData(res?.data?.data);
        } else {
          toast.error(res?.data?.msg);
        }
      })
      .catch((e) => console.log(e));
  };
  //Quick-Learning
  const [shortVideosDataByChannel, setShortVideosDataByChannel] = useState();
  const getShortVideosByChannel = async (data) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/getShortVideosByChannel?page=${data?.page}&pageSize=${data?.pageSize}&channelId=${data?.channelId}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setShortVideosDataByChannel(res?.data?.data);
        } else {
          toast.error(res?.data?.msg);
        }
      })
      .catch((e) => console.log(e));
  };
  //Quick-Learning
  const [particularShortVideo, setparticularShortVideosData] = useState();
  const getShortVideoDetails = async (data) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/getShortVideoDetails?shortId=${data?.shortId}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setparticularShortVideosData(res?.data?.data);
        } else {
          toast.error(res?.data?.msg);
        }
      })
      .catch((e) => console.log(e));
  };
  const [channelProfileData, setChannelProfileData] = useState();
  const channelProfile = async (data) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/channelProfile?channelId=${data?.channelId}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setChannelProfileData(res?.data?.data);
        } else {
          toast.error(res?.data?.msg);
        }
      })
      .catch((e) => console.log(e));
  };

  //save or unsave short
  const makeSaveOrUnsave = (details, from) => {
    const token = localStorage.getItem("token");

    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { shortId: details?.shortId };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "short_saved",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      shortId: details?.shortId,
    });
    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/makeSaveOrUnsave`,
        data,
        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          if (details?.from == "feed") {
            // getShortVideos()
          } else if (details?.from == "single") {
            getShortVideoDetails({ shortId: details?.shortId });
          }
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          if (details?.from == "feed") {
            // getShortVideos()
          } else if (details?.from == "single") {
            getShortVideoDetails({ shortId: details?.shortId });
          }
          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  //like or remove like short
  const likeOrRemoveLikeOfShort = (details, from) => {
    const token = localStorage.getItem("token");

    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { shortId: details?.shortId };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "short_liked",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      shortId: details?.shortId,
    });
    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/likeOrRemoveLikeOfShort`,
        data,
        config
      )
      .then((res) => {
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
          if (details?.from == "feed") {
            // getShortVideos()
          } else if (details?.from == "single") {
            getShortVideoDetails({ shortId: details?.shortId });
          }
        }
        if (res?.data?.status) {
          if (details?.from == "feed") {
            // getShortVideos()
          } else if (details?.from == "single") {
            getShortVideoDetails({ shortId: details?.shortId });
          }
          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };
  //subscribe or unsubscribe like short
  const channelSubscribeOrUnSubscribe = (details) => {
    const token = localStorage.getItem("token");

    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const data = { channelId: details?.channelId };

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "short_channel_followed",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      channelId: details?.channelId,
    });
    axios
      .post(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/learning/channelSubscribeOrUnSubscribe`,
        data,
        config
      )
      .then((res) => {
        channelProfile({ channelId: data?.channelId });
        if (!res?.data?.status) {
          toast.error(res?.data?.msg);
        }
        if (res?.data?.status) {
          getShortVideos();
          toast.success(res?.data?.msg);
        }

        // setBanner(res?.data);
      })
      .catch((e) => toast.error("Not a user"));
  };

  //batch-plan
  const [batchPlanData, setBatchPlanData] = useState();
  const getBatchPlan = async (details) => {
    const token = localStorage.getItem("token");
    const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken ? authToken : ""}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/user/getBatchPlan?batchId=${details?.batchId}`,
        config
      )
      .then((res) => {
        if (res.data.status) {
          setBatchPlanData(res?.data?.data);
        } else {
          // toast.error(res?.data?.msg)
        }
      })
      .catch((e) => console.log(e));
  };
  //twoway
  const [tranportState, setTranportState] = useState("");
  let contextData = {
    setTranportState: setTranportState,
    tranportState: tranportState,
    ctaBanner: ctaBanner,
    getCTABanners: getCTABanners,
    getCourses: getCourses,
    getBatchDetailsById: getBatchDetailsById,
    getAllTestSeries: getAllTestSeries,
    getAllTestimonal: getAllTestimonal,
    getAllQuiz: getAllQuiz,
    getAllTest: getAllTest,
    getAllSubCategory: getAllSubCategory,
    getAllCategory: getAllCategory,
    getFreeTestSeries: getFreeTestSeries,
    getLatestTestSeries: getLatestTestSeries,
    getAllFreeTest: getAllFreeTest,
    getAllStaff: getAllStaff,
    getallYoutube: getallYoutube,
    getCoupons: getCoupons,
    getLecturesByBatchId: getLecturesByBatchId,
    getBanner: getBanner,
    resultBanner: resultBanner,
    successStory: successStory,
    getResultBanner: getResultBanner,
    getSuccessStory: getSuccessStory,
    register: register,
    postCTA: postCTA,
    // getBlog: getBlog,
    getBlogById: getBlogById,
    getBlogs: getBlogs,

    getLatestBlogs: getLatestBlogs,
    getBlogFeaturedMedia: getBlogFeaturedMedia,
    login: login,
    setSelectedCategory: setSelectedCategory,
    initiatePayment: initiatePayment,
    verifyCoupon: verifyCoupon,
    setVerifyCouponResponse: setVerifyCouponResponse,
    signup: signup,
    verifyOtp: verifyOtp,
    resendOtp: resendOtp,
    updateUserStream: updateUserStream,
    updateUserlanguage: updateUserlanguage,
    getAllBlogs: getAllBlogs,
    getMyCourses: getMyCourses,
    getRecommendedCourses: getRecommendedCourses,
    getMyCoursesByBatchId: getMyCoursesByBatchId,
    getSubjectOfBatch: getSubjectOfBatch,
    getLecturesOfSubject: getLecturesOfSubject,
    getNotes: getNotes,
    getDPPs: getDPPs,
    getLectureById: getLectureById,
    getAnnouncements: getAnnouncements,
    getQuizByBatch: getQuizByBatch,
    getBlogsByCategory: getBlogsByCategory,

    updateUserName: updateUserName,
    getFreeCourses: getFreeCourses,
    getPaidCourses: getPaidCourses,
    freePurchaseCourses: freePurchaseCourses,
    myProfile: myProfile,
    myPurchase: myPurchase,
    updateUserProfile: updateUserProfile,
    getSiteMap: getSiteMap,
    getSearch: getSearch,
    getAllFeed: getAllFeed,
    getpostById: getpostById,
    likeOrRemoveLike: likeOrRemoveLike,
    addCommentToPost: addCommentToPost,
    deleteComment: deleteComment,
    replyToComments: replyToComments,
    deleteReplyComment: deleteReplyComment,
    getCommentsByPostId: getCommentsByPostId,
    getTodayClasses: getTodayClasses,
    todayClasses: todayClasses,

    setAllFeed: setAllFeed,
    allFeed: allFeed,
    postData: postData,
    postComments: postComments,
    commentsLoading: commentsLoading,

    sitemapData: sitemapData,
    myProfileData: myProfileData,
    myPurchaseData: myPurchaseData,
    freePurchaseCourse: freePurchaseCourse,

    particularCategoryBlogs: particularCategoryBlogs,
    quizDetails: quizDetails,
    dppsOfBatch: dppsOfBatch,
    lectureDetails: lectureDetails,
    announcements: announcements,

    // getBlogData: getBlogData,
    testSeries: testSeries,
    verifyCouponResponse: verifyCouponResponse,
    courses: courses,
    course: course,
    testimonial: testimonial,
    test: test,
    quiz: quiz,
    category: category,
    subCategory: subCategory,
    freeTestSeries: freeTestSeries,
    latestTestSeries: latestTestSeries,
    staff: staff,
    youtube: youtube,
    coupon: coupon,
    lectures: lectures,
    banner: banner,
    // blog: blog,
    // blogData: blogData,
    categoryBlogs: categoryBlogs,
    latestBlogs: latestBlogs,
    blog: blog,
    blogCategory: blogCategory,
    blogById: blogById,
    blogFeaturedMedia: blogFeaturedMedia,
    loading: loading,
    loadingForMyCourse: loadingForMyCourse,
    selectedCategory: selectedCategory,
    allBlogs: allBlogs,
    myCourses: myCourses,
    recommendedCourses: recommendedCourses,
    myCourseByBatchId: myCourseByBatchId,
    subjectOfBatch: subjectOfBatch,
    lecturesOfBatch: lecturesOfBatch,
    notesOfBatch: notesOfBatch,
    paidCoursesData: paidCoursesData,
    freeCoursesData: freeCoursesData,
    searchResult: searchResult,
    setStickyNav: setStickyNav,
    stickyNav: stickyNav,
    setEmiInstallment: setEmiInstallment,
    emiInstallment: emiInstallment,
    setSelectedPlan: setSelectedPlan,
    selectedPlan: selectedPlan,
    setTotalAmountOfInstallment: setTotalAmountOfInstallment,
    totalAmountOfInstallment: totalAmountOfInstallment,
    reInitiatePayment: reInitiatePayment,
    emiInitiatePayment: emiInitiatePayment,
    setSidebarExpanded: setSidebarExpanded,
    isSidebarExpanded: isSidebarExpanded,
    setDropDownCategory: setDropDownCategory,
    dropdownCategory: dropdownCategory,
    updateIsRead: updateIsRead,
    getNotification: getNotification,
    notifications: notifications,
    setLoadingForTwoWay: setLoadingForTwoWay,
    loadingForTwoWay: loadingForTwoWay,
    setParticularQuizDetails: setParticularQuizDetails,
    particularQuizDetails: particularQuizDetails,
    getQuizById: getQuizById,
    walletDetails: walletDetails,
    getRefaralTxn: getRefaralTxn,
    withdrawalRequest: withdrawalRequest,
    setSelectedCategoryId: setSelectedCategoryId,
    selectedCategoryId: selectedCategoryId,
    postRating: postRating,
    postReport: postReport,
    updateCurrentCategory: updateCurrentCategory,
    getFAQs: getFAQs,
    faq: faq,
    addCommentToLecture: addCommentToLecture,
    getCommentsByLectureId: getCommentsByLectureId,
    lectureComments: lectureComments,
    deleteCommentForLecture: deleteCommentForLecture,
    replyToCommentsLecture: replyToCommentsLecture,
    markCommentToReport: markCommentToReport,
    markCommentToPin: markCommentToPin,
    getQuestionsByQuizId: getQuestionsByQuizId,
    particularQuizQuestions: particularQuizQuestions,
    attemptQuiz: attemptQuiz,
    getQuizResult: getQuizResult,
    quizResult: quizResult,
    getleaderBoard: getleaderBoard,
    quizLeaderboard: quizLeaderboard,
    getEbooks: getEbooks,
    ebooks: ebooks,
    setEbooks,
    getSpecficEbook: getSpecficEbook,
    specificEbook: specificEbook,
    getMyEbooks: getMyEbooks,
    myEbook: myEbook,
    getMyEbookById: getMyEbookById,
    myEbookById: myEbookById,
    getTopic: getTopic,
    ebookTopic: ebookTopic,
    postReviewForEbook: postReviewForEbook,
    verify_ebook_payment: verify_ebook_payment,
    ebook_initiate_payment: ebook_initiate_payment,
    ebookPayment: ebookPayment,
    getEbookReview: getEbookReview,
    ebookReviews: ebookReviews,
    getAllStoreProduct: getAllStoreProduct,
    storeProducts: storeProducts,
    setShowPopups,
    showPopups,
    setDrawerOpen,
    isDrawerOpen,
    withBook,
    setWithBook,
    createCampaign,
    createCampaignData,
    verifyOtpData,
    sendOtpToPhone,
    sendOtpToPhoneData,
    addCategoryDetails,
    prePurchaseSubject,
    getSubjectDetailsOfBatch,
    getLectureDetailsOfSubject,
    prePurchaseLecture,
    setPrePurchaseLecture,
    getNoteDetails,
    getDppDetails,
    prePurchaseDpp,
    prePurchaseNotes,
    getBatchDoubts,
    batchDoubts,
    createDoubt,
    createDoubtData,
    createBatchCommunityComments,
    createBatchCommunityCommentsData,
    batchCommunityLikeAndDislike,
    batchCommunityLikeAndDislikeData,
    reportCommunity,
    reportCommunityData,
    getBatchCommunity,
    batchCommunityData,
    batchCommunityCommentsData,
    getCommunityComments,
    replyToCommentsBatchCommunity,
    replyToCommentsCommunity,
    deleteCommentBatchCommunity,
    deleteReplyCommentCommunity,
    deleteCommunity,
    editCommunity,
    editReplyComment,
    editComment,
    reportComment,
    reportReplyComment,
    getAnnouncementsOfBatch,
    announcementsOfBatch,
    getQuizDetailsOfBatchId,
    getQuizDetailsOfBatchIdPrePurchase,

    quizDetailsOfBatchPrepurchase,
    quizDetailsOfBatch,
    createDoubtBatch,
    getDoubtsOfBatch,
    batchDoubtData,
    batchDoubtLikeAndDislike,
    reportDoubtComment,
    reportDoubt,
    deleteBatchDoubt,
    createBatchDoubtComment,
    getDoubt,
    particularBatchDoubtData,
    deleteDoubtComment,
    editBatchDoubt,
    editDoubtComment,
    getMyBatchDoubts,
    myBatchDoubtData,
    getBatchMyCommunities,
    myCommunities,
    getShortVideos,
    shortVideosData,
    getShortVideosByChannel,
    shortVideosDataByChannel,
    channelProfile,
    channelProfileData,
    makeSaveOrUnsave,
    savedShortVideosData,
    mySaved,
    particularShortVideo,
    getShortVideoDetails,
    likeOrRemoveLikeOfShort,
    channelSubscribeOrUnSubscribe,
    addCommentToShort,
    shortCommentsData,
    getCommentsShorts,
    shortComments,
    replyToCommentsShorts,
    deleteCommentShorts,
    deleteReplyCommentShorts,
    editShortComment,
    editShortReplyComment,
    viewed,
    reportReplyCommentShort,
    reportCommentShort,
    reportShort,
    getBatchPlan,
    batchPlanData,
    addValidity,
  };

  return (
    <CoursesData.Provider value={contextData}>{children}</CoursesData.Provider>
  );
};
