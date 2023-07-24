import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../SignIn';

// Mock the react-router-dom's useNavigate hook
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(() => jest.fn()),
}));

describe('SignIn Component', () => {

    beforeEach(() => {
        // Reset the fetch mock before each test
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ success: true }),
            })
        );
    });

    afterEach(() => {
        // Restore the original fetch implementation after each test
        global.fetch.mockRestore();
    });


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

    test('shows validation message for empty username and password fields on form submit', () => {
        const { getByTestId, getByText } = render(<SignIn />);

        // Submit the form without filling in the fields
        fireEvent.submit(getByTestId('login-form'));

        // Check if the validation message for the username field is displayed
        expect(getByText('Please fill in the username field.')).toBeInTheDocument();

        // Check if the validation message for the password field is displayed
        expect(getByText('Please fill in the password field.')).toBeInTheDocument();
    });

    test('does not show validation message when both username and password are filled on form submit', () => {
        const { getByTestId, getByPlaceholderText, queryByText } = render(<SignIn />);

        // Fill the input fields with valid data
        fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'testpassword' } });

        // Submit the form
        fireEvent.submit(getByTestId('login-form'));

        // Check that the validation messages are not displayed
        expect(queryByText('Please fill in the username field.')).toBeNull();
        expect(queryByText('Please fill in the password field.')).toBeNull();
    });

    // Add more tests for other component behavior and interactions if needed
});
