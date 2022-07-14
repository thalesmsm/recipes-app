import React from 'react';
import Login from '../pages/Login';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../helpers/renderWithRouter';


describe('Testando a página de Login', () => {
  test('Verifique se os inputs são renderizados corretamente', () => {
    render(<Login />)
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const buttonLogin = screen.getByRole('button', {  name: /entrar/i})
  
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
  })

  test('Verifique se a validação dos inputs funciona corretamente', () => {
    render(<Login />)
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const buttonLogin = screen.getByRole('button', {  name: /entrar/i})
        
    userEvent.type(inputEmail, 'teste')
    userEvent.type(inputPassword, '123')
    
    expect(buttonLogin.disabled).toBeTruthy();
    
    userEvent.type(inputEmail, '{selectall}teste@teste.com')
    userEvent.type(inputPassword, '1234567')
    
    expect(buttonLogin.disabled).toBeFalsy();
  })

  test('Verifique se ao clicar em entrar, o usuário é redirecionado', () => {
    const { history } = renderWithRouter(<Login />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const buttonLogin = screen.getByRole('button', {  name: /entrar/i})

    userEvent.type(inputEmail, 'teste@teste.com')
    userEvent.type(inputPassword, '1234567')
    userEvent.click(buttonLogin)

    expect(history.location.pathname).toBe('/foods');
  })
})



