import { useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes';

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

const AppWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 0 20px;
`;

const Header = styled.header`
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const SearchInput = styled.input`
  padding: 0.8rem 1rem;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.input.border};
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  margin-right: 0.5rem;
  font-size: 1rem;
  width: 60%;
  max-width: 300px;

  @media (max-width: 768px) {
    width: 70%;
    margin-bottom: 1rem;
  }
`;

const SearchButton = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => props.theme.button.background};
  color: ${(props) => props.theme.button.text};
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.button.hover};
  }
  
    @media (max-width: 768px) {
    width: 100%;
    max-width: 330px;
    margin-right: 0;
  }
`;

const GameList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const GameCard = styled.div`
  background: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  text-align: left;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const GameImage = styled.img`
  width: 120px;
  height: auto;
  border-radius: 4px;
`;

const GameInfo = styled.div`
  flex-grow: 1;
`;

const GameTitle = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
`;

const GamePrice = styled.p`
  margin: 0 0 1rem 0;
  font-weight: bold;
  color: #28a745;
`;

const ViewDealLink = styled.a`
  display: inline-block;
  text-decoration: none;
  background-color: ${(props) => props.theme.dealLink.background};
  color: ${(props) => props.theme.dealLink.text};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.dealLink.hover};
  }
`;

const ThemeToggler = styled.button`
  position: absolute;
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
`;

function App() {
  const [gameName, setGameName] = useState('');
  const [gameData, setGameData] = useState([]);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  function catchDeal() {
    if(gameName.trim() === '') {
      alert("Please enter a game name.");
      return;
    }
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          alert("No deals found for this game. Please try another title.");
        }
        setGameData(data);
      });
    
  }
  
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyle />
        <ThemeToggler onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </ThemeToggler>
        <AppWrapper>
          <Header>
            <h1>Find Me Some Deals</h1>
            <label htmlFor='game' style={{ display: 'none' }}>Game Name:</label>
            <SearchInput type='text' id='game' name='game' value={gameName} onChange={(e) => setGameName(e.target.value)} placeholder="Enter a game name..." />
            <SearchButton onClick={catchDeal}>Find Best Deal</SearchButton>
          </Header>

          <GameList>
            {gameData.map((game) => (
              <GameCard key={game.gameID}>
                <GameImage src={game.thumb} alt={game.external} />
                <GameInfo>
                  <GameTitle>{game.external}</GameTitle>
                  <GamePrice>Cheapest Price: ${game.cheapest}</GamePrice>
                  <ViewDealLink href={`https://www.cheapshark.com/redirect?dealID=${game.cheapestDealID}`} target='_blank' rel="noopener noreferrer">
                    View Deal
                  </ViewDealLink>
                </GameInfo>
              </GameCard>
            ))}
          </GameList>
        </AppWrapper>
      </>
    </ThemeProvider>
  );
}

export default App;
