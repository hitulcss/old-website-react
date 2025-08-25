import React from "react";
import "./My_eBooks.css";
import E_Book_Box from "../../../../../components/E_Book_Box/E_Book_Box";

const My_eBooks = ({ ebooks }) => {
  return (
    <>
      <div className="my_ebook_wrapper">
        <div className="my_ebook_container">
          <E_Book_Box from="myebook" ebooks={ebooks} />

          {/* <Empty_Ebook /> */}
        </div>
      </div>
    </>
  );
};

export default My_eBooks;
