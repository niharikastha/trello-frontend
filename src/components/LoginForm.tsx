import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import trelloIcon from '../../public/trello-icon.png'; // Adjust the path if necessary

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // Basic validation for non-empty password
    return password.trim() !== '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Email and password are required.');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    if (!validateEmail(email)) {
      setError('Invalid email address.');
      setIsSubmitting(false);
      return;
    }

    // Password validation
    if (!validatePassword(password)) {
      setError('Password cannot be empty.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      alert('Login successful!');
      router.push('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <Image src={trelloIcon} alt="Trello Icon" width={140} height={120} className="mx-auto mb-4" />
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        
        <label className="block mb-4">
          <span className="text-gray-700 text-sm font-medium">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border-gray-300 shadow-sm bg-gray-50 text-black placeholder-gray-400 pl-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </label>
        
        <label className="block mb-6">
          <span className="text-gray-700 text-sm font-medium">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border-gray-300 shadow-sm bg-gray-50 text-black placeholder-gray-400 pl-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
        </label>
        
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
