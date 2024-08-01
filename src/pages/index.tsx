import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        
        {isLogin ? <LoginForm /> : <SignupForm />}

        <div className="mt-6 text-center">
          <button
            onClick={toggleForm}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>
        </div>
    </main>
  );
};

export default Home;
