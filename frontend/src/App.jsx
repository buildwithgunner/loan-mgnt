import React, { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ChatWidget from './components/ChatWidget.jsx'

import Home from './pages/Home.jsx'
import ContactPage from './pages/ContactPage.jsx'
import FixAndFlip from './pages/loans/FixAndFlip.jsx'
import NewConstruction from './pages/loans/NewConstruction.jsx'
import CashOutRefinance from './pages/loans/CashOutRefinance.jsx'
import LoanConsulting from './pages/services/LoanConsulting.jsx'
import LoanServicing from './pages/services/LoanServicing.jsx'
import ReferralProgram from './pages/services/ReferralProgram.jsx'
import InvestmentOpportunities from './pages/services/InvestmentOpportunities.jsx'

import TeamSection from './pages/about/TeamSection.jsx'
import Testimonials from './pages/about/Testimonials.jsx'
import LoanClosings from './pages/about/LoanClosings.jsx'
import AsSeenInNews from './pages/about/AsSeenInNews.jsx'
import ConventionalLoans from './pages/loans/ConventionalLoans.jsx'
import MobileHomeLoans from './pages/loans/MobileHomeLoans.jsx'
import CapitalMarketsLoans from './pages/loans/CapitalMarketsLoans.jsx'
import FixAndLeasePage from './pages/loans/FixAndLeasePage.jsx'
import Apply from './pages/Apply.jsx'
import {
  FindUs, InvestorPortal, PrivacyPolicy, TermsAndConditions
} from './pages/FooterPages.jsx'
import AreasWeServe from './pages/AreasWeServe.jsx'
import WebStories from './pages/WebStories.jsx'
import Blog from './pages/Blog.jsx'
import ConventionalLoanApp from './pages/ConventionalLoanApp.jsx'
import UserDashboard from './pages/dashboard/user/index.jsx'
import AdminDashboard from './pages/dashboard/admin/index.jsx'
import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import AdminLogin from './pages/auth/AdminLogin.jsx'
import AdminSignup from './pages/auth/AdminSignup.jsx'

export function navigateTo(url) {
  window.history.pushState({}, '', url);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}

const STANDALONE_ROUTES = ['/dashboard', '/admin', '/admin/applications', '/admin/disapproved', '/admin/users', '/admin/leads', '/admin/codes', '/admin/blog', '/admin/analytics', '/admin/messages', '/admin/settings', '/login', '/signup', '/apply', '/admin/login', '/admin/signup'];

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
  '/admin/disapproved': <AdminDashboard />,
  '/admin/users': <AdminDashboard />,
  '/admin/leads': <AdminDashboard />,
  '/admin/codes': <AdminDashboard />,
  '/admin/blog': <AdminDashboard />,
  '/admin/analytics': <AdminDashboard />,
  '/admin/messages': <AdminDashboard />,
  '/admin/settings': <AdminDashboard />,
  '/login': <Login />,
  '/signup': <Signup />,
  '/admin/login': <AdminLogin />,
  '/admin/signup': <AdminSignup />,
};

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  useEffect(() => {
    const onLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  const path = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');
  const Page = routes[path] ?? <Home />;
  const isStandalone = STANDALONE_ROUTES.includes(path);

  if (isStandalone) {
    return (
      <ThemeProvider>
        {Page}
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen relative overflow-hidden transition-colors duration-300">
        <Navbar />
        <main>
          {Page}
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </ThemeProvider>
  )
}

export default App
