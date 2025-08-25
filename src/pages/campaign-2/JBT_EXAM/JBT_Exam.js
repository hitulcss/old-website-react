import React from "react";
import Navbar from "../components/Navbar/Navbar";
import ExamPrepration from "../components/ExamPrepration/ExamPrepration";
import CourseOffering from "../components/CourseOffering/CourseOffering";
import Wrapper from "../../../components/Wrapper/Wrapper";
import TopEducators from "../../home/topEducators/TopEducators";
import Batches from "../components/Batches/Batches";
import Testimonials from "../components/Testimonials/Testimonials";
import NewAccordian from "../../../components/Accordian/NewAccordian";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import examPrepare from "../../../assets/campaign-2/jbt.png";
import img1 from "../../../assets/campaign-2/5.png";
import img2 from "../../../assets/campaign-2/6.png";
import img3 from "../../../assets/campaign-2/7.png";
import { useParams } from "react-router-dom";
import teachersJBT from "../../../assets/campaign-2/group.png";
import { HeadProvider, Title, Link, Meta } from "react-head";

const examPrep = {
  title: "BPSC Examination Preparation",
  descrip:
    "At SD Campus, we respect your desire to achieve your goal of passing the BPSC (Bihar Public Service Commission) exams such as BPSC TRT 4.0 or BPSC 4.0 exams. We offer elaborate and systematically planned courses that help you to prepare for BPSC and ensure your selection in Bihar civil services. If this is your first time or if you merely want to level up your preparation, SD Campus is always by your side.",
  img: examPrepare,
};

const headerCont = {
  simpleText1: "Your Path to a",
  simpleText2: "starts here",
  colorText: "teaching carrier",
  img1: img1,
  img2: img3,
  img3: img2,
  text1: "Regular Doubt Solving Sessions",
  text2: "Personalized Attention",
  text3: "Free Study Material",
  category: "JBT",
};

const testiDetails = [
  {
    comment:
      "The flexibility of online classes at SD Campus allowed me to prepare at my own pace. The detailed study material and doubt-clearing sessions were incredibly helpful. I'm grateful for the support and guidance I received here!",
    username: "Sneha Mehta",
  },
  {
    comment:
      "I had a great experience with SD Campus. The study material was comprehensive, and the regular assessments kept me on track. Clearing the Haryana JBT exam was a dream come true, thanks to SD Campus!",
    username: "SDivya Yadav",
  },
  {
    comment:
      "SD Campus provided me with the perfect blend of quality education and motivation. The personalized feedback after each mock test was invaluable. I owe my success to the dedicated team at SD Campus! ",
    username: "Nitin Sharma",
  },
  {
    comment:
      "SD Campus was a game-changer for me. The faculty was supportive, and the study material was perfectly aligned with the exam pattern. Thanks to SD Campus, I cleared the Haryana JBT exam on my first attempt!",
    username: "Anjali Kumari",
  },
];

const topNav = { title: "For jbt Examination" };

const img = { img: teachersJBT };

const JBT_Exam = () => {
  const { slug } = useParams();
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
          <Title>Best Haryana JBT Coaching| SD Campus</Title>
          <Meta
            name="description"
            content="Haryana JBT Exam Coaching at SD Campus, Best Haryana JBT Exam Coaching with all the study material, online classes, stationery material and more."
          />
          <Meta
            name="keywords"
            content="SD, SD Campus, sdcampus, sd campus website, student's dream campus"
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
            property="og:title"
            content="Best Haryana JBT Coaching| SD Campus"
          />
          <Meta
            property="og:description"
            content="Haryana JBT Exam Coaching at SD Campus, Best Haryana JBT Exam Coaching with all the study material, online classes, stationery material and more."
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
            content="SD Campus:Best Haryana JBT Coaching| SD Campus"
          />
          <Meta
            name="twitter:description"
            content="Haryana JBT Exam Coaching at SD Campus, Best Haryana JBT Exam Coaching with all the study material, online classes, stationery material and more."
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
        <Batches slug='tet-online-coaching' subCategorySlug="chandigarh-jbt" />
        <Testimonials data={testiDetails} />
        <div>
          <Wrapper>
            <NewAccordian title="JBT" />
          </Wrapper>{" "}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default JBT_Exam;
