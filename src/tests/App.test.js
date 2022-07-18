import React from 'react';
import App from '../App';
import { render, screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';


describe('Testando o app', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  })

  test('Verifique se os inputs são renderizados corretamente', () => {
    const route = screen.getByText(/entrar/i)

    expect(route).toBeInTheDocument()
  })

})



