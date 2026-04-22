import { useState, useEffect, useRef } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import App from './App.jsx';
import Stores from './Stores.jsx';
import BestDeals from './BestDeals.jsx';
import Auth from './Auth.jsx';
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
  width: 100%;
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

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  text-decoration: none;
  color: ${(props) => props.theme.text};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: background-color 0.2s;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: ${(props) => props.theme.button.hover};
    color: ${(props) => props.theme.button.text};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${(props) => props.theme.cardBackground};
  min-width: 120px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  border-radius: 8px;
  padding: 0.5rem 0;
  z-index: 1001;
  margin-top: 0.5rem;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 0.6rem 1rem;
  border: none;
  background: none;
  color: ${(props) => props.theme.text};
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
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
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    setUser(null);
    setShowDropdown(false);
    navigate('/find-me-deals/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        {user ? (
          <DropdownContainer ref={dropdownRef}>
            <UserButton onClick={toggleDropdown}>{user.username}</UserButton>
            {showDropdown && (
              <DropdownMenu>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </DropdownMenu>
            )}
          </DropdownContainer>
        ) : (
          <NavLink to="/find-me-deals/login">Login</NavLink>
        )}
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
        <Route
          path="/find-me-deals/login"
          element={<Auth setUser={setUser} />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default Routing;