import React, { useContext, useState } from "react";
import "./SearchPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Wrapper from "../../components/Wrapper/Wrapper";
// import CourseExamBox from "../../components/Course_Exam_Box/Course_Exam_Box";
import Course_Exam_Box from "../../components/Course_Exam_Box/Course_Exam_Box";
import { CoursesData } from "../../context/courses/Courses";
import { useParams } from "react-router-dom";
import NotFound from "../../components/NotFound/NotFound";
const SearchPage = () => {
  const { searchResult } = useContext(CoursesData);
  const [sortBy, setSortBy] = useState("");

  // console.log("SEARCH RESUKT", searchResult);
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const style1 = {
    width: "100%",
    marginTop: "3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "2rem",
  };

  const { searchtext } = useParams();
  return (
    <>
      <Navbar />
      <div className="search_wrapper">
        <Wrapper>
          <div className="search_page_container">
            <div className="search_page_upper">
              <h3>
                Showing {searchResult?.data?.length} results for
                <span style={{ fontWeight: "Bold" }}> {`"${searchtext}"`}</span>
              </h3>
              {/* <div>
                <div className="search_sort">
                  <label htmlFor="sort">Sort By : </label>
                  <select id="sort" value={sortBy} onChange={handleSortChange}>
                    <option value="">Select</option>
                    <option value="relevance">Relevance</option>
                    <option value="popularity">Popularity</option>
                    <option value="hightolow">Price High To Low</option>
                    <option value="lowtohigh">Price Low To High</option>
                  </select>
                </div>
              </div> */}
            </div>
            {searchResult?.data && searchResult?.data?.length > 0 ? <div className="search_page_lower">
              <Course_Exam_Box courses={searchResult?.data} from="search" />
              {/* <CourseExamBox courses={searchResult?.data} from="search" /> */}
            </div> : <NotFound title={"batch"} />}

          </div>
        </Wrapper>
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
