import React from "react";
import ReactStars from "react-stars";

const Stars = ({ setReviewData, reviewData }) => {
  const ratingChanged = (newRating) => {
    setReviewData((prev) => ({ ...prev, rating: newRating }));
  };
  return (
    <>
      <div style={{ marginTop: "-10px" }}>
        <ReactStars
          value={reviewData?.rating}
          count={5}
          size={30}
          half={false}
          edit={true}
          onChange={ratingChanged}
        />
      </div>
    </>
  );
};

export default Stars;
