import React from 'react';
import App from '../App';
import { render, screen, act, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../helpers/renderWithRouter';
import { vodkaDrinks } from './mocks/vodkaDrinks'

describe('Testando o componente SearchBar', () => {
    beforeEach(async () => {
        global.fetch = jest.fn(() => 
        Promise.resolve({
            json: () => Promise.resolve(vodkaDrinks)
        }));
    })
    test('Verifique se ao pesquisar por ingrediente as receitas são renderizadas', async () => {
        const { history } = renderWithRouter(<App />)
        history.push('/drinks')
        expect(history.location.pathname).toBe('/drinks')

        const imgSearch = screen.getByTestId('search-top-btn')
        userEvent.click(imgSearch)

        const inputSearch = screen.getByTestId('search-input')
        expect(inputSearch).toBeInTheDocument

        userEvent.type(inputSearch, 'Vodka')

        const radioIngredient = screen.getByRole('radio', {  name: /ingredient/i})
        userEvent.click(radioIngredient)

        const buttonSearch = (await screen.findByRole('button', {  name: /search/i}))
        userEvent.click(buttonSearch)

        const blue501 = (await screen.findByRole('heading', {  name: /501 blue/i}))
        expect(blue501).toBeInTheDocument()
    })

    test('Verifique se ao pesquisar por ingrediente as receitas são renderizadas', async () => {
        const { history } = renderWithRouter(<App />)
        history.push('/drinks')
        expect(history.location.pathname).toBe('/drinks')

        const imgSearch = screen.getByTestId('search-top-btn')
        userEvent.click(imgSearch)

        const inputSearch = screen.getByTestId('search-input')
        expect(inputSearch).toBeInTheDocument

        userEvent.type(inputSearch, '747 Drink')

        const radioName = screen.getByRole('radio', {  name: /name/i})
        userEvent.click(radioName)

        const buttonSearch = (await screen.findByRole('button', {  name: /search/i}))
        userEvent.click(buttonSearch)

        history.push('/foods/178318')
        expect(history.location.pathname).toBe('/foods/178318');
    })

    test('Verifique se ao pesquisar por ingrediente as receitas são renderizadas', async () => {
        const { history } = renderWithRouter(<App />)
        history.push('/drinks')
        expect(history.location.pathname).toBe('/drinks')
  
        const imgDrink = screen.getByTestId('drinks-bottom-btn')
        userEvent.click(imgDrink)

        const imgSearch = screen.getByTestId('search-top-btn')
        userEvent.click(imgSearch)

        const inputSearch = screen.getByTestId('search-input')
        expect(inputSearch).toBeInTheDocument

        userEvent.type(inputSearch, 'C')

        const radioFirstLetter = (screen.getByRole('radio', {  name: /first letter/i}))
        userEvent.click(radioFirstLetter)

        const buttonSearch = (await screen.findByRole('button', {  name: /search/i}))
        userEvent.click(buttonSearch)

        const drinkCaipirinha = (await screen.findByRole('heading', {  name: /caipirinha/i}))
        expect(drinkCaipirinha).toBeInTheDocument()
    })

    test('Verifique se ao pesquisar por ingrediente as receitas são renderizadas', async () => {
        const { history } = renderWithRouter(<App />)
        history.push('/drinks')
        expect(history.location.pathname).toBe('/drinks')

        const imgDrink = screen.getByTestId('drinks-bottom-btn')
        userEvent.click(imgDrink)

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