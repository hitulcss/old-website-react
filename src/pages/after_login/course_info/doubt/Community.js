import React, { useContext, useEffect, useState } from "react";
import "./Community.css";
import CommunityModal from "./CommunityModal";
import CommunityPostModal from "./CommunityPostModal";
import { CoursesData } from "../../../../context/courses/Courses";
import CommunityDetail from "./CommunityDetail";
import doubtImg from "../../../../assets/doubt.png";
import { Toaster } from "react-hot-toast";
import DoubtPrivacyPolicy from "./DoubtPrivacyPolicy";
import Loader from "../../../../components/Loader/Loader";
import ReportBox from "./ReportBox";
import InfiniteScroll from "react-infinite-scroller";
import { Button, Chip } from "@mui/material";
import { FaAngleDown } from "react-icons/fa";
import ImgModal from "./ImgModal";

const Doubt = ({ batchId, batchSlug, prePurchase, setLockModal }) => {
  //modal state
  const [open, setOpen] = React.useState(false);

  //pagination
  const [page, setPage] = useState(1);

  //type of posts
  const [myCommunity, setMyCommunities] = useState(false);
  const handleClick = (type) => {
    setMyCommunities(type);
  };

  //Edit
  const [isEdit, setIsEdit] = useState({ show: false, data: {} });

  //call state
  const [helperState, setHelperState] = React.useState(false);

  //doubt modal state

  const [doubtOpen, setDoubtOpen] = React.useState(false);

  //privacyPolicy
  const [doubtPrivacyPolicy, setDoubtPrivacyPolicy] = useState(false);

  //context
  const { getBatchDoubts, batchDoubts, getBatchMyCommunities, myCommunities } =
    useContext(CoursesData);

  //report
  const [showReport, setShowReport] = useState({ show: false, type: "" });

  //loading
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (batchDoubts || myCommunities) {
      setLoading(false);
    }
  }, [batchDoubts, myCommunities]);

  //api call
  useEffect(() => {
    if (batchId) {
      if (myCommunity) {
        getBatchMyCommunities(batchId, page, 6);
      } else {
        getBatchDoubts(batchId, page, 6);
      }
    }
  }, [batchId, helperState, page, myCommunity]);

  const [selectedCommunity, setSelectedCommunity] = React.useState(-1);

  const [deleteHelperState, setDeleteHelperState] = useState({
    type: "",
    data: {},
    show: false,
  });
  const [imgopen, setImgopen] = useState(false);
  const [imgsrc, setImgsrc] = useState(-1);



  const [commuityData, setCommunityData] = useState()
  const [myCommunityData, setMyCommunityData] = useState()

  useEffect(() => {
    if (batchDoubts) {
      if (page == 1) {

        setCommunityData((prev) => ([...batchDoubts?.data?.communities]));
      } else {
        setCommunityData((prev) => ([...prev, ...batchDoubts?.data?.communities]));
      }
    }
  }, [batchDoubts])
  useEffect(() => {
    if (myCommunities) {
      if (page == 1) {
        setMyCommunityData((prev) => ([...myCommunities?.data?.communities]))
      } else {
        setMyCommunityData((prev) => ([...prev, ...myCommunities?.data?.communities]))
      }
    }

  }, [myCommunities])
  return (
    <>
      <Toaster />

      <div className="doubt-container">
        {!prePurchase && (
          <>
            {" "}
            <Chip
              label="All Posts"
              onClick={() => handleClick(false)}
              sx={{
                background: !myCommunity ? "var(--primaryColor)" : "none",
                border: myCommunity && "1px solid var(--primaryColor)",

                color: !myCommunity ? "#fff" : "var(--primaryColor)",
                mr: 1,
              }}
            />
            <Chip
              label="My Posts"
              onClick={() => handleClick(true)}
              sx={{
                background: myCommunity ? "var(--primaryColor)" : "none",
                border: !myCommunity && "1px solid var(--primaryColor)",

                color: myCommunity ? "#fff" : "var(--primaryColor)",
              }}
            />
          </>
        )}
        {!prePurchase && (
          <CommunityDetail
            setImgsrc={setImgsrc}
            setImgopen={setImgopen}
            deleteHelperState={deleteHelperState}
            setDeleteHelperState={setDeleteHelperState}
            setShowReport={setShowReport}
            setDoubtPrivacyPolicy={setDoubtPrivacyPolicy}
            doubtPrivacyPolicy={doubtPrivacyPolicy}
            doubtOpen={doubtOpen}
            setDoubtOpen={setDoubtOpen}
            batchId={batchId}
            selectedCommunity={selectedCommunity}
            helperState={helperState}
            setHelperState={setHelperState}
          />
        )}
        {/* {showReport?.show && */}
        {!prePurchase && (
          <ReportBox showReport={showReport} setShowReport={setShowReport} />
        )}

        <div>
          {" "}
          <ImgModal imgopen={imgopen} setImgopen={setImgopen} imgsrc={imgsrc} />
        </div>

        {loading ? (
          <Loader />
        ) : (myCommunity ? myCommunityData : commuityData)
          ?.length > 0 ? (
          (myCommunity ? myCommunityData : commuityData)?.map(
            (item, index) => {
              return (
                <>
                  <CommunityPostModal
                    key={index}
                    setLockModal={setLockModal}
                    setImgsrc={setImgsrc}
                    setImgopen={setImgopen}
                    deleteHelperState={deleteHelperState}
                    setDeleteHelperState={setDeleteHelperState}
                    prePurchase={prePurchase}
                    setShowReport={setShowReport}
                    setIsEdit={setIsEdit}
                    setOpen={setOpen}
                    isEdit={isEdit}
                    helperState={helperState}
                    setHelperState={setHelperState}
                    batchId={batchId}
                    data={item}
                    setSelectedCommunity={setSelectedCommunity}
                    setDoubtOpen={setDoubtOpen}
                  />
                </>
              );
            }
          )
        ) : (
          <div className="create-doubt-container">
            <div className="create-doubt">
              <img src={doubtImg} alt="doubt-img" />
              <p>No Posts Found!</p>
              {!prePurchase && (
                <button onClick={() => setOpen(true)}>Create Post</button>
              )}
            </div>
          </div>
        )}
        {(myCommunity ? myCommunities : batchDoubts)?.data?.communities
          ?.length > 5 && (
            <div className="loader-infinite ">
              <Button onClick={() => setPage(page + 1)}>
                Show More <FaAngleDown />
              </Button>{" "}
            </div>
          )}
        {/* <CommunityPostModal doubtOpen={doubtOpen} setDoubtOpen={setDoubtOpen} batchId={batchId} /> */}

        {/* <h3>No Doubt Found</h3> */}

        <div>
          <DoubtPrivacyPolicy
            setDoubtPrivacyPolicy={setDoubtPrivacyPolicy}
            doubtPrivacyPolicy={doubtPrivacyPolicy}
          />
        </div>

        <div>
          {!prePurchase && (
            <CommunityModal
              show={
                (myCommunity ? myCommunities : batchDoubts)?.data?.communities
                  ?.length > 0
              }
              batchSlug={batchSlug}
              batchId={batchId}
              open={open}
              setOpen={setOpen}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Doubt;
