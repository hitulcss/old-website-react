import React, { useContext, useEffect } from "react";
import Wrapper from "../../components/Wrapper/Wrapper";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Card, Stack, Typography } from "@mui/material";
import { CoursesData } from "../../context/courses/Courses";
import "./Blog.css";

const Blog = () => {
  const { getBlog, blog, getAllBlogs, allBlogs } = useContext(CoursesData);
  useEffect(() => {
    getBlog();

    getAllBlogs();
  }, []);
  // console.log(blog?.data)
  return (
    <>
      <Navbar />
      <div className="blog">
        <Wrapper>
          {" "}
          <h2 style={{ marginLeft: "20px " }}>Blogs</h2>
          <div className="blog_wrapper">
            {blog?.data?.map((item, index) => (
              <Card
                key="index"
                sx={{
                  height: "200px",
                  minWidth: "300px",
                  margin: "20px",
                  padding: "10px",
                  cursor: "pointer",
                }}
              >
                <Stack
                  direction="column"
                  sx={{ height: "100%", width: "100%" }}
                >
                  <img
                    src={item?.img}
                    alt="Featured Image"
                    style={{ height: "70%" }}
                    loading="lazy"
                  />
                  <Typography sx={{ fontSize: "15px", textAlign: "center" }}>
                    {item?.title?.rendered}
                  </Typography>
                </Stack>
              </Card>
            ))}
          </div>
        </Wrapper>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
