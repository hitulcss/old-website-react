import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import ExamPrepration from "../components/ExamPrepration/ExamPrepration";
import CourseOffering from "../components/CourseOffering/CourseOffering";
import Wrapper from "../../../components/Wrapper/Wrapper";
import TopEducators from "../../home/topEducators/TopEducators";
import Batches from "../components/Batches/Batches";
import Testimonials from "../components/Testimonials/Testimonials";
import NewAccordian from "../../../components/Accordian/NewAccordian";
import Footer from "../components/Footer/Footer";
import examPrepare from "../../../assets/campaign-2/ugc.png";
import img1 from "../../../assets/campaign-2/1.png";
import img2 from "../../../assets/campaign-2/2.png";
import img3 from "../../../assets/campaign-2/3.png";
import img4 from "../../../assets/campaign-2/4.png";
import teachersUGC from "../../../assets/campaign-2/UGC-Net-Teacher.png";
import { HeadProvider, Title, Link, Meta } from "react-head";

const examPrep = {
  title: "UGC NET Exam Preparation",
  descrip:
    "Do you aspire to become a university lecturer or start enjoying the benefits of a fellowship? The UGC NET which stands for University Grants Commission National Eligibility Test can open these doors for you. Welcome to SD Campus, here we acknowledge your struggles and we are here to help you through this process. Now, neither are you studying from average teachers nor flipping through ordinary books, and with a track record like ours, your UGC NET is well within reach.",
  img: examPrepare,
};

const headerCont = {
  simpleText1: " UGC NET Success is Just",
  colorText: "One Step Away ",
  img1: img1,
  img2: img2,
  img3: img3,
  img4: img4,
  text1: "In-Depth Syllabus Coverage",
  text2: "Expert-Led Classes",
  text3: "Latest Exam Pattern Focus",
  text4: "Test Performance Analysis",
  category: "UGC-NET",
};

const testiDetails = [
  {
    comment:
      "I was struggling with Paper 1, but SD Campus's detailed and easy-to-understand classes made all the difference. The regular quizzes and mock tests gave me the confidence I needed. I highly recommend SD Campus to all UGC NET aspirants!",
    username: "Varun Mehta",
  },
  {
    comment:
      "The flexibility of learning at SD Campus suited my busy schedule perfectly. The recorded lectures were a lifesaver, and the comprehensive study material covered every aspect of the syllabus. I'm grateful to SD Campus for helping me achieve my dream!",
    username: "Sameeksha Singh",
  },
  {
    comment:
      "The expert faculty at SD Campus not only taught the concepts but also motivated me throughout my preparation. The personalized feedback after each mock test was incredibly beneficial. Clearing the UGC NET exam wouldn't have been possible without SD Campus!      ",
    username: "Satish Nair",
  },
  {
    comment:
      "SD Campus gave me the confidence and knowledge I needed to crack the UGC NET exam. The study material was top-notch, and the support from the faculty was exceptional. I owe my success to SD Campus!",
    username: "Neha Verma",
  },
];

const topNav = { title: "For UGC NET Examination" };

const img = { img: teachersUGC };

const UGC_Net = () => {
  return (
    <>
      <div>
        {/* <TopNav /> */}
        <HeadProvider>
          <Link rel="icon" href="https://www.sdcampus.com/favicon.ico" />
          <Meta name="viewport" content="width=device-width,initial-scale=1" />
          <Link
            rel="apple-touch-icon"
            href="https://www.sdcampus.com/logo.png"
          />
          <Link rel="manifest" href="./site.webmanifest" />
          <Title>Best UGC NET Exam Coaching at Affordable Price</Title>
          <Meta
            name="description"
            content="Study Material for UGC NET Exam, Affordable Online Shopping, Coffee Mug, Water Bottle, Study Table, Laptop Table, and more"
          />
          <Meta
            name="keywords"
            content="SD, ugcnet SD Campus, sdcampus, sd campus website, student's dream campus"
          />
          <Meta
            name="robots"
            content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
          />
          <Link rel="canonical" href={window.location.href} />
          <Meta property="og:locale" content="en_US" />
          <Meta property="og:site_name" content="SD Campus" />
          <Meta property="og:type" content="website" />
          <Meta
            property="og:title" content="SD Campus:Best UGC NET Exam Coaching at Affordable Price" />
          <Meta property="og:description"
            content="Study Material for UGC NET Exam, Affordable Online Shopping, Coffee Mug, Water Bottle, Study Table, Laptop Table, and more"
          />
          <Meta
            property="og:image"
            content="https://static.sdcampus.com/assets/app_download_1732957227.png"
          />
          <Meta property="og:image:width" content="560" />
          <Meta property="og:image:height" content="292" />
          <Meta property="og:url" content={window.location.href} />
          <Meta name="twitter:card" content="summary_large_image" />
          <Meta
            name="twitter:title"
            content="SD Campus:Best UGC NET Exam Coaching at Affordable Price"
          />
          <Meta
            name="twitter:description"
            content="Study Material for UGC NET Exam, Affordable Online Shopping, Coffee Mug, Water Bottle, Study Table, Laptop Table, and more"
          />
          <Meta
            name="twitter:image"
            content="https://static.sdcampus.com/assets/app_download_1732957227.png"
          />
        </HeadProvider>
        <Navbar />
        <Header data={headerCont} img={img} />
        <CourseOffering />
        <ExamPrepration data={examPrep} />

        <div style={{ background: "var(--campPrimary)", marginBottom: "2rem" }}>
          <Wrapper>
            <TopEducators from="campaign2" />
          </Wrapper>
        </div>
        <Batches slug='ugc-net-exams' />
        <Testimonials data={testiDetails} />
        <div>
          <Wrapper>
            <NewAccordian title="UGC" />
          </Wrapper>{" "}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UGC_Net;
