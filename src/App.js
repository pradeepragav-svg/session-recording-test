import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import FormsPage from './components/FormsPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import DashboardPage from './components/DashboardPage';

function App() {
    return (
        <HashRouter>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="forms" element={<FormsPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="dashboard" element={<DashboardPage />} />
                    </Route>
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
