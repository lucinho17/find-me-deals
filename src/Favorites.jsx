import styled from 'styled-components';

const FavoritesWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 0 20px;
`;

const Header = styled.header`
  margin-bottom: 2rem;
  h1 { font-size: 2.5rem; }
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
  margin-right: 0.5rem;

  &:hover {
    background-color: ${(props) => props.theme.dealLink.hover};
  }
`;

const FavoriteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: 2px solid #ff4d4d;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #cc0000;
  }
`;

function Favorites({ user, setUser }) {
  const favorites = user?.favorites || [];

  const removeFavorite = async (game) => {
    try {
      const response = await fetch('http://localhost:5000/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username, game })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setUser({ ...user, favorites: data.favorites });
    } catch (err) {
      alert("Error removing favorite: " + err.message);
    }
  };

  return (
    <FavoritesWrapper>
      <Header>
        <h1>Your Favorite Games</h1>
      </Header>

      {favorites.length === 0 ? (
        <p>You haven't added any favorites yet.</p>
      ) : (
        <GameList>
          {favorites.map((game, index) => (
            <GameCard key={game.gameID || index}>
              <GameImage src={game.thumb} alt={game.external} />
              <GameInfo>
                <GameTitle>{game.external || game.title}</GameTitle>
                <GamePrice>Price: ${game.cheapest}</GamePrice>
                <ViewDealLink href={`https://www.cheapshark.com/redirect?dealID=${game.cheapestDealID}`} target='_blank' rel="noopener noreferrer">
                  View Deal
                </ViewDealLink>
                <FavoriteButton onClick={() => removeFavorite(game)}>
                  Remove from Favorites
                </FavoriteButton>
              </GameInfo>
            </GameCard>
          ))}
        </GameList>
      )}
    </FavoritesWrapper>
  );
}

export default Favorites;
