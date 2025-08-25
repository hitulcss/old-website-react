import React, { useEffect, useRef, useState } from "react";
import E_Book_Box from "../../../../../components/E_Book_Box/E_Book_Box";
import "./All_ebooks.css";
import { MdTune } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuMinus, LuPlus } from "react-icons/lu";

const All_eBooks = ({ ebooks, setFilter, filter }) => {
  const tagsArray = ["PGT", "TGT", "DSSSB", "CTET", "UPTET"];

  const [isOpen, setIsOpen] = useState(false);

  const [show, setShow] = useState({
    tags: false,
    price: false,
    language: false,
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const modalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="all_ebook_wrapper">
        <div className="all_ebook_container">
          <div className="all_ebook_upper" data-aos="fade-left">
            <>
              <div className="filter-container">
                {" "}
                <p className="ebook-filter" onClick={toggleDropdown}>
                  <MdTune />
                  Filters
                  <IoMdArrowDropdown />
                </p>{" "}
                <div className="phone_filter">
                  {isOpen && (
                    <div className="booklist_filter_box" ref={modalRef}>
                      <h3>Filters</h3>

                      <p style={{ border: "1px solid #dfdfdf" }}></p>
                      <div
                        onClick={() => {
                          setShow((prev) => ({
                            ...prev,
                            tags: !show?.tags,
                          }));
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {" "}
                        <p className="cat_title">Tags</p>{" "}
                        {show?.tags ? <LuMinus /> : <LuPlus />}
                      </div>
                      <p style={{ border: "1px solid #dfdfdf" }}></p>
                      {show?.tags && (
                        <>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setFilter((prev) => ({
                                ...prev,
                                text: null,
                              }));
                            }}
                          >
                            <label for="all">All</label>
                            <input
                              id={"all"}
                              name="tags"
                              type="radio"
                            // defaultChecked={true}
                            />
                          </div>
                          {tagsArray?.map((item, index) => {
                            return (
                              <div
                                key={index}
                                onClick={() => {
                                  setFilter((prev) => ({
                                    ...prev,
                                    text: item,
                                  }));
                                }}
                              >
                                <label for={`tags-${index}`}>{item}</label>

                                <input
                                  id={`tags-${index}`}
                                  name="tags"
                                  type="radio"
                                />
                              </div>
                            );
                          })}
                        </>
                      )}
                      <p style={{ border: "1px solid #dfdfdf" }}></p>
                      <div
                        onClick={() => {
                          setShow((prev) => ({
                            ...prev,
                            price: !show?.price,
                          }));
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <p className="cat_title"> Price</p>
                        {show?.price ? <LuMinus /> : <LuPlus />}
                      </div>
                      <p style={{ border: "1px solid #dfdfdf" }}></p>
                      {show?.price && (
                        <>
                          <div
                            onClick={() => {
                              setFilter((prev) => ({
                                ...prev,

                                priceMin: 0,
                                priceMax: 999,
                              }));
                            }}
                          >
                            <label for="0-999">0-999</label>
                            <input id="0-999" type="radio" name="price" />
                          </div>
                          <div
                            onClick={() => {
                              setFilter((prev) => ({
                                ...prev,

                                priceMin: 999,
                                priceMax: 1999,
                              }));
                            }}
                          >
                            <label for="999-1999">999-1999</label>
                            <input id="999-1999" type="radio" name="price" />
                          </div>
                          <div
                            onClick={() => {
                              setFilter((prev) => ({
                                ...prev,

                                priceMin: 1999,
                                priceMax: 999999,
                              }));
                            }}
                          >
                            <label for="1999+">1999+</label>
                            <input id="1999+" type="radio" name="price" />
                          </div>
                        </>
                      )}
                      <p style={{ border: "1px solid #dfdfdf" }}></p>
                      <div
                        onClick={() => {
                          setShow((prev) => ({
                            ...prev,
                            language: !show?.language,
                          }));
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <p className="cat_title">Language</p>
                        {show?.language ? <LuMinus /> : <LuPlus />}
                      </div>
                      <p style={{ border: "1px solid #dfdfdf" }}></p>
                      {show?.language && (
                        <>
                          {" "}
                          <div
                            onClick={() => {
                              setFilter((prev) => ({
                                ...prev,
                                language: "en",
                              }));
                            }}
                          >
                            <label for="en">English</label>
                            <input id="en" type="radio" name="language" />
                          </div>
                          <div
                            onClick={() => {
                              setFilter((prev) => ({
                                ...prev,
                                language: "hi",
                              }));
                            }}
                          >
                            <label for="hi">Hindi</label>
                            <input id="hi" type="radio" name="language" />
                          </div>
                          <div
                            onClick={() => {
                              setFilter((prev) => ({
                                ...prev,
                                language: "enhi",
                              }));
                            }}
                          >
                            <label for="enhi">English + Hindi</label>
                            <input id="enhi" type="radio" name="language" />
                          </div>
                        </>
                      )}
                      <p style={{ border: "1px solid #dfdfdf" }}></p>
                      <div className="filter_btns">
                        <button
                          className="filter-reset-btn"
                          onClick={() => setFilter({})}
                        >
                          Reset
                        </button>
                        {/* <button className="filter-spply-btn">Apply</button> */}
                      </div>
                    </div>
                  )}
                </div>
                {/* {tagsArray.map((item) => (
                  <p
                    className="filter-opt"
                    style={{
                      border: filter?.text == item && "1px solid #b042f5",
                      color: filter?.text == item && "#b042f5 ",
                    }}
                    onClick={() => {
                      setFilter((prev) => ({
                        ...prev,
                        text: item,
                      }));
                    }}
                  >
                    {item}
                  </p>
                ))} */}
              </div>
            </>
          </div>
          <div className="all_ebook_lower" data-aos="fade-up">
            {" "}
            <E_Book_Box ebooks={ebooks} />
          </div>
        </div>
      </div>
    </>
  );
};

export default All_eBooks;
