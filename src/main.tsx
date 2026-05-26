// ============================================================
//  src/main.tsx
//  Ponto de entrada da aplicação React
// ============================================================

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import porscheData from './data/porscheData';
import type { PorscheModel } from './types/porsche';

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
import AccountPage from './pages/AccountPage';
import App from './App';

// Make components available globally for the app
window.PORSCHE_DATA = porscheData as unknown as PorscheModel[];
window.Navbar = Navbar;
window.Footer = Footer;
window.ModelCard = ModelCard;
window.Dashboard = Dashboard;
window.StatBadge = StatBadge;
window.ProblemCard = ProblemCard;
window.FaqItem = FaqItem;
window.HomePage = HomePage;
window.ModelsPage = ModelsPage;
window.ModelDetailPage = ModelDetailPage;
window.RegisterPage = RegisterPage;
window.AccountPage = AccountPage;

// Mount React App
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(App));
}
