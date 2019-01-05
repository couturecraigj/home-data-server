import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContentElement = styled.div`
  flex: 1;
  padding: 1rem;
`;

const Content = ({ children }) => <ContentElement>{children}</ContentElement>;

Content.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  ).isRequired
};

export default Content;
