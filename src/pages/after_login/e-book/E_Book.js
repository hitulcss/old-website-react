import React, { useContext, useEffect, useState } from "react";
import "./E_Book.css";
import NavBar from "../NavBar/NavBar";
import { CoursesData } from "../../../context/courses/Courses";
import SideBar from "../../../components/Sidebar/SideBar";
import E_book_tabs from "./book_tabs/E_Book_tabs";

const E_Book = () => {
  const [loader, setLoader] = useState(true);

  //context
  const {
    isSidebarExpanded,
    ebooks,
    setEbooks,
    getEbooks,
    getMyEbooks,
    myEbook,
  } = useContext(CoursesData);

  const [filter, setFilter] = useState({
    // language: 'en',
    // text: 'first E book',
    // priceMin: 100, priceMax: 111
  });
  useEffect(() => {
    setEbooks(null);
    getEbooks({ page: 1, size: 25, ...filter });
  }, [filter]);
  useEffect(() => {
    getMyEbooks();
  }, []);

  return (
    <>
      <NavBar from="after-login" width={isSidebarExpanded ? 250 : 93} />

      <div>
        <SideBar />
        <div
          className={
            isSidebarExpanded
              ? "after-login-mid open-sidebar"
              : "after-login-mid closed-sidebar"
          }
          style={{ marginLeft: isSidebarExpanded ? "250px" : "100px" }}
        >
          {" "}
          <div className="ebook_wrapper">
            <div className="ebook_container">
              <E_book_tabs
                ebooks={ebooks}
                myEbook={myEbook}
                setFilter={setFilter}
                filter={filter}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default E_Book;
