import React from 'react';
import App from '../App';
import { render, screen, act, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../helpers/renderWithRouter';
import { chickenMeals } from './mocks/chickenMeals'

describe('Testando o componente SearchBar', () => {
    beforeEach(async () => {
        global.fetch = jest.fn(() => 
        Promise.resolve({
            json: () => Promise.resolve(chickenMeals)
        }));
    })
    test('Verifique se ao pesquisar por ingrediente as receitas são renderizadas', async () => {
        renderWithRouter(<App />)
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

        userEvent.type(inputSearch, 'chicken')

        const radioIngredient = screen.getByRole('radio', {  name: /ingredient/i})
        userEvent.click(radioIngredient)

        const buttonSearch = (await screen.findByRole('button', {  name: /search/i}))
        userEvent.click(buttonSearch)

        const recipeChickenCongee = (await screen.findByRole('heading', {  name: /chicken congee/i}))
        expect(recipeChickenCongee).toBeInTheDocument()
    })

    test('Verifique se ao pesquisar por ingrediente as receitas são renderizadas', async () => {
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

    test('Verifique se ao pesquisar por letra as receitas são renderizadas', async () => {
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

        userEvent.type(inputSearch, 'C')

        const radioFirstLetter = (screen.getByRole('radio', {  name: /first letter/i}))
        userEvent.click(radioFirstLetter)

        const buttonSearch = (await screen.findByRole('button', {  name: /search/i}))
        userEvent.click(buttonSearch)
        
        const recipeChickenEnchilada = (await screen.findByRole('heading', {  name: /chicken enchilada casserole/i}))
        expect(recipeChickenEnchilada).toBeInTheDocument()
    })

    test('Verifique se ao pesquisar por ingrediente as receitas são renderizadas', async () => {
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

        userEvent.type(inputSearch, 'CC')

        const radioFirstLetter = (screen.getByRole('radio', {  name: /first letter/i}))
        userEvent.click(radioFirstLetter)

        const buttonSearch = (await screen.findByRole('button', {  name: /search/i}))
        const windowAlert = jest.spyOn(window, 'alert');
        userEvent.click(buttonSearch)

        
        expect(windowAlert).toHaveBeenCalledTimes(1)
    })

})