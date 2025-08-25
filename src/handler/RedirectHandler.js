// RedirectHandler.js
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import CourseDetails from '../pages/course_details/CourseDetails';
import CategoryPage from '../pages/category_page/CategoryPage';
import { CoursesData } from '../context/courses/Courses';
import Loader from '../components/Loader/Loader';

function RedirectHandler() {
    const { categorySlug, batchSlug, slug, subCategorySlug } = useParams();


    const { getCourses, courses } = useContext(CoursesData)


    const [showComponent, setShowComponent] = useState(null); // State to determine which component to show

    useEffect(() => {
        setShowComponent(null)
        // Simulate a condition check (e.g., fetching data or checking props)
        const checkCondition = async () => {


            if (slug && !subCategorySlug) {
                getCourses(slug, 8, "CategoryPage");
            }
            else if (subCategorySlug) {
                getCourses(slug, 8, "CategoryPage", subCategorySlug);

            }


        }
        checkCondition(); // Call the condition check function
    }, [categorySlug, batchSlug, slug, subCategorySlug]); // Run once on mount

    useEffect(() => {
        setShowComponent(null)
        // Simulate a condition check (e.g., fetching data or checking props)
        if (courses) {
            if (courses?.status) {
                setShowComponent('ComponentA'); // Set the state to show ComponentA
            } else if (!courses?.status) {
                setShowComponent('ComponentB'); // Set the state to show ComponentB
            }
        }
    }, [courses]); // Run once on mount

    // Simulate fetching data or checking a condition


    // Check if batchSlug is provided

    const location = useLocation()
  

    return (
        <div>
            {location?.state?.from == 'sub' ? <CategoryPage from={location?.state?.from} /> :
                <>    <> {showComponent === 'ComponentA' && <CategoryPage from={location?.state?.from} />}</>
                    <>{showComponent === 'ComponentB' && <CourseDetails />}</>
                    <> {showComponent === null && <Loader />}</></>} {/* Show loading state until condition is met */}
        </div >
    );
}

export default RedirectHandler;