import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PointsProvider } from './context/PointsContext';
import { AuthPage } from './components/auth/AuthPage';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { ProfilePage } from './pages/ProfilePage';
import { GamesPage } from './pages/GamesPage';
import { WasteSortingGame } from './components/WasteSortingGame';
import SnakeLadder from './components/SnakeLadder';
import CarbonGame from './components/CarbonGame';
import {Leaderboard } from './pages/LeaderboardPage';
import { RedeemPage } from './pages/RedeemPage';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/auth" />;
}

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route 
        path="/auth" 
        element={user ? <Navigate to="/" /> : <AuthPage />} 
      />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/courses" 
        element={
          <ProtectedRoute>
            <CoursesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/challenges" 
        element={
          <ProtectedRoute>
            <ChallengesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/games" 
        element={
          <ProtectedRoute>
            <GamesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/redeem" 
        element={
          <ProtectedRoute>
            <RedeemPage />
          </ProtectedRoute>
        } 
      />
       <Route 
        path="/leader" 
        element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/games/waste-sorting" 
        element={
          <ProtectedRoute>
            <WasteSortingGame />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/games/snake-ladder" 
        element={
          <ProtectedRoute>
            <SnakeLadder />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/games/carbon-game" 
        element={
          <ProtectedRoute>
            <CarbonGame />
          </ProtectedRoute>
        } 
      />
     
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <PointsProvider>
          <AppRoutes />
        </PointsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;