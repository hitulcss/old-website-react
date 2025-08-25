import React, { useContext, useEffect } from "react";
import "./ExamsBox.css";
import Wrapper from "../Wrapper/Wrapper";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

const ExamsBox = ({ blog, title, category, slug, from }) => {
  const navigate = useNavigate();


  return (
    <>
      <div className="exams_box_wrapper">
        <Wrapper>

          <Stack direction='row' justifyContent='space-between' alignItems='center'>    <h1 className="exam_title">{title}</h1>
            {from !== 'view-more' && <p className="view_more_category" onClick={() => { navigate(`/exams/${blog[0]?.category?.slug}`) }}>View More</p>}
          </Stack>

          <div className="exams_box_container">
            {blog?.map((item, index) => (
              <div
                className="exams_box_item"
                key={index}
                onClick={() => navigate(`/exams/${item?.category?.slug}/${item?.slug}`, {
                  state: {
                    id: item?.id
                  }
                })}
              >
                <img src={item?.featuredImage} alt="bookimg" className="exam_box_img" loading="lazy"/>
                <h2>{item.title.length > 40 ? `${item.title.substring(0, 40)}...` : item.title}</h2>
                <button className="exam_box_btn">Read More</button>
              </div>
            ))}
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default ExamsBox;
