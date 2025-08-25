import React, { useContext, useEffect, useState } from "react";
import "./Category.css";
import categoryImg from "../../../assets/category.png";
import logo from "../../../assets/logo.png";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { CoursesData } from "../../../context/courses/Courses";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";

const Category = () => {


  const [searchParams, setSearchParams] = useSearchParams();
  const refer = searchParams.get('refer')

  //api
  const { getAllCategory, category, addCategoryDetails, updateUserlanguage } = useContext(CoursesData);


  const navigate = useNavigate()
  //getting category
  useEffect(() => {
    if (localStorage?.getItem('isLoggedIn')) { getAllCategory() }
    else (navigate(`/login?source=${window?.location?.href}`))
  }, [])

  //loading
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (category) setLoading(false)

  }, [category])

  //selected-categoryState
  const [selectedCategory, setSelectedCategory] = useState(false)
  //subcategory
  const [subCategory, setSubCategory] = useState(-1)
  const handleSubmit = () => {
    console.log('came', selectedCategory, subCategory)
    if (selectedCategory) {
      if (selectedCategory?.subCategories?.length > 0 && subCategory == -1) {

        toast.error("Please choose a Sub category..")
      } else if (selectedCategory?.subCategories?.length > 0 && subCategory !== -1) {

        updateUserlanguage(language, refer);
        addCategoryDetails({ category: selectedCategory?.id, subCategory: subCategory })
      } else if (selectedCategory?.subCategories?.length == 0) {

        updateUserlanguage(language, refer);
        addCategoryDetails({ category: selectedCategory?.id, subCategory: null })
      }

    } else {
      toast.error('Please Select a Stream...')
    }
  }


  const [language, setLanguage] = useState('en');




  return (
    <>
      <Toaster />
      {loading ? <Loader /> : <div className="category_wrapper">

        <div className="category_main_container">
          <div className="category_left">
            <img src={categoryImg} alt="category_pic.png" />
          </div>

          <div className="category_right">
            <div className="category_right_img">
              <img src={logo} alt="logo.png" />
            </div>
            <div className="lang_wrapper">
              <h2>Choose your medium</h2>
              <div className="lang_container">
                <div className="english" style={{ border: language == 'en' ? '2px solid black' : '' }} onClick={() => setLanguage("en")}>
                  <p className="lang">A</p>
                  <p>English</p>
                </div>
                <div className="hindi" style={{ border: language == 'hi' ? '2px solid black' : '' }} onClick={() => setLanguage("hi")}>
                  <p className="lang">अ</p>
                  <p>Hindi</p>
                </div>
              </div>
            </div>
            <h1 className="category_right_title">
              Select the goal you want...
            </h1>



            <div className="cat-cont">

              <div className="select-cat-cont">
                {/* <h3>Select your category</h3> */}
                <div>
                  {category?.data?.length > 0 && category?.data?.map((item, index) => {
                    return <p key={index} className={selectedCategory?.id == item?.id ? "activeCategory" : ""} onClick={() => {
                      setSubCategory(-1)
                      setSelectedCategory(item)
                    }}>{item?.name}</p>
                  })}

                </div>
              </div>
              {(selectedCategory && selectedCategory?.subCategories?.length > 0) ? <div>
                <select onChange={(e) => setSubCategory(e.target.value)}>
                  <option defaultChecked>Select Sub-Category</option>
                  {selectedCategory?.subCategories?.length > 0 && selectedCategory?.subCategories?.map((item, index) => {
                    return <option key={index} value={item?.id}>{item?.title}</option>
                  })}

                </select>
              </div> : ''}
            </div>

            <div className="category_right_button_cont">
              <Button className="category_right_btn" onClick={handleSubmit}>Continue</Button>
            </div>

            <p
              style={{ paddingTop: "10px", margin: "0px 10px 0px 10px" }}
              className="category_bottom_text"
            >
              By signing up, you agree to our{" "}
              <a
                style={{ color: "#9603f2" }}
                href="https://www.sdcampus.com/privacy-policy"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                style={{ color: "#9603f2" }}
                href="https://www.sdcampus.com/terms-and-conditions"
              >
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div >}
    </>
  );
};

export default Category;
