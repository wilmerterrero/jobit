import { AppProps } from 'next/app';
import AuthState from '../context/auth/authState';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthState>
      <Component {...pageProps} />
    </AuthState>
  )
}

export default MyApp
