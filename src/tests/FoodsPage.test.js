import React from 'react';
import App from '../App';
import { render, screen, act, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../helpers/renderWithRouter';
import { chickenMeals } from './mocks/chickenMeals'

describe('Testando a página foods', () => {
    beforeEach(async () => {
        global.fetch = jest.fn(() => 
        Promise.resolve({
            json: () => Promise.resolve(chickenMeals)
        }));
    })
    test('Verifique se ao pesquisar por um ingrediente específico é redirecionado para detalhes', async () => {
        const { history } = renderWithRouter(<App />)
        const inputEmail = screen.getByRole('textbox');
        const inputPassword = screen.getByPlaceholderText(/senha/i);
        const buttonLogin = screen.getByRole('button', {  name: /entrar/i})
    
        userEvent.type(inputEmail, 'teste@teste.com')
        userEvent.type(inputPassword, '1234567')
        userEvent.click(buttonLogin)

        const imgSearch = screen.getByTestId('search-top-btn')
        userEvent.click(imgSearch)
        
        const inputSearch = screen.getByTestId('search-input')
        expect(inputSearch).toBeInTheDocument

        userEvent.type(inputSearch, 'Chicken Alfredo Primavera')

        const radioName = screen.getByRole('radio', {  name: /name/i})
        userEvent.click(radioName)

        const buttonSearch = (await screen.findByRole('button', {  name: /search/i}))
        userEvent.click(buttonSearch)

        history.push('/foods/52796')
        expect(history.location.pathname).toBe('/foods/52796');
    })

    test('Verifique se ao pesquisar por um ingrediente que não existe o usuário é notificado por um alert', async () => {
        const { history } = renderWithRouter(<App />)
        const inputEmail = screen.getByRole('textbox');
        const inputPassword = screen.getByPlaceholderText(/senha/i);
        const buttonLogin = screen.getByRole('button', {  name: /entrar/i})
    
        userEvent.type(inputEmail, 'teste@teste.com')
        userEvent.type(inputPassword, '1234567')
        userEvent.click(buttonLogin)

        const imgSearch = screen.getByTestId('search-top-btn')
        userEvent.click(imgSearch)
        
        const inputSearch = screen.getByTestId('search-input')
        expect(inputSearch).toBeInTheDocument

        userEvent.type(inputSearch, 'xablau')

        const radioName = screen.getByRole('radio', {  name: /name/i})
        userEvent.click(radioName)

        const buttonSearch = (await screen.findByRole('radio', {  name: /ingredient/i}))
        userEvent.click(buttonSearch)

        global.alert = jest.fn()
        
        waitFor(() => expect(global.alert).not.toHaveBeenCalled())
        waitFor(() => expect(global.alert).not.toHaveBeenCalledWith(`${''}Sorry, we haven't found any recipes for these filters.`))
    })
})