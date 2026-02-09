import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

function Layout() {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(`/${path}`);
    };

    return (
        <>
            <nav className="nav-bar">
                <ul className="nav-tabs">
                    <li className="nav-tab">
                        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-tab">
                        <Link to="/forms" className={`nav-link ${isActive('forms') ? 'active' : ''}`}>
                            Forms
                        </Link>
                    </li>
                    <li className="nav-tab">
                        <Link to="/profile" className={`nav-link ${isActive('profile') ? 'active' : ''}`}>
                            Profile
                        </Link>
                    </li>
                    <li className="nav-tab">
                        <Link to="/settings" className={`nav-link ${isActive('settings') ? 'active' : ''}`}>
                            Settings
                        </Link>
                    </li>
                    <li className="nav-tab">
                        <Link to="/dashboard" className={`nav-link ${isActive('dashboard') ? 'active' : ''}`}>
                            Dashboard
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="content-wrapper">
                {/* Page Content */}
                <Outlet />
            </div>
        </>
    );
}

export default Layout;
