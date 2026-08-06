import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import ChatWidget from './components/ChatWidget.jsx';
import Maintenance from './components/Maintenance.jsx';
import { MAINTENANCE_MODE } from './config.js';

// Page imports
import Home from './pages/home.jsx';
import ContactPage from './pages/contact-page.jsx';
import FixAndFlip from './pages/loans/fix-and-flip.jsx';
import NewConstruction from './pages/loans/new-construction.jsx';
import CashOutRefinance from './pages/loans/cash-out-refinance.jsx';
import LoanConsulting from './pages/services/loan-consulting.jsx';
import LoanServicing from './pages/services/loan-servicing.jsx';
import ReferralProgram from './pages/services/referral-program.jsx';
import InvestmentOpportunities from './pages/services/investment-opportunities.jsx';
import TeamSection from './pages/about/team-section.jsx';
import Testimonials from './pages/about/testimonials.jsx';
import LoanClosings from './pages/about/loan-closings.jsx';
import AsSeenInNews from './pages/about/as-seen-in-news.jsx';
import ConventionalLoans from './pages/loans/conventional-loans.jsx';
import MobileHomeLoans from './pages/loans/mobile-home-loans.jsx';
import CapitalMarketsLoans from "./pages/loans/capital-markets-loans.jsx";
import FixAndLeasePage from './pages/loans/fix-and-lease.jsx';
import BusinessGrants from './pages/loans/business-grants.jsx';
import Apply from './pages/apply.jsx';
import { FindUs, InvestorPortal, PrivacyPolicy, TermsAndConditions } from './pages/FooterPages.jsx';
import AreasWeServe from './pages/areas-we-serve.jsx';
import WebStories from './pages/web-stories.jsx';
import Blog from './pages/blog.jsx';
import ConventionalLoanApp from './pages/conventional-loan-app.jsx';
import UserDashboard from './pages/dashboard/user/index.jsx';
import AdminDashboard from './pages/dashboard/admin/index.jsx';
import Login from './pages/auth/login.jsx';
import Signup from './pages/auth/signup.jsx';
import AdminLogin from './pages/auth/admin-login.jsx';
import AdminSignup from './pages/auth/admin-signup.jsx';
import ForgotPassword from './pages/auth/forgot-password.jsx';
import PersonalLoans from './pages/loans/personal-loans.jsx';
import OtherLoans from './pages/loans/other-loans.jsx';

export function navigateTo(url) {
  window.history.pushState({}, '', url);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}

const STANDALONE_ROUTES = [
  '/dashboard', '/admin', '/admin/applications', '/admin/funding', '/admin/disapproved',
  '/admin/users', '/admin/documents', '/admin/leads', '/admin/codes', '/admin/blog',
  '/admin/analytics', '/admin/messages', '/admin/notifications', '/admin/settings',
  '/login', '/signup', '/apply', '/admin/login', '/admin/signup', '/forgot-password'
];

const routes = {
  '/': <Home />,
  '/contact': <ContactPage />,
  '/loans/fix-and-flip': <FixAndFlip />,
  '/loans/new-construction': <NewConstruction />,
  '/loans/cash-out-refinance': <CashOutRefinance />,
  '/loans/fix-and-lease': <FixAndLeasePage />,
  '/loans/conventional': <ConventionalLoans />,
  '/loans/mobile-home': <MobileHomeLoans />,
  '/loans/capital-markets': <CapitalMarketsLoans />,
  '/business-grants': <BusinessGrants />,
  '/loans/personal': <PersonalLoans />,
  '/loans/other': <OtherLoans />,
  '/forgot-password': <ForgotPassword />,
  '/services/loan-consulting': <LoanConsulting />,
  '/services/loan-servicing': <LoanServicing />,
  '/services/referral-program': <ReferralProgram />,
  '/services/investment-opportunities': <InvestmentOpportunities />,
  '/about/team': <TeamSection />,
  '/about/testimonials': <Testimonials />,
  '/about/loan-closings': <LoanClosings />,
  '/about/news': <AsSeenInNews />,
  '/apply': <Signup />,
  '/blog': <Blog />,
  '/web-stories': <WebStories />,
  '/conventional-loan-app': <ConventionalLoanApp />,
  '/areas-we-serve': <AreasWeServe />,
  '/find-us': <FindUs />,
  '/investor-portal': <InvestorPortal />,
  '/privacy': <PrivacyPolicy />,
  '/terms-and-conditions': <TermsAndConditions />,
  '/dashboard': <UserDashboard />,
  '/admin': <AdminDashboard />,
  '/admin/applications': <AdminDashboard />,
  '/admin/funding': <AdminDashboard />,
  '/admin/disapproved': <AdminDashboard />,
  '/admin/users': <AdminDashboard />,
  '/admin/documents': <AdminDashboard />,
  '/admin/leads': <AdminDashboard />,
  '/admin/codes': <AdminDashboard />,
  '/admin/blog': <AdminDashboard />,
  '/admin/analytics': <AdminDashboard />,
  '/admin/messages': <AdminDashboard />,
  '/admin/notifications': <AdminDashboard />,
  '/admin/settings': <AdminDashboard />,
  '/login': <Login />,
  '/signup': <Signup />,
  '/admin/login': <AdminLogin />,
  '/admin/signup': <AdminSignup />
};

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [maintenance, setMaintenance] = useState(false);

  // Fetch maintenance flag from backend on initial load
  useEffect(() => {
    fetch('https://api.blackwolvesacquisitionllc.com/api/maintenance')
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => setMaintenance(!!data?.maintenance))
      .catch(() => setMaintenance(false));
  }, []);

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  const path = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');
  const Page = routes[path] ?? <Home />;
  const isStandalone = STANDALONE_ROUTES.includes(path);

  // Show maintenance screen if flag is true (takes precedence)
  if (maintenance) {
    return (
      <ThemeProvider>
        <Maintenance />
      </ThemeProvider>
    );
  }

  if (MAINTENANCE_MODE) {
    return (
      <ThemeProvider>
        <Maintenance />
      </ThemeProvider>
    );
  }

  if (isStandalone) {
    return (
      <ThemeProvider>
        <ErrorBoundary>{Page}</ErrorBoundary>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div className="min-h-screen relative overflow-hidden transition-colors duration-300">
          <Navbar />
          <main>{Page}</main>
          <Footer />
          <ChatWidget />
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;

