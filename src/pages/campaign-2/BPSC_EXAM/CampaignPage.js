import React from "react";
import "./CampaignPage.css";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import TopEducators from "../../home/topEducators/TopEducators";
import Wrapper from "../../../components/Wrapper/Wrapper";
import ExamPrepration from "../components/ExamPrepration/ExamPrepration";
import CourseOffering from "../components/CourseOffering/CourseOffering";
import Footer from "../components/Footer/Footer";
import NewAccordian from "../../../components/Accordian/NewAccordian";
import Batches from "../components/Batches/Batches";
import Testimonials from "../components/Testimonials/Testimonials";
import examPrepare from "../../../assets/campaign-2/examprepare.jpg";
import img1 from "../../../assets/campaign-2/1.png";
import img2 from "../../../assets/campaign-2/2.png";
import img3 from "../../../assets/campaign-2/3.png";
import img4 from "../../../assets/campaign-2/4.png";
import teachersBPSC from "../../../assets/campaign-2/BPSC-Teachers.png";
import { HeadProvider, Title, Link, Meta } from "react-head";

const examPrep = {
  title: "BPSC Examination Preparation",
  descrip:
    "At SD Campus, we respect your desire to achieve your goal of passing the BPSC (Bihar Public Service Commission) exams such as BPSC TRT 4.0 or BPSC 4.0 exams. We offer elaborate and systematically planned courses that help you to prepare for BPSC and ensure your selection in Bihar civil services. If this is your first time or if you merely want to level up your preparation, SD Campus is always by your side.",
  img: examPrepare,
};

const headerCont = {
  simpleText1: "Step into",
  simpleText2: "with SD Campus by Your Side!",
  colorText: "Bihar Civil Services ",
  img1: img1,
  img2: img2,
  img3: img3,
  img4: img4,
  text1: "In-Depth Syllabus Coverage",
  text2: "Expert-Led Classes",
  text3: "Latest Exam Pattern Focus",
  text4: "Test Performance Analysis",
  category: "BPSC",
};

const topNav = { title: "For BPSC Examination" };

const testiDetails = [
  {
    comment:
      "SD Campus transformed my approach to the BPSC exam. The faculty's  guidance, comprehensive study material, and regular mock tests were pivotal in my success. The personalized study plan kept me motivated and focused throughout my preparation. I couldn't have asked for a better learning experience!",
    username: "Ravi Sharma",
  },
  {
    comment:
      "Joining the BPSC TRE 4.0 program at SD Campus was the best decision I made. The focused curriculum and targeted practice sessions gave me the confidence I needed to ace the exam. The detailed feedback from mock exams helped me fine-tune my preparation, and the doubt-clearing sessions ensured I was never left behind. SD Campus made my dream of becoming a teacher come true!",
    username: "Vipin Gupta",
  },
  {
    comment:
      "What sets SD Campus apart is the student-centric approach. The faculty genuinely cares about your success, and the community support is amazing. The flexible learning options allowed me to balance my studies with other commitments, and the test series gave me a real sense of the exam environment. I highly recommend SD Campus to all BPSC aspirants.",
    username: "Priya Srivastava",
  },
  {
    comment:
      "I'm currently enrolled in the BPSC 4.0 Batch, and I can already see a significant improvement in my preparation. The in-depth coverage of the syllabus, expert-led classes, and regular performance analysis keep me on track. The support from faculty and fellow students is incredible. I'm confident that with SD Campus, I'll achieve my goal of cracking the BPSC exam.",
    username: "Ankit Sharma",
  },
];

const img = { img: teachersBPSC };

const CampaignPage = () => {
  // console.log()
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
          <Title>BPSC Exam Coaching at SD Campus</Title>
          <Meta
            name="description"
            content="Crack BPSC exam with India's best coaching institute. SD Campus is one of the best coaching institute for BPSC TRE Exam."
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
            content="SD Campus:BPSC Exam Coaching at SD Campus"
          />
          <Meta
            property="og:description"
            content="Crack BPSC exam with India's best coaching institute. SD Campus is one of the best coaching institute for BPSC TRE Exam."
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
            content="SD Campus:BPSC Exam Coaching at SD Campus"
          />
          <Meta
            name="twitter:description"
            content="Crack BPSC exam with India's best coaching institute. SD Campus is one of the best coaching institute for BPSC TRE Exam."
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

        <div className="top-educators-wrapper-c2">
          <Wrapper>
            <TopEducators from="campaign2" />
          </Wrapper>
        </div>
        <Batches slug="tet-online-coaching" subCategorySlug="bihar-shikshak-bharti" />
        <Testimonials data={testiDetails} />
        <div>
          <Wrapper>
            <NewAccordian title="BPSC" />
          </Wrapper>{" "}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CampaignPage;
