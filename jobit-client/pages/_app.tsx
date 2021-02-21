import { AppProps } from 'next/app';
import AuthState from '../context/auth/authState';
import JobState from '../context/job/jobState';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthState>
      <JobState>
        <Component {...pageProps} /> 
      </JobState>
    </AuthState>
  )
}

export default MyApp
