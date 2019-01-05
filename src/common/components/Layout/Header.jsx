import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const HeaderLink = styled(NavLink).attrs({
  activeClassName: 'a'
})`
  padding: 0 1em;
  .active {
    color: purple;
  }
`;

const HeaderElement = styled.header`
  width: 100%;
  text-align: center;
`;
const Header = () => (
  <HeaderElement>
    <HeaderLink to="/">Home</HeaderLink>
    <HeaderLink to="/dashboard">Dashboard</HeaderLink>
    <HeaderLink to="/weather">Weather</HeaderLink>
    <HeaderLink to="/welcome">Welcome</HeaderLink>
  </HeaderElement>
);

export default Header;
