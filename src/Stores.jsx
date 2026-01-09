import { useEffect, useState } from "react";
import styled from 'styled-components';

const StoresWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
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

const StoreList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const StoreCard = styled.div`
  background: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  text-align: center;
  padding: 1.5rem;
`;

const StoreName = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
`;

const StoreLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid ${(props) => props.theme.body};
  background-color: ${(props) => props.theme.cardBackground};
`;

function Stores() {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        fetch('https://www.cheapshark.com/api/1.0/stores')
            .then(response => response.json())
            .then(data => setStores(data.filter(store => store.isActive)))
            .catch(error => alert('Error fetching stores:', error));
    }, []);

    return (
        <>
            <StoresWrapper>
                <Header>
                    <h1>Available Stores</h1>
                </Header>
                <StoreList>
                    {stores.map((store) => (
                        <StoreCard key={store.storeID}>
                            <StoreLogo src={`https://www.cheapshark.com${store.images.logo}`} alt={`${store.storeName} Logo`} />
                            <StoreName>{store.storeName}</StoreName>
                        </StoreCard>
                    ))}
                </StoreList>
            </StoresWrapper>
        </>
    );
}

export default Stores;