import { useState } from 'react';
import styled from 'styled-components';

const AuthWrapper = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.input.border};
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  font-size: 1rem;
`;

const Button = styled.button`
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
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.button.background};
  color: ${(props) => props.theme.button.background};
  
  &:hover {
    background-color: ${(props) => props.theme.button.background};
    color: ${(props) => props.theme.button.text};
  }
`;

function Login({ onShowRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });
    // In a real app, this would call an API
  };

  return (
    <AuthWrapper>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <Input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <Button type="submit">Login</Button>
      </Form>
      <hr style={{ margin: '1.5rem 0' }} />
      <p style={{ color: 'inherit' }}>Don't have an account?</p>
      <SecondaryButton onClick={onShowRegister}>Register</SecondaryButton>
    </AuthWrapper>
  );
}

export default Login;
