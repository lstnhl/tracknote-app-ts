import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Header from 'components/Header/Header';
import LoginPage from 'pages/LoginPage';
import ProtectedRoute from 'routes/ProtectedRoute';
import MainPage from 'pages/MainPage';
import AlbumPage from 'pages/AlbumPage/AlbumPage';
import CheckAuth from 'components/CheckAuth';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route element={<CheckAuth />}>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route index element={<MainPage />} />
              <Route path="/album/:id" element={<AlbumPage />} />
              <Route path="/profile" element={<h1>Profile</h1>} />
              <Route path="/another" element={<h1>Another</h1>} />
              <Route path="*" element={<h1>404</h1>} />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
