import React from "react";
import "./Search_Popup.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const Search_Popup = ({ searchResult, setIsOpen }) => {
  //console.log(searchResult?.data)
  const navigate = useNavigate();
  return (
    <>
      <div className="search_wrapper">
        <div className="search_container">
          <div className="search_upper">
            <div>
              {" "}
              {searchResult?.data?.length == 0 ? (
                <p>Recent Searches</p>
              ) : (
                <p>Results</p>
              )}
            </div>

            <CloseIcon
              fontSize="small"
              sx={{
                position: "absolute",
                right: "2%",
                top: "2%",
                cursor: "pointer",
              }}
              onClick={() => setIsOpen(false)}
            />

            {/* {searchResult?.data?.length == 0 && (
              <p className="primary_color" style={{ cursor: "pointer" }}>
                Clear All
              </p>
            )} */}
          </div>
          <div className="search_lower">
            {searchResult?.data?.map((item, index) => {
              const encoded = btoa(item?.id);
              return (
                <p
                  key={index}
                  onClick={() =>
                    navigate(`/p/${item?.category?.slug}/${item?.slug}`, {
                      state: {
                        id: encoded,
                      },
                    })
                  }
                >
                  {searchResult?.data?.length == 0 && <AiOutlineSearch />}
                  <span>{item?.title}</span>
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search_Popup;
