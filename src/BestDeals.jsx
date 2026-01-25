import styled from "styled-components";
import { useState, useEffect } from "react";
import Spin from './Spinner.jsx';

const BestDealsWrapper = styled.div`
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

const DealsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SpinnerWrapper = styled.div`
  grid-column: 1 / -1;
`;

const DealCard = styled.div`
  background: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DealImage = styled.img`
  width: 100%;
  height: 180px; /* Fixed height for uniformity */
  object-fit: cover; /* Ensures images cover the area without distortion */
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const DealTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
`;

const DealPrice = styled.p`
  margin: 0.25rem 0;
`;

const OriginalPrice = styled(DealPrice)`
  text-decoration: line-through;
  opacity: 0.7;
`;

const SalePrice = styled(DealPrice)`
  font-weight: bold;
  color: #28a745;
`;

const Savings = styled(DealPrice)`
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
  margin-top: 1rem;

  &:hover {
    background-color: ${(props) => props.theme.dealLink.hover};
  }
`;


function BestDeals() {

    const [deals, setDeals] = useState([]);
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        fetch('https://www.cheapshark.com/api/1.0/deals?sortBy=Savings&pageSize=21')
            .then(response => response.json())
            .then(data => setDeals(data))
            .then(() => setSpinner(false))
            .catch(error => alert('Error fetching deals:', error));
    }, []);

    return(
        <BestDealsWrapper>
            <Header>
                <h1>Best Deals</h1>
            </Header>
            <DealsGrid>
                {spinner ? <SpinnerWrapper><Spin /></SpinnerWrapper> : (
                  deals.map(deal => (
                      <DealCard key={deal.dealID}>
                          <div>
                              <DealImage src={deal.thumb} alt={deal.title} />
                              <DealTitle>{deal.title}</DealTitle>
                              <OriginalPrice>Original Price: ${deal.normalPrice}</OriginalPrice>
                              <SalePrice>Discounted Price: ${deal.salePrice}</SalePrice>
                              <Savings>Savings: {Math.round(deal.savings)}%</Savings>
                          </div>
                          <ViewDealLink href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`} target='_blank' rel="noopener noreferrer">
                              View Deal
                          </ViewDealLink>
                      </DealCard>
                )))}
            </DealsGrid>
        </BestDealsWrapper>
    )
}

export default BestDeals;