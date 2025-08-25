import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter, BrowserRouter } from "react-router-dom";
import { CoursesDataContext } from "./context/courses/Courses";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import CacheBuster from "react-cache-buster";
import packageInfo from "../package.json";
import { HelmetProvider } from "react-helmet-async";

import { HeadProvider, Title, Link, Meta } from "react-head";
import "react-lazy-load-image-component/src/effects/blur.css";
import TagManager from "react-gtm-module";


const tagManagerArgs = {
  gtmId: process.env.GTM_ID,
};
TagManager.initialize(tagManagerArgs);

const root = ReactDOM.createRoot(document.getElementById("root"));
<HeadProvider>
  <Link rel="icon" href="https://www.sdcampus.com/favicon.ico" />
  <Meta name="viewport" content="width=device-width,initial-scale=1" />
  <Link rel="apple-touch-icon" href="https://www.sdcampus.com/logo.png" />
  <Link rel="manifest" href="./site.webmanifest" />
  <Title>
    SD Campus: India’s Most Affordable Ed-tech Platform for School and
    Government Entrance Examinations
  </Title>
  <Meta
    name="description"
    content="SD Campus is India’s premier online learning platform. Trusted by thousands of students, SD Campus provides quality learning programs for school students for JNV and Sainik School admission tests. Apart from that we also provide Online Coaching for various government competitive exams including SSC, Defence, Teaching, Railway, Police, etc."
  />
  <Meta name="robots" content="max-image-preview:large" />
  <Link rel="canonical" href={window.location.href} />
  <Meta property="og:locale" content="en_US" />
  <Meta property="og:site_name" content="SD Campus" />
  <Meta property="og:type" content="website" />
  <Meta
    property="og:title"
    content="SD Campus:India’s Most Affordable Ed-tech Platform for School and Government Entrance
    Examinations"
  />
  <Meta
    property="og:description"
    content="SD Campus is India’s premier online learning platform. Trusted by thousands of students, SD Campus provides quality learning programs for school students for JNV and Sainik School admission tests. Apart from that we also provide Online Coaching for various government competitive exams including SSC, Defence, Teaching, Railway, Police, etc."
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
    content="SD Campus:India’s Most Affordable Ed-tech Platform for School and Government
    Entrance Examinations"
  />
  <Meta
    name="twitter:description"
    content="SD Campus is India’s premier online learning platform. Trusted by thousands of students, SD Campus provides quality learning programs for school students for JNV and Sainik School admission tests. Apart from that we also provide Online Coaching for various government competitive exams including SSC, Defence, Teaching, Railway, Police, etc."
  />
  <Meta
    name="twitter:image"
    content="https://static.sdcampus.com/assets/app_download_1732957227.png"
  />
</HeadProvider>;
const headTags = [];
root.render(
  // <React.StrictMode>

  <BrowserRouter>
    <CoursesDataContext>
      <ScrollToTop />
      <CacheBuster
        currentVersion={packageInfo.version}
        isEnabled={true} //If false, the library is disabled.
        isVerboseMode={true} //If true, the library writes verbose logs to console.
        metaFileDirectory={"."} //If public assets are hosted somewhere other than root on your server.
      >
        <HelmetProvider>
          <HeadProvider headTags={headTags}>
            <App />
          </HeadProvider>
        </HelmetProvider>
      </CacheBuster>
    </CoursesDataContext>
  </BrowserRouter>

  // </React.StrictMode>
);
