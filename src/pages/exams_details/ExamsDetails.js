import React, { useContext, useEffect } from "react";
import "./ExamsDetails.css";
// import NavBar from "../exams/navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import Wrapper from "../../components/Wrapper/Wrapper";
import { useNavigate, useParams } from "react-router-dom";
import { CoursesData } from "../../context/courses/Courses";
import LatestArticles from "../../components/Latest_Articles/LatestArticles";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";
import Navbar from "../../components/Navbar/Navbar";
import { HeadProvider, Title, Link, Meta } from "react-head";
import Loader from "../../components/Loader/Loader";
const ExamsDetails = () => {
  const { getBlogById, blogById, getLatestBlogs, latestBlogs, loading } =
    useContext(CoursesData);
  // console.log(location)
  const { slug } = useParams();
  useEffect(() => {
    getBlogById(slug);
    getLatestBlogs();
  }, [slug]);
  const navigate = useNavigate();
  // console.log(blogById);
  let sanitizedHTML = DOMPurify.sanitize(blogById?.desc);
  sanitizedHTML = sanitizedHTML.replace(/<h3>\s*&nbsp;\s*<\/h3>/gi, "");
  sanitizedHTML = sanitizedHTML.replace(/<h4>\s*&nbsp;\s*<\/h4>/gi, "");
  sanitizedHTML = sanitizedHTML.replace(/<p>\s*&nbsp;\s*<\/p>/gi, "");
  sanitizedHTML = sanitizedHTML.replace(/<h2>\s*<br>\s*<\/h2>/gi, "");
  sanitizedHTML = sanitizedHTML.replace(/<p>\s*<br>\s*<\/p>/gi, "");

  return (
    <>
      <Navbar />
      {/* <Helmet>

      </Helmet> */}
      <HeadProvider>
        <Link rel="icon" href="https://www.sdcampus.com/favicon.ico" />
        <Meta name="viewport" content="width=device-width,initial-scale=1" />
        <Link rel="apple-touch-icon" href="https://www.sdcampus.com/logo.png" />
        <Link rel="manifest" href="https://www.sdcampus.com/site.webmanifest" />
        <Title>{blogById?.title}</Title>
        <Meta name="description" content={blogById?.excerptTitle} />
        <Meta name="keywords" content={blogById?.excerptTitle} />
        <Meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <Link rel="canonical" href={window.location.href} />
        <Meta property="og:locale" content="en_US" />
        <Meta property="og:site_name" content="SD Campus" />
        <Meta property="og:type" content="website" />
        <Meta property="og:title" content={blogById?.title} />
        <Meta property="og:description" content={blogById?.excerptTitle} />
        <Meta property="og:image" content={blogById?.featuredImage} />
        <Meta property="og:image:width" content="560" />
        <Meta property="og:image:height" content="292" />
        <Meta property="og:url" content={window.location.href} />
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="twitter:title" content={blogById?.title} />
        <Meta name="twitter:description" content={blogById?.excerptTitle} />
        <Meta name=" twitter:image" content={blogById?.featuredImage} />
      </HeadProvider>

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: blogById?.title,
            description: blogById?.excerptTitle,
            datePublished: blogById?.createdAt,
            author: {
              "@type": "Person",
              name: "SD Campus Admin",
            },
            publisher: {
              "@type": "Organization",
              name: "SD Campus",
              logo: {
                "@type": "ImageObject",
                url: blogById?.featuredImage,
              },
            },
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Organization",
            name: blogById?.title,
            url: window.location.href,
            logo: "https://www.sdcampus.com/logo.png",
            image: blogById?.featuredImage,
            email: "info@sdempire.co.in",
            description: blogById?.excerptTitle,
            address: {
              "@type": "PostalAddress",
              postalCode: "201005",
              streetAddress: "Plot No-16, Block 7, Sector 5, Rajendra Nagar",
              addressCountry: "India",
              addressRegion: "Uttar Pradesh",
              addressLocality: "Ghaziabad",
            },
            telephone: "7428394519",
            sameAs: [
              "Facebook: https://www.facebook.com/sdcampus1",
              "Instagram: https://www.instagram.com/sd_campus/",
              "Youtube: https://www.youtube.com/@teachingexamssdcampus",
              "Linkedin: https://www.linkedin.com/company/sd-campus/",
              "Twitter: https://twitter.com/SdCampus?t=954CVu6lwAprPboG5ca6dw&s=09",
            ],
          })}
        </script>
      </Helmet>

      {loading ? (
        <div
          style={{
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <Loader />
        </div>
      ) : (
        <div className="exam_details_wrapper">
          <Wrapper>
            <p style={{ fontWeight: "500", cursor: "pointer" }}>
              <span
                onClick={() => {
                  navigate("/");
                }}
              >
                Home {">"}{" "}
              </span>
              <span
                className="primary_color"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/exams");
                }}
              >
                Exams{">"}{" "}
              </span>
              <span className="primary_color" style={{ cursor: "pointer" }}>
                {blogById?.title}
              </span>
            </p>
            <div className="exam_details_container">
              <div className="exam_details_header">
                <div className="exam_details_left">
                  <h1>{blogById?.title}</h1>
                  <img
                    src={blogById?.featuredImage}
                    alt="examdetailimg"
                    loading="lazy"
                  />
                  <div className="exam-details-content">
                    <div style={{ color: "gray" }}>
                      {" "}
                      {blogById?.excerptTitle}
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
                      className="html-text"
                    ></div>
                  </div>
                </div>
                <div className="exam_details_right">
                  <LatestArticles blogs={latestBlogs} />
                </div>
              </div>
            </div>
          </Wrapper>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ExamsDetails;
