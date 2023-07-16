import React from 'react';
import { render } from '@testing-library/react';
import SignIn from '../SignIn';

// Mock the react-router-dom's useNavigate hook
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(() => jest.fn()),
}));

describe('SignIn Component', () => {
    test('renders SignIn component', () => {
        const { getByLabelText, getByText, getByTestId, getByPlaceholderText } = render(<SignIn />);

        // Check if key elements are present in the rendered output
        expect(getByText("Welcome to Garex's Sneakorum!")).toBeInTheDocument();
        expect(getByTestId('login-button')).toBeInTheDocument();
        expect(getByPlaceholderText('Username')).toBeInTheDocument();
        expect(getByPlaceholderText('Password')).toBeInTheDocument();
        expect(getByLabelText('Remember me')).toBeInTheDocument(); // Assuming the checkbox has a label
        expect(getByText("Don't have an account?")).toBeInTheDocument();
        expect(getByText('Register here')).toBeInTheDocument();

        // Query the login button by its id attribute
        expect(getByTestId('login-button')).toBeInTheDocument();
    });

    // Add more tests for other component behavior and interactions if needed
});
