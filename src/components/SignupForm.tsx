import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import trelloIcon from '../../public/trello-icon.png'; // Adjust the path if necessary

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const validatePassword = (password: string) => {
    // Regex for password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Basic validation
    if (!email || !password || !confirmPassword) {
      setError('Email, password, and confirm password are required.');
      setIsSubmitting(false);
      return;
    }

    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email address.');
      setIsSubmitting(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.');
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/signup', { email, password, confirmPassword });
      alert('Signup successful!');
      router.push('/');
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
    <div className="flex flex-col items-center justify-center ">
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
        
        <label className="block mb-4">
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

        <label className="block mb-6">
          <span className="text-gray-700 text-sm font-medium">Confirm Password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full border-gray-300 shadow-sm bg-gray-50 text-black placeholder-gray-400 pl-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Confirm your password"
            required
          />
        </label>
        
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing up...' : 'Signup'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
