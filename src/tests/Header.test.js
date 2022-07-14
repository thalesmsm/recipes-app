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
})