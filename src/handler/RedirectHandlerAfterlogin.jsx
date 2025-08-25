// RedirectHandlerAfterlogin.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CourseDetails from '../pages/course_details/CourseDetails';
import CategoryPage from '../pages/category_page/CategoryPage';
import { CoursesData } from '../context/courses/Courses';
import Loader from '../components/Loader/Loader';
import CourseDetailsAfterLogin from '../pages/after_login/pages/CourseDetailsAfterLogin/CourseDetailsAfterLogin';
import CategoryAfterLogin from '../pages/after_login/pages/CategoryAfterLogin/CategoryAfterLogin';

function RedirectHandlerAfterlogin() {
    const { categorySlug, batchSlug, slug, subCategorySlug } = useParams();


    const { getCourses, courses } = useContext(CoursesData)


    const [showComponent, setShowComponent] = useState(null); // State to determine which component to show

    useEffect(() => {
        // Simulate a condition check (e.g., fetching data or checking props)
        const checkCondition = async () => {
            setShowComponent(null)

            if (slug && !subCategorySlug) {
                // getCourses(slug, 8, "CategoryPage");
            }
            else if (subCategorySlug) {
                getCourses(slug, 8, "CategoryPage", subCategorySlug);

            }


        }
        checkCondition(); // Call the condition check function
    }, [categorySlug, batchSlug, slug, subCategorySlug]); // Run once on mount
    useEffect(() => {
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

    // console.log  

    // Check if batchSlug is provided
    // console.log('ShowComponent', showComponent)
    return (
        <div>
            {showComponent === 'ComponentA' && <CategoryAfterLogin />}
            {showComponent === 'ComponentB' && <CourseDetailsAfterLogin />}
            {showComponent === null && <Loader />} {/* Show loading state until condition is met */}
        </div>
    );
}

export default RedirectHandlerAfterlogin;