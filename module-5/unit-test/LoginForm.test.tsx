import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import { useRouter } from 'next/router';

// Mock the useRouter hook from next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('LoginForm', () => {
  it('renders the login form', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('allows the user to input email and password', () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password');
  });

  it('submits the form and handles successful login', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    mockedAxios.post.mockResolvedValueOnce({
      data: { access_token: 'fake-token' },
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://api.escuelajs.co/api/v1/auth/login',
        {
          email: 'test@example.com',
          password: 'password',
        }
      );
    });

    await waitFor(() => {
      expect(document.cookie).toContain('auth-token=fake-token');
      expect(pushMock).toHaveBeenCalledWith('/homepage');
    });
  });

  it('displays an error message on login failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://api.escuelajs.co/api/v1/auth/login',
        {
          email: 'test@example.com',
          password: 'wrongpassword',
        }
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });
});