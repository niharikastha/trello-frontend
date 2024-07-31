import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.trim() !== '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!email || !password) {
      setError('Email and password are required.');
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email address.');
      setIsSubmitting(false);
      return;
    }

    if (!validatePassword(password)) {
      setError('Password cannot be empty.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.user.username);
      alert('Login successful!');
      router.push('/task');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-gray-200 to-gray-500">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6 text-black">
            Welcome to <span className="text-purple-600">Workflo!</span>
          </h1>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-600"
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-600"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <a href="#" onClick={() => router.push('/signup')} className="text-purple-600">Sign up.</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
