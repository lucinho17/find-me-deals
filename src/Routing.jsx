import { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import App from './App.jsx';
import Stores from './Stores.jsx';
import BestDeals from './BestDeals.jsx';
import { lightTheme, darkTheme } from './themes.js';
import 'bootstrap/dist/css/bootstrap.min.css';
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 20px;
    transition: all 0.25s linear;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.text};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.button.hover};
    color: ${(props) => props.theme.button.text};
  }
`;

const ThemeToggler = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 0.5rem;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  cursor: pointer;
  font-size: 1.2rem;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

function Routing() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <ThemeToggler onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </ThemeToggler>
      <Nav>
        <NavLink to="/find-me-deals/">Deals</NavLink>
        <NavLink to="/find-me-deals/stores">Stores</NavLink>
        <NavLink to="/find-me-deals/best-deals">Best Deals</NavLink>
      </Nav>
      <Routes>
        <Route
          path="/find-me-deals/"
          element={<App />}
        />
        <Route
          path="/find-me-deals/stores"
          element={<Stores />}
        />
        <Route
          path="/find-me-deals/best-deals"
          element={<BestDeals />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default Routing;