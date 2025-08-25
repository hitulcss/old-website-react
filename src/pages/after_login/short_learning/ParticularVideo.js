import React, { useContext, useEffect, useState } from 'react'
import { CoursesData } from '../../../context/courses/Courses'
import { useParams } from 'react-router-dom'
import Loader from '../../../components/Loader/Loader'
import { IoEye } from 'react-icons/io5'
import SideBar from '../../../components/Sidebar/SideBar'
import Navbar from '../../../components/Navbar/Navbar'
import MicroLearningPlayer from '../../../components/MicroLearningPlayer/MicroLearningPlayer'


const ParticularVideo = () => {





    //shortId from params
    const { shortId } = useParams()


    //context
    const { particularShortVideo,
        getShortVideoDetails, isSidebarExpanded } = useContext(CoursesData)

    //api call
    useEffect(() => { if (shortId) { getShortVideoDetails({ shortId: shortId }) } }, [shortId])

    //loading
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (particularShortVideo) {
            setLoading(false)
        }
    }, [particularShortVideo])



    return (
        <><Navbar from="after-login" width={isSidebarExpanded ? 250 : 93} />
            <div>
                <SideBar />
                <div
                    className={
                        isSidebarExpanded
                            ? "after-login-mid open-sidebar"
                            : "after-login-mid closed-sidebar"
                    }
                    style={{ marginLeft: isSidebarExpanded ? "250px" : "100px" }}
                >
                    <div>
                        {loading && <Loader />}
                        {!loading && <div className='short-video' style={{
                            display: 'flex'
                            , alignItems: 'center',
                            justifyContent: 'center',
                            // , height: '70vh',
                            marginTop: '20px'
                        }}>
                            <div className="reel-container"
                            >
                                {" "}
                                <div className="main-page-img-container">
                                    {" "}
                                    <MicroLearningPlayer from='single' data={particularShortVideo} src={particularShortVideo?.urls} />



                                    <div className="black-shadow2" style={{ width: '360px' }}></div>
                                    <div className="reel-detail">
                                        {" "}
                                        <p>{particularShortVideo.title}</p>
                                        <p
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "4px",

                                            }}
                                        >
                                            <IoEye />
                                            {particularShortVideo?.views}
                                        </p>
                                    </div>
                                </div>
                            </div></div>}
                    </div >
                </div >
            </div >
        </>
    )
}

export default ParticularVideo