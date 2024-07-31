import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const capitalizeWords = (str: string) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!username || !email || !password || !confirmPassword) {
      setError('Username, email, password, and confirm password are required.');
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email address.');
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.');
      setIsSubmitting(false);
      return;
    }

    try {
      const formattedUsername = capitalizeWords(username);
      await axios.post('http://localhost:5000/api/auth/signup', { username: formattedUsername, email, password, confirmPassword });
      alert('Signup successful!');
      router.push('/login');
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Signup failed. Please check your details.');
        alert('Signup failed. Please check your details.');
      }
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
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-600"
            placeholder="User name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-600"
            placeholder="Your email"
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
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-600"
            placeholder="Confirm Password"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </button>
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <a href="#" onClick={() => router.push('/login')} className="text-purple-600">Log in.</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
