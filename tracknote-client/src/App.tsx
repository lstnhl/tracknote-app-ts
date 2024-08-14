import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Header from 'components/Header/Header';
import LoginPage from 'pages/LoginPage';
import ProtectedRoute from 'routes/ProtectedRoute';
import MainPage from 'pages/MainPage';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route index element={<MainPage />} />
            <Route path="/profile" element={<h1>Profile</h1>} />
            <Route path="/another" element={<h1>Another</h1>} />
            <Route path="*" element={<h1>404</h1>} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
