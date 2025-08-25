import React from "react";
import "./Search_Popup.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Search_Popup = ({ searchResult }) => {
  const navigate = useNavigate()
  return (
    <>
      <div className="search_popup_search_wrapper">
        <div className="search_popup_search_container">
          <div className="search_popup_search_upper">
            {searchResult?.data?.length == 0 ? <p>Recent Searches</p> : <p>Results</p>}
            {searchResult?.data?.length == 0 && <p className="primary_color" style={{ cursor: "pointer" }}>
              Clear All
            </p>}
          </div>
          <div className="search_popup_search_lower">
            {searchResult?.data?.map((item, index) => {
              const encoded = btoa(item?.id)
              return <p key={index} onClick={() => navigate(`/${item?.category?.slug}/${item?.slug}`, {
                state: {
                  id: encoded
                }
              })}>
                {searchResult?.data?.length == 0 && <AiOutlineSearch />}
                <span>{item?.batch_name}</span>
              </p>
            })}


          </div>
        </div>
      </div>
    </>
  );
};

export default Search_Popup;
