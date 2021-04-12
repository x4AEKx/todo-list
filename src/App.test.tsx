import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

describe('App component', () => {
    test('renders ReactJS task', () => {
        render(<App/>);
        const taskElement = screen.getByText(/ReactJS/i);
        expect(taskElement).toBeInTheDocument();
    });
    test('renders HTML&CSS task', () => {
        render(<App/>);
        const taskElement = screen.getByText(/HTML&CSS/i);
        expect(taskElement).toBeInTheDocument();
    });
    test('renders GraphQL task', () => {
        render(<App/>);
        const taskElement = screen.getByText(/GraphQL/i);
        expect(taskElement).toBeInTheDocument();
    });
})


