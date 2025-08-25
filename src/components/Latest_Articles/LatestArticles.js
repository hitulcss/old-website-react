import React, { useContext, useEffect } from "react";
import "./LatestArticles.css";
import { RiMenu3Fill } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa6";
import { CoursesData } from "../../context/courses/Courses";
import { useNavigate } from "react-router-dom";

const LatestArticles = () => {
  const navigate = useNavigate();
  // const latest_articles = [
  //   {
  //     id: 0,
  //     name: "Prelims Test series 2022",
  //   },
  //   {
  //     id: 1,
  //     name: "Distance Learning Program",
  //   },
  //   {
  //     id: 2,
  //     name: "Prepare For State PCS",
  //   },
  //   {
  //     id: 3,
  //     name: "Practice Quiz",
  //   },
  //   {
  //     id: 4,
  //     name: "Mains Answer Writing PracticePrelims Test series 2022",
  //   },
  //   {
  //     id: 5,
  //     name: "Mains Answer Writing Practice",
  //   },
  //   {
  //     id: 6,
  //     name: "Daily Current Affairs and Editorials",
  //   },
  // ];

  const { getLatestBlogs, latestBlogs } = useContext(CoursesData);
  // useEffect(() => {
  //   getLatestBlogs();
  // }, [])

  return (
    <>
      <div className="article_compo" data-aos="fade-left">
        <div className="article_compo_box">
          <div className="article_compo_upper">
            <h3>LATEST ARTICLE</h3>
            <RiMenu3Fill />
          </div>

          <div className="article_compo_lower">
            {latestBlogs?.blogs?.map((item, index) => (
              <React.Fragment key={item.id}>
                <div className="article_down_box" onClick={() => navigate(`/exams/${item?.category?.slug}/${item?.slug}`, {
                  state: {
                    id: item?.id
                  }
                })}>
                  <p>{item.title}</p>
                  <FaAngleRight style={{ cursor: "pointer" }} />
                </div>
                {index < latestBlogs.blogs.length - 1 && (
                  <p
                    key={`separator-${index}`}
                    style={{
                      border: "1px solid #DFDFDF",
                      marginTop: "5px",
                    }}
                  ></p>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestArticles;
