import React from 'react';
import App from '../App';
import { render, screen, waitFor } from '@testing-library/react';


describe('Testando o app', () => {
  beforeEach(() => {
    render(<App />);
  })

  test('Verifique se os inputs são renderizados corretamente', () => {
    const route = screen.getByText(/entrar/i)

    expect(route).toBeInTheDocument()
  })

})



