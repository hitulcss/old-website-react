import React, { useContext, useEffect } from "react";
import "./Ebook_Page.css";
import Navbar from "./Navbar/Navbar";
import Wrapper from "../../../components/Wrapper/Wrapper";
import Header from "./header/Header";
import Footer from "../../../components/Footer/Footer";
import { NavLink } from "react-router-dom";
import E_Book_Box from "../../../components/E_Book_Box/E_Book_Box";
import { CoursesData } from "../../../context/courses/Courses";

const Ebook_Page = () => {
  const filters = [
    "All",
    "UGC NET",
    "Govt Entrance ",
    "School Entrance ",
    "Police Exams",
    "Civil Services",
    "SSC",
    "Compeptitve Exams ",
    "Railway",
  ];

  //context
  const { getEbooks, ebooks } = useContext(CoursesData)

  // api calls
  useEffect(() => {
    getEbooks({ page: 1, size: 25 })

  }, [])

  return (
    <>
      <Navbar />
      <div className="eboook-page-wrapper">
        {" "}
        <div className="ebook-page-container">
          <div className="ebbok-page-header">
            {" "}
            <Header />
          </div>
          <Wrapper>

            <div className="ebook-page-filter-container">
              <div className="ebook-page-filter">
                {filters.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>

            <div className="category-ebook-container">
              {" "}
              <div className="popular-ebooks-container">
                <div className="category-header">
                  <h1>Popular E-Books</h1>

                  <NavLink to="/view-all-ebooks">
                    <p>View All</p>
                  </NavLink>
                </div>
                <E_Book_Box ebooks={ebooks} />
              </div>
              <div className="high-demanding-ebook-container">
                <div className="category-header">
                  <h1>High Demanding E-Books</h1>
                  <NavLink to="/view-all-ebooks">
                    <p>View All</p>
                  </NavLink>
                </div>
                <E_Book_Box ebooks={ebooks} />
              </div>
              <div className="popular-ebooks-container">
                <div className="category-header">
                  <h1>Popular E-Books</h1>
                  <NavLink to="/view-all-ebooks">
                    <p>View All</p>
                  </NavLink>
                </div>
                <E_Book_Box ebooks={ebooks} />
              </div>
              <div className="high-demanding-ebook-container">
                <div className="category-header">
                  <h1>High Demanding E-Books</h1>
                  <NavLink to="/view-all-ebooks">
                    <p>View All</p>
                  </NavLink>
                </div>
                <E_Book_Box ebooks={ebooks} />
              </div>
            </div>
          </Wrapper>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Ebook_Page;
