import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const Layout = ({ children }) => (
  <React.Fragment>
    <Header />
    <Content>{children}</Content>
    <Footer />
  </React.Fragment>
);

Layout.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  ).isRequired
};

export default Layout;
