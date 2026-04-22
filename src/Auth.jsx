import { useState } from 'react';
import styled from 'styled-components';
import Login from './Login.jsx';
import Register from './Register.jsx';

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

function Auth({ setUser }) {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <AuthContainer>
      {isRegistering ? (
        <Register onShowLogin={() => setIsRegistering(false)} />
      ) : (
        <Login onShowRegister={() => setIsRegistering(true)} setUser={setUser} />
      )}
    </AuthContainer>
  );
}

export default Auth;
