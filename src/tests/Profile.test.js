import React from 'react';
import App from '../App';
import { render, screen, act, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testando a página de Profile', () => {
    test('Verifique se as informações do usuário aparecem na tela', () => {
        const { history } = renderWithRouter(<App />)
        const inputEmail = screen.getByRole('textbox');
        const inputPassword = screen.getByPlaceholderText(/senha/i);
        const buttonLogin = screen.getByRole('button', {  name: /entrar/i})

        userEvent.type(inputEmail, 'rafaelrksilva@gmail.com')
        userEvent.type(inputPassword, '1234567')
        userEvent.click(buttonLogin)

        history.push('/profile')
        expect(history.location.pathname).toBe('/profile')

        const userEmail = screen.getByTestId('profile-email')
        expect(userEmail).toBeInTheDocument() 
    })

    test('Verifique se o usuário é redirecionado ao clicar em done recipes', () => {
        const { history } = renderWithRouter(<App />)
        const inputEmail = screen.getByRole('textbox');
        const inputPassword = screen.getByPlaceholderText(/senha/i);
        const buttonLogin = screen.getByRole('button', {  name: /entrar/i})

        userEvent.type(inputEmail, 'rafaelrksilva@gmail.com')
        userEvent.type(inputPassword, '1234567')
        userEvent.click(buttonLogin)

        history.push('/profile')
        expect(history.location.pathname).toBe('/profile')

        const buttomDoneRecipes = screen.getByTestId('profile-done-btn');
        userEvent.click(buttomDoneRecipes);
        expect(history.location.pathname).toBe('/done-recipes');
    })

    test('Verifique se o usuário é redirecionado ao clicar em favorite recipes', () => {
        const { history } = renderWithRouter(<App />)
        const inputEmail = screen.getByRole('textbox');
        const inputPassword = screen.getByPlaceholderText(/senha/i);
        const buttonLogin = screen.getByRole('button', {  name: /entrar/i})

        userEvent.type(inputEmail, 'rafaelrksilva@gmail.com')
        userEvent.type(inputPassword, '1234567')
        userEvent.click(buttonLogin)

        history.push('/profile')
        expect(history.location.pathname).toBe('/profile')

        const buttomFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
        userEvent.click(buttomFavoriteRecipes);
        expect(history.location.pathname).toBe('/favorite-recipes');
    })

    test('Verifique se o usuário é deslogado e as informações apagadas', () => {
        const { history } = renderWithRouter(<App />)
        const inputEmail = screen.getByRole('textbox');
        const inputPassword = screen.getByPlaceholderText(/senha/i);
        const buttonLogin = screen.getByRole('button', {  name: /entrar/i})

        userEvent.type(inputEmail, 'rafaelrksilva@gmail.com')
        userEvent.type(inputPassword, '1234567')
        userEvent.click(buttonLogin)

        history.push('/profile')
        expect(history.location.pathname).toBe('/profile')

        const buttomLogout = screen.getByTestId('profile-logout-btn');
        userEvent.click(buttomLogout);
        expect(history.location.pathname).toBe('/');
    })
})