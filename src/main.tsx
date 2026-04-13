// ============================================================
//  src/main.tsx
//  Ponto de entrada da aplicação React
// ============================================================

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import porscheData from './data/porscheData';

// Import styles
import './styles/main.css';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ModelCard from './components/ModelCard';
import Dashboard from './components/Dashboard';
import StatBadge from './components/StatBadge';
import ProblemCard from './components/ProblemCard';
import FaqItem from './components/FaqItem';

// Import pages
import HomePage from './pages/HomePage';
import ModelsPage from './pages/ModelsPage';
import ModelDetailPage from './pages/ModelDetailPage';
import RegisterPage from './pages/RegisterPage';
import App from './App';

// Make components available globally for the app
(window as any).PORSCHE_DATA = porscheData;
(window as any).Navbar = Navbar;
(window as any).Footer = Footer;
(window as any).ModelCard = ModelCard;
(window as any).Dashboard = Dashboard;
(window as any).StatBadge = StatBadge;
(window as any).ProblemCard = ProblemCard;
(window as any).FaqItem = FaqItem;
(window as any).HomePage = HomePage;
(window as any).ModelsPage = ModelsPage;
(window as any).ModelDetailPage = ModelDetailPage;
(window as any).RegisterPage = RegisterPage;

// Mount React App
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(App));
}
