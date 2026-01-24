import Spinner from 'react-bootstrap/Spinner';

function Spin() {
  return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Spinner animation="border" variant="primary" />
        </div>
  );
}

export default Spin;