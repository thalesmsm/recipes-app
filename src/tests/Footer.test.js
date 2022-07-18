import React from 'react';
import App from '../App';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testando Footer', () => {
  test('Verifique se o componente Footer é renderizado corretamente', () => {
    render(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const buttonLogin = screen.getByRole('button', {  name: /entrar/i});
    
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(buttonLogin);

    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinkButton).toBeInTheDocument();

    const foodButton = screen.getByTestId('food-bottom-btn');
    expect(foodButton).toBeInTheDocument();

  });

});
