import React, { useContext, useEffect, useState } from "react";
import "./BookBox.css";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { AiFillStar } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CoursesData } from "../../context/courses/Courses";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BookBox = ({ books }) => {
  //loading
  const [loading, setLoading] = useState(true);

  //Login Drawer
  const { setDrawerOpen } = useContext(CoursesData);

  //slug from url
  const { slug, categorySlug, batchSlug } = useParams();

  useEffect(() => {
    if (books) {
      setLoading(false);
    }
  }, [books]);

  //navigate
  const navigate = useNavigate();

  const [addToCartChanged, setAddToCartChanged] = useState({
    added: false,
    id: "",
  });
  const [addToCartList, setAddToCartList] = useState([]);

  //handling add to cart
  const handleAddToCart = (item) => {
    setAddToCartChanged({ added: true, id: item.id });
    setAddToCartList((prev) => [...prev, item.id]);

    if (localStorage.getItem("isLoggedIn")) {
      window.open(
        `https://sdpublication.com/cart/${item?.id
        }?token=${localStorage.getItem("token")}`
      );
      // window.open(
      //   `http://localhost:3001/cart/${item?.id}?token=${localStorage.getItem(
      //     "token"
      //   )}`
      // );

      // addToCart({ id, quantity: 1, ref });
    } else {
      // if (slug) { navigate(`/login?ref=${window.location.origin}/${slug}`) }
      // if (categorySlug && batchSlug)
      //   navigate(`/login?ref=${window.location.origin}/${categorySlug}/${batchSlug}`)
      setDrawerOpen(true);
    }
  };
  //handling Buy Now
  const handleBuyNow = (item) => {
    if (localStorage.getItem("isLoggedIn")) {
      if (item?.isAddToCart) {
        // window.open(
        //   `http://localhost:3001/cart?token=${localStorage.getItem("token")}`
        // );
        window.open(
          `https://sdpublication.com/cart?token=${localStorage.getItem(
            "token"
          )}`
        );
      } else {
        // window.open(
        //   `http://localhost:3001/cart/${item?.id}?token=${localStorage.getItem(
        //     "token"
        //   )}`
        // );
        window.open(
          `https://sdpublication.com/cart/${item?.id
          }?token=${localStorage.getItem("token")}`
        );
      }
    } else {
      // if (slug) { navigate(`/login?ref=${window.location.origin}/${slug}`) }
      // if (categorySlug && batchSlug)
      //   navigate(`/login?ref=${window.location.origin}/${categorySlug}/${batchSlug}`)
      setDrawerOpen(true);
    }
  };
  return (
    <>
      <div className="books_wrapper" data-aos="fade-right">
        {loading ? (
          <div
            style={{
              height: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Loader />
          </div>
        ) : books?.data1?.products?.length > 0 ? (
          books?.data1?.products?.map((item, index) => (
            <div key={index}>
              <div
                onClick={() => {
                  window.open(`https://sdpublication.com/product/${item?.slug}`);
                }}
                //   key={index + 1}
                className="book_box"
              //   style={{
              //     translate: `${size}px 0px`,
              //     transition: "all 1s",
              //   }}
              >
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  className="fav_icon"
                  sx={{
                    "&.Mui-checked": {
                      color: pink[600],
                      cursor: "pointer",
                    },
                  }}
                />

                <div className="book_img__box">
                  <LazyLoadImage src={item?.featuredImage} alt="bookimg" />
                </div>

                <div className="books_details">
                  <div style={{ textDecoration: "none" }}>
                    <p className="book_title">
                      {item?.title.length > 25
                        ? item?.title.slice(0, 25)
                        : item?.title}
                      ...
                    </p>
                    {/* <p className="book-tag">{item.tag}</p> */}
                    <div className="price_details">
                      <p>
                        ₹{item?.salePrice}
                        &nbsp;
                        <span className="disount_percentage">
                          (
                          {(
                            100 -
                            (item?.salePrice / item?.regularPrice) * 100
                          ).toFixed(0)}
                          % OFF)
                        </span>
                      </p>
                      <p>
                        <span
                          style={{
                            color: "#626262",
                            fontWeight: "500",
                            fontSize: "14px",
                          }}
                        >
                          M.R.P.: <del> ₹{item?.regularPrice}</del>
                        </span>
                      </p>
                      <span className="rating">
                        <AiFillStar />

                        {item?.averageRating}
                      </span>
                      {/* {item?.badge} */}
                      <span
                        className="trending"
                        style={{
                          backgroundColor: "var(--primaryColor)",
                        }}
                      >
                        <p>{item?.badge}</p>
                      </span>
                    </div>
                  </div>
                  <div className="book_box_btns">
                    <button
                      className="book_box_addtocart"
                      onClick={(e) => {
                        if (e?.target.innerText == "Go To Bag") {
                          if (localStorage?.getItem("isLoggedIn")) {
                            window.open(
                              `https://sdpublication.com/cart?token=${localStorage.getItem(
                                "token"
                              )}`
                            );
                          }
                        } else {
                          handleAddToCart(item);
                        }
                      }}
                    >
                      <HiOutlineShoppingBag size={16} />
                      {addToCartChanged?.added
                        ? addToCartList?.includes(item?.id)
                          ? "Go To Bag"
                          : item?.isAddToCart
                            ? "Go To Bag"
                            : "Add To Cart"
                        : item?.isAddToCart
                          ? "Go To Bag"
                          : "Add To Cart"}
                    </button>
                    <button
                      className="book_box_buynow"
                      onClick={() => {
                        handleBuyNow(item);
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          "No EBooks"
        )}
      </div>
    </>
  );
};

export default BookBox;
