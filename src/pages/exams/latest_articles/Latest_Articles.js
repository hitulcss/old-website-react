import React from "react";
import "./Latest_Articles.css";
import Wrapper from "../../../components/Wrapper/Wrapper";
import { MdOutlineDateRange } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { HeadProvider, Title, Link, Meta } from "react-head";

const Latest_Articles = ({ blog }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="article_wrapper">
        <HeadProvider>
          <Link rel="icon" href="https://www.sdcampus.com/favicon.ico" />
          <Meta name="viewport" content="width=device-width,initial-scale=1" />
          <Link
            rel="apple-touch-icon"
            href="https://www.sdcampus.com/logo.png"
          />
          <Link
            rel="manifest"
            href="https://www.sdcampus.com/site.webmanifest"
          />
          <Title>
            SD Campus Exams: Get All the Government Exam Notifications at One
            Click
          </Title>
          <Meta
            name="description"
            content="If you’re preparing for school entrance examinations like JNV and Sainik School or you are preparing for government exams SSC, Defence, Teaching, Police, etc then follow SD Campus to get free content, mock tests, and live lectures. Follow SD Campus Exams to get all the exam notifications and get ahead of everyone."
          />
          <Meta
            name="keywords"
            content="Exams, Government Exam Notification, Government Jobs, School Entrance Exams"
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
            content="SD Campus Exams: Get All the Government Exam Notifications at One Click"
          />
          <Meta
            property="og:description"
            content="If you’re preparing for school entrance examinations like JNV and Sainik School or you are preparing for government exams SSC, Defence, Teaching, Police, etc then follow SD Campus to get free content, mock tests, and live lectures. Follow SD Campus Exams to get all the exam notifications and get ahead of everyone."
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
            content="SD Campus Exams: Get All the Government Exam Notifications at One Click"
          />
          <Meta
            name="twitter:description"
            content="If you’re preparing for school entrance examinations like JNV and Sainik School or you are preparing for government exams SSC, Defence, Teaching, Police, etc then follow SD Campus to get free content, mock tests, and live lectures. Follow SD Campus Exams to get all the exam notifications and get ahead of everyone."
          />
          <Meta
            name=" twitter:image"
            content="https://static.sdcampus.com/assets/app_download_1732957227.png"
          />
        </HeadProvider>

        <Wrapper>
          <h1 className="article_title">Latest Articles</h1>
          <div className="article_container">
            {/* {latest_articles.map((item, index) => ( */}
            {blog?.blogs?.map((item, index) => (
              <div className="article_box" data-aos="fade-right" key={index}>
                <img
                  src={item?.featuredImage}
                  alt="article_img"
                  loading="lazy"
                />
                <h2>{item.title?.rendered}</h2>
                <h2>{item.title}</h2>
                <div className="article_lower">
                  <div className="box_lower_left">
                    {/* <div className="box_left_upper">{item.catergory}</div> */}
                    <div className="box_left_lower">
                      <MdOutlineDateRange
                        size={18}
                        style={{ color: "var(--textGray)" }}
                      />
                      {/* {item.date} */}
                      {item.createdAt}
                    </div>
                  </div>

                  <button
                    className="article_readmore_btn"
                    onClick={() => {
                      navigate(`/exams/${item?.category?.slug}/${item?.slug}`, {
                        state: {
                          id: item?.id,
                        },
                      });
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Wrapper>
        {/* <div className="pagination">
          <Stack spacing={2}>
            <Pagination count={10} variant="outlined" color="secondary" />
          </Stack>
        </div> */}
      </div>
    </>
  );
};

export default Latest_Articles;
