/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import VerificationPage from './pages/VerificationPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/provider/:id" element={<ProfilePage />} />
              <Route path="/verify" element={<VerificationPage />} />
              <Route path="/join" element={<AuthPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
