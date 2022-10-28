import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import About from 'pages/about';
import Home from 'pages/home';
import NotFound from 'pages/404';
import FormPage from 'pages/form';
import SearchCardInfo from 'features/search-card-info';

const Routing = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/search/:id" element={<SearchCardInfo />} />
    <Route path="/about" element={<About />} />
    <Route path="/form" element={<FormPage />} />
    <Route path="/404" element={<NotFound />} />
    <Route path="*" element={<Navigate to="/404" />} />
  </Routes>
);

export default Routing;
