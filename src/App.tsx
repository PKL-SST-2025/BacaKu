import { Component } from 'solid-js';
import { Router, Route, Navigate } from '@solidjs/router';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ForgotPasswordResetPage from './pages/ForgotPasswordResetPage';
import HomePage from './pages/HomePage';
import KatalogPage from './pages/KatalogPage';
import KatalogDetailPage from './pages/KatalogDetailPage';
import RiwayatPage from './pages/RiwayatPage';
import RiwayatDetailPage from './pages/RiwayatDetailPage';
import ProfilePage from './pages/ProfilePage';
import SettingPage from './pages/SettingPage';
import ManajemenBukuPage from './pages/ManajemenBukuPage';
import ManajemenBukuEditPage from './pages/ManajemenBukuEditPage';
import ManajemenAnggotaPage from './pages/ManajemenAnggotaPage';
import ManajemenAnggotaDetailPage from './pages/ManajemenAnggotaDetailPage';
import ManajemenAnggotaEditPage from './pages/ManajemenAnggotaEditPage';
import JadwalPengembalianBukuPage from './pages/JadwalPengembalianBukuPage';

import HelpPage from './pages/HelpPage';

const App: Component = () => {
  return (
    <Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/forgot-password/reset" component={ForgotPasswordResetPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/katalog" component={KatalogPage} />
      <Route path="/katalog/:id" component={KatalogDetailPage} />
      <Route path="/riwayat" component={RiwayatPage} />
      <Route path="/riwayat/:id" component={RiwayatDetailPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/settings" component={SettingPage} />
      <Route path="/kelola-buku" component={ManajemenBukuPage} />
      <Route path="/kelola-buku/:id" component={ManajemenBukuEditPage} />
      <Route path="/kelola-anggota" component={ManajemenAnggotaPage} />
      <Route path="/kelola-anggota/detail" component={ManajemenAnggotaDetailPage} />
      <Route path="/kelola-anggota/edit" component={ManajemenAnggotaEditPage} />
      <Route path="/jadwal-pengembalian-buku" component={JadwalPengembalianBukuPage} />
      <Route path="/help" component={HelpPage} />
      <Route path="/" component={() => <Navigate href="/login" />} />
    </Router>
  );
};

export default App;
