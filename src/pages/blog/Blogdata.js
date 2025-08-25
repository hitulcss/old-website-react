import React, { useContext, useEffect } from 'react'
import { CoursesData } from '../../context/courses/Courses'
import { useParams } from 'react-router-dom'

const Blogdata = () => {
    const { getBlogData, blogData } = useContext(CoursesData)
    const { id } = useParams()
    useEffect(() => {
        getBlogData(id)
    }, [])
    // console.log(blogData)
    return (
        <div className="course_description" dangerouslySetInnerHTML={{ __html: blogData?.data.content?.rendered }} />
    )
}

export default Blogdata