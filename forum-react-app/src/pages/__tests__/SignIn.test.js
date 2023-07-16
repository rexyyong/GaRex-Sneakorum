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

    // test('shows validation message if username and/or password are empty', () => {
    //     const { getByTestId, queryByRole } = render(<SignIn />);

    //         // Mock the handleSubmit function to prevent form submission
    // const handleSubmitMock = jest.fn((event) => {
    //   event.preventDefault(); // Prevent actual form submission
    // });

    // // Replace the real handleSubmit function with the mock
    // SignIn.prototype.handleSubmit = handleSubmitMock;

    //     // // Empty the input fields
    //     // fireEvent.change(getByTestId('username-input'), { target: { value: '' } });
    //     // fireEvent.change(getByTestId('password-input'), { target: { value: '' } });

    //     // Submit the form
    //     fireEvent.submit(getByTestId('login-form'));

    //     // Check if the form is not being submitted (no fetch requests)
    //     expect(global.fetch).not.toHaveBeenCalled();

    //     expect(getByText('Please fill out this field')).toBeInTheDocument();

    // });

    test('does not show validation message if username and password are filled', () => {
        const { getByTestId, queryByRole } = render(<SignIn />);

        // Fill the input fields with valid data
        fireEvent.change(getByTestId('username-input'), { target: { value: 'testuser' } });
        fireEvent.change(getByTestId('password-input'), { target: { value: 'testpassword' } });

        // Submit the form
        fireEvent.click(getByTestId('login-button'));

        // Check if the validation message is not displayed
        expect(queryByRole('alert')).not.toBeInTheDocument();
    });

    // Add more tests for other component behavior and interactions if needed
});
