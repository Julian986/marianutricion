import './App.css'
import Home from './pages/Home';
import { Analytics } from '@vercel/analytics/react';
import GoogleAnalytics from './components/GoogleAnalytics';

function App() {
  return (
    <>
      <GoogleAnalytics />
      <Home />
      <Analytics /> 
    </>
  );
}

export default App
