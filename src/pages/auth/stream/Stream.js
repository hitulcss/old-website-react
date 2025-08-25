import React, { useContext, useEffect, useState } from "react";
import "./Stream.css";
import { CoursesData } from "../../../context/courses/Courses";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
const Stream = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const refer = searchParams.get("refer");
  const navigate = useNavigate();
  const { updateUserStream, updateUserlanguage, getAllCategory, category } =
    useContext(CoursesData);
  const [language, setLanguage] = useState("");
  const [streamList, setStreamList] = useState([]);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (isLoggedIn) {
      getAllCategory();
    } else {
      navigate(`/login?source=${window?.location?.href}`);
    }
  }, []);

  const handleStreammList = (data) => {
    setStreamList(data?.name);
    // if (streamList?.includes(data?.title)) {
    //   let newArr = streamList?.filter((item) => item !== data?.title);
    //   setStreamList(newArr);
    // } else {
    //   setStreamList(data?.title);
    // }
  };

  const handleSave = () => {
    updateUserStream(streamList, refer);
    updateUserlanguage(language, refer);
  };
  // console.log('STREAM', category)
  return (
    <>
      <div className="stream_wrapper">
        <div className="lang_wrapper">
          <h2>Choose your medium</h2>
          <div className="lang_container">
            <div
              className="english"
              style={{ border: language == "en" ? "2px solid black" : "" }}
              onClick={() => setLanguage("en")}
            >
              <p className="lang">A</p>
              <p>English</p>
            </div>
            <div
              className="hindi"
              style={{ border: language == "hi" ? "2px solid black" : "" }}
              onClick={() => setLanguage("hi")}
            >
              <p className="lang">अ</p>
              <p>Hindi</p>
            </div>
          </div>
        </div>

        <div className="select_stream">
          <h2>Select your stream</h2>
          <div className="stream_container">
            {category?.data?.map((item, index) => (
              <div
                className="stream_box"
                key={index}
                style={{
                  border: item?.name == streamList ? "2px solid black" : "",
                }}
                onClick={() => {
                  handleStreammList(item);
                }}
              >
                <img src={item?.banner} alt="" loading="lazy" />
                <p>{item?.name}</p>
              </div>
            ))}
          </div>
        </div>
        <NavLink to="/">
          <div className="stream_btn">
            <button onClick={() => handleSave()}>Save & Continue</button>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default Stream;
