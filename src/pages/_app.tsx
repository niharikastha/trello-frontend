import { AppProps } from 'next/app';
import '../styles/globals.css'; 
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && router.pathname !== '/login' && router.pathname !== '/signup') {
      router.push('/login');
    }
  }, [router.pathname]);

  return (
      <Component {...pageProps} />
  );
}

export default MyApp;
