import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import About from 'pages/about';
import Home from 'pages/home';
import NotFound from 'pages/404';
import FormPage from 'pages/form';
import SearchCardInfo from 'features/search-card-info';
import { setScrollPos } from 'app/store/homePageSlice';
import { useAppDispatch } from 'app/store/hooks';

const Routing = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/' && location.pathname.indexOf('search') === -1) {
      dispatch(setScrollPos(0));
    }
  }, [location, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search/:id" element={<SearchCardInfo />} />
      <Route path="/about" element={<About />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Routing;
