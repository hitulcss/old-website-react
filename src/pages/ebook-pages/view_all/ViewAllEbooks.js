import React, { useContext, useEffect } from "react";
import "./ViewAllEbooks.css";
import Navbar from "../home_page/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import Header from "../home_page/header/Header";
import E_Book_Box from "../../../components/E_Book_Box/E_Book_Box";
import { CoursesData } from "../../../context/courses/Courses";
import Wrapper from "../../../components/Wrapper/Wrapper";

const ViewAllEbooks = () => {
  const { ebooks, getEbooks } = useContext(CoursesData);

  useEffect(() => {
    getEbooks({ page: 1, size: 25 });
  }, []);
  return (
    <>
      <Navbar />
      <div className="view-all-wrapper">
        <div className="view-all-container">
          <div>
            <Header />
          </div>
          <Wrapper>
            <div className="view-all-ebooks">
              <h1 className="view-all-ebook-title">Popluar Ebooks</h1>

              <div>
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

export default ViewAllEbooks;
