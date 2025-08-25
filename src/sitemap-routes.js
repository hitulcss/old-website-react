import React from 'react';
import { Route, Routes } from 'react-router';

export default (
    <Route>
        <Route exact path="/login" />
        <Route path="/:slug" />
        <Route path="/:slug/view-all" />
        <Route path="/:categorySlug/:batchSlug" />
        {/* <Route path="/exams" />
        <Route path="/exams/:categorySlug" />
        <Route path="/exams/:categorySlug/:slug" /> */}
        {/* <Route path="/school-entrance-exams-coaching" />
        <Route path="/ugc-net-online-coaching" />
        <Route path="/competitive-exams-coaching" />
        <Route path="/teaching-exams-coaching" /> */}
        <Route path="/center-details" />
        <Route path="/about-us" />
        <Route path="/contact-us" />
    </Route>
);