import React from 'react';
import Foods from '../pages/Foods';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testando o componente Header', () => {
    test('Verifique se o header é renderizado corretamente', () => {
        renderWithRouter(<Foods />);
        const imgProfile = screen.getByTestId('profile-top-btn')
        const title = screen.getByTestId('page-title')
        const imgSearch = screen.getByTestId('search-top-btn')

        expect(imgProfile).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(imgSearch).toBeInTheDocument()
    })

    test('Verifique se ao clicar no icone de pesquisa o input aparece', () => {
        renderWithRouter(<Foods />);
        const imgSearch = screen.getByTestId('search-top-btn')
        userEvent.click(imgSearch)
        
        const inputSearch = screen.getByTestId('search-input')
        expect(inputSearch).toBeInTheDocument
    })

    test('Verifique se contém options no input de pesquisa', () => {
        renderWithRouter(<Foods />);
        const imgSearch = screen.getByTestId('search-top-btn')
        userEvent.click(imgSearch)

        const optionIngredient = screen.getByRole('radio', {  name: /ingredient/i})
        expect(optionIngredient).toBeInTheDocument
        
        const optionName = screen.getByRole('radio', {  name: /name/i})
        expect(optionName).toBeInTheDocument()
        
        const optionFirstLetter =  screen.getByRole('radio', {  name: /first letter/i})
        expect(optionFirstLetter).toBeInTheDocument()
    })
})