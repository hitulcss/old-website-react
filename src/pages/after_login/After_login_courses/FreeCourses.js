import React, { useContext, useEffect } from "react";
import { CoursesData } from "../../../context/courses/Courses";
import Wrapper from "../../../components/Wrapper/Wrapper";
import NotFound from "../../../components/NotFound/NotFound";
import { useNavigate } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";
import { Skeleton, Stack } from "@mui/material";
import { MdOutlineLockClock } from "react-icons/md";
import Access from "../../../components/Access/Access";
import OfferingCourses from "../../../components/Offering_Courses/OfferingCourses";
import JoinUs from "../../../components/Join_us/JoinUs";
import LearningSlide from "../../../components/Quick_Learning_Slide/LearningSlide";

const FreeCourses = ({ from }) => {
  const {
    getFreeCourses,
    freeCoursesData,
    getMyCourses,
    myCourses,
    loadingForMyCourse,
  } = useContext(CoursesData);

  const navigate = useNavigate();

  useEffect(() => {
    getFreeCourses("", 8);
    getMyCourses();
  }, []);

  let freeMycourses = myCourses?.filter((item) => !item?.isPaid);
  let loaderArr = [1, 2, 3, 4];
  return (
    <>
      <div className="after-login-mycourse-wrapper">
        {" "}
        <div className="new_courses_container">
          <Wrapper>
            {!loadingForMyCourse ? (
              from == "after-login" && (
                <div className="mycourse_container">
                  {freeMycourses?.length > 0 ? (
                    freeMycourses?.map((item, index) => (
                      <div className="mycourses_box" key={index}>
                        <img src={item?.banner} alt="cover" />
                        <div className="mycourse_description">
                          <h2>
                            {item.batchName?.slice(0, 30)}
                            {item.batchName?.length > 30 ? ".." : ""}
                          </h2>
                          {/* <p>
                            Targeted Batch for {item?.categoryDetails?.title}
                          </p> */}
                          {/* <p>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                marginTop: "10px",
                              }}
                            >
                              <IoCalendarOutline />

                              <span>
                                Start on{" "}
                                <span
                                  style={{ fontWeight: "600", color: "#000" }}
                                >
                                  {item?.startingDate}
                                </span>{" "}
                                | End on{" "}
                                <span
                                  style={{ fontWeight: "600", color: "#000" }}
                                >
                                  {item?.endingDate}
                                </span>
                              </span>
                            </span>{" "}
                          </p> */}

                          {item?.daysLeft < 8 && item?.daysLeft > 0 && (
                            <p className="batch-expire-text">
                              <span>
                                <MdOutlineLockClock className="lock-timer" />
                              </span>
                              <span>
                                Batch Expiring In {item?.daysLeft} Days
                              </span>
                            </p>
                          )}
                          {item?.daysLeft < 1 && (
                            <p className="batch-expire-text">
                              <span>
                                <MdOutlineLockClock className="lock-timer" />
                              </span>
                              <span>Batch Expired </span>
                            </p>
                          )}
                        </div>
                        <div
                          onClick={() => {
                            if (from == "after-login") {
                              if (item?.daysLeft < 1) {
                                navigate(
                                  `/learning/${item?.slug}/add-validity`
                                );
                              } else {
                                navigate(
                                  `/learning/my-courses/c/${item?.slug}`,
                                  {
                                    state: {
                                      id: item?.batchId,
                                      slug: item?.slug,
                                    },
                                  }
                                );
                              }
                            } else {
                              navigate(`/my-courses/c/${item?.slug}`, {
                                state: {
                                  id: item?.batchId,
                                  slug: item?.slug,
                                },
                              });
                            }
                          }}
                        >
                          <button>
                            {" "}
                            {item?.daysLeft < 1
                              ? "Extend Validity"
                              : "Let's Study"}
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <NotFound title={"Course"} />
                  )}
                </div>
              )
            ) : (
              <Stack direction="row" mt={5} sx={{ width: "100%" }}>
                {loaderArr?.map((item, index) => {
                  return (
                    <Stack
                      direction="row"
                      sx={{ width: "100%", paddingLeft: "20px" }}
                    >
                      <Stack direction="column">
                        <Skeleton variant="rounded" width={210} height={200} />
                        <Skeleton
                          variant="text"
                          height={30}
                          width={170}
                          sx={{ fontSize: "1rem" }}
                        />
                        <Skeleton
                          variant="text"
                          height={20}
                          width={140}
                          sx={{ fontSize: "1rem" }}
                        />
                        <Skeleton
                          variant="text"
                          height={10}
                          width={110}
                          sx={{ fontSize: "1rem" }}
                        />
                        <Stack direction="row" spacing={1}>
                          <Skeleton
                            variant="text"
                            height={60}
                            width={100}
                            sx={{ fontSize: "1rem" }}
                          />
                          <Skeleton
                            variant="text"
                            height={60}
                            width={100}
                            sx={{ fontSize: "1rem" }}
                          />
                        </Stack>
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
            )}
            {/* <Course_Exam_Box
              courses={from == 'after-login' ? freeMycourses : myCourses}
              from={from}
            // courses={
            //   filter == "all"
            //     ? courses?.data?.batches
            //     : filter == "free"
            //     ? freeCoursesData
            //     : paidCoursesData
            // }
            // slug={slug}
            // from="course"
            /> */}

            {freeMycourses?.length == 0 && (
              <div className="no-course-data">
                {" "}
                <LearningSlide />
                <Access />
                <OfferingCourses />
                <JoinUs />
              </div>
            )}
          </Wrapper>
        </div>
      </div>
    </>
  );
};

export default FreeCourses;
