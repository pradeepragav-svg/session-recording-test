const { useState, useEffect } = React;
const { BrowserRouter, Routes, Route, Link, useLocation, Outlet } = window.ReactRouterDOM;

// Import components (will be loaded from separate files)
// Since we're using Babel standalone, we'll define them in separate files and load them

// Main App Component
function App() {
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}

// Layout Component with Navigation
function Layout() {
    const location = useLocation();
    const [statusStates, setStatusStates] = useState(window.testEnv.statusStates);

    useEffect(() => {
        const handleStatusUpdate = (event) => {
            setStatusStates({ ...window.testEnv.statusStates });
        };

        window.addEventListener('status-update', handleStatusUpdate);
        return () => window.removeEventListener('status-update', handleStatusUpdate);
    }, []);

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
                {/* Status Bar */}
                <div className="status-bar">
                    <div className="status-grid">
                        <div className="status-item">
                            <div className={`status-indicator ${statusStates.embed.status}`}></div>
                            <span className="status-label">Embed & EventBus:</span>
                            <span className="status-message">{statusStates.embed.message}</span>
                        </div>
                        <div className="status-item">
                            <div className={`status-indicator ${statusStates.ce.status}`}></div>
                            <span className="status-label">Customization Engine:</span>
                            <span className="status-message">{statusStates.ce.message}</span>
                        </div>
                        <div className="status-item">
                            <div className={`status-indicator ${statusStates.sr.status}`}></div>
                            <span className="status-label">Session Recorder:</span>
                            <span className="status-message">{statusStates.sr.message}</span>
                        </div>
                        <div className="status-item">
                            <div className={`status-indicator ${statusStates.evaluator.status}`}></div>
                            <span className="status-label">Rules Evaluator:</span>
                            <span className="status-message">{statusStates.evaluator.message}</span>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <Outlet />
            </div>
        </>
    );
}

// Home Page Component
function HomePage() {
    const [logs, setLogs] = useState([...window.testEnv.logs]);

    useEffect(() => {
        const handleLog = (event) => {
            setLogs(prevLogs => [...prevLogs, event.detail]);
        };

        window.addEventListener('test-log', handleLog);
        return () => window.removeEventListener('test-log', handleLog);
    }, []);

    const clearLogs = () => {
        window.testEnv.logs = [];
        setLogs([]);
        addLog('Console cleared', 'info');
    };

    return (
        <div>
            <h1>Session Recorder + Customization Engine Integration Test</h1>

            <div className="instructions">
                <h3>📋 Quick Start Instructions</h3>
                <ol>
                    <li>Ensure modules are loaded (check status indicators above)</li>
                    <li>Click "Initialize Test" to create test rules</li>
                    <li>Click "Evaluate Rules" or "Evaluate Mock Rules" to trigger evaluation</li>
                    <li>Check console logs below and browser DevTools for detailed output</li>
                    <li>Navigate between tabs to test URL-based rule evaluation</li>
                </ol>
            </div>

            <h2>Test Controls</h2>
            <div className="controls">
                <button className="btn-primary" onClick={() => window.testUtils.initializeTest()}>
                    Initialize Test
                </button>
                <button className="btn-success" onClick={() => window.testUtils.evaluateRules()}>
                    Evaluate Rules
                </button>
                <button className="btn-info" onClick={() => window.testUtils.evaluateMockRules()}>
                    Evaluate Mock Rules
                </button>
                <button className="btn-secondary" onClick={() => window.testUtils.logCurrentState()}>
                    Log Current State
                </button>
                <button className="btn-danger" onClick={clearLogs}>
                    Clear Console
                </button>
            </div>

            <h2>Console Output</h2>
            <div className="console-output">
                {logs.map((log, index) => (
                    <div key={index} className={`log-entry ${log.type}`}>
                        <span className="log-timestamp">[{log.timestamp}]</span>
                        {log.message}
                    </div>
                ))}
                {logs.length === 0 && (
                    <div className="log-entry info">Console is empty. Run tests to see output.</div>
                )}
            </div>

            <div className="test-content">
                <h3>Test Content Area</h3>
                <p>Current URL: <code>{window.location.href}</code></p>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Test input field (interaction will be recorded)"
                    style={{ maxWidth: '500px' }}
                />
            </div>
        </div>
    );
}

// Forms Page Component
function FormsPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        ssn: '',
        password: '',
        creditCard: '',
        gender: '',
        interests: [],
        country: '',
        bio: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                interests: checked
                    ? [...prev.interests, value]
                    : prev.interests.filter(i => i !== value)
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addLog('Form submitted (check recorded events for masking)', 'success');
        console.log('Form data:', formData);
    };

    return (
        <div>
            <h1>Forms Testing - PII Masking</h1>

            <div className="card">
                <div className="card-header">Test various input types for PII masking</div>
                <div className="card-body">
                    <p>
                        This page tests different form input types to verify PII masking.
                        All sensitive data (SSN, credit card, password) should be masked in recordings.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid-2">
                    <div className="form-group">
                        <label className="form-label">Full Name (text)</label>
                        <input
                            type="text"
                            name="name"
                            className="form-input"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email (email)</label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">SSN (should be masked) ⚠️</label>
                        <input
                            type="text"
                            name="ssn"
                            className="form-input"
                            placeholder="123-45-6789"
                            value={formData.ssn}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password (always masked) 🔒</label>
                        <input
                            type="password"
                            name="password"
                            className="form-input"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Credit Card (should be masked) ⚠️</label>
                        <input
                            type="text"
                            name="creditCard"
                            className="form-input"
                            placeholder="4111 1111 1111 1111"
                            value={formData.creditCard}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Country</label>
                        <select
                            name="country"
                            className="form-select"
                            value={formData.country}
                            onChange={handleChange}
                        >
                            <option value="">Select...</option>
                            <option value="us">United States</option>
                            <option value="uk">United Kingdom</option>
                            <option value="in">India</option>
                            <option value="ca">Canada</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Gender (radio buttons)</label>
                    <div>
                        <label className="form-check-label">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                className="form-radio"
                                checked={formData.gender === 'male'}
                                onChange={handleChange}
                            />
                            Male
                        </label>
                        <label className="form-check-label">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                className="form-radio"
                                checked={formData.gender === 'female'}
                                onChange={handleChange}
                            />
                            Female
                        </label>
                        <label className="form-check-label">
                            <input
                                type="radio"
                                name="gender"
                                value="other"
                                className="form-radio"
                                checked={formData.gender === 'other'}
                                onChange={handleChange}
                            />
                            Other
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Interests (checkboxes)</label>
                    <div>
                        <label className="form-check-label">
                            <input
                                type="checkbox"
                                name="interests"
                                value="coding"
                                className="form-checkbox"
                                checked={formData.interests.includes('coding')}
                                onChange={handleChange}
                            />
                            Coding
                        </label>
                        <label className="form-check-label">
                            <input
                                type="checkbox"
                                name="interests"
                                value="reading"
                                className="form-checkbox"
                                checked={formData.interests.includes('reading')}
                                onChange={handleChange}
                            />
                            Reading
                        </label>
                        <label className="form-check-label">
                            <input
                                type="checkbox"
                                name="interests"
                                value="music"
                                className="form-checkbox"
                                checked={formData.interests.includes('music')}
                                onChange={handleChange}
                            />
                            Music
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Bio (textarea)</label>
                    <textarea
                        name="bio"
                        className="form-textarea"
                        placeholder="Tell us about yourself..."
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </div>

                <div className="controls">
                    <button type="submit" className="btn-primary">Submit Form</button>
                    <button type="button" className="btn-secondary" onClick={() => setFormData({
                        name: '',
                        email: '',
                        ssn: '',
                        password: '',
                        creditCard: '',
                        gender: '',
                        interests: [],
                        country: '',
                        bio: ''
                    })}>
                        Reset Form
                    </button>
                </div>
            </form>
        </div>
    );
}

// Profile Page Component
function ProfilePage() {
    const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
    const [counter, setCounter] = useState(0);
    const [timestamp, setTimestamp] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimestamp(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const addItem = () => {
        setItems([...items, `Item ${items.length + 1}`]);
        addLog(`Added Item ${items.length + 1} (mutation triggered)`, 'info');
    };

    const removeItem = (index) => {
        const removed = items[index];
        setItems(items.filter((_, i) => i !== index));
        addLog(`Removed ${removed} (mutation triggered)`, 'info');
    };

    return (
        <div>
            <h1>Profile - Dynamic Content Testing</h1>

            <div className="card">
                <div className="card-header">Test DOM mutations and dynamic content</div>
                <div className="card-body">
                    <p>
                        This page tests dynamic content changes to verify mutation recording.
                        All DOM additions, removals, and text changes should be captured.
                    </p>
                </div>
            </div>

            <h2>Auto-Updating Timestamp</h2>
            <div className="card">
                <div className="card-body">
                    <p style={{ fontSize: '24px', color: '#667eea', fontWeight: 600 }}>
                        Current Time: {timestamp}
                    </p>
                    <p className="text-muted">This updates every second, triggering text mutations</p>
                </div>
            </div>

            <h2>Dynamic Item List</h2>
            <div className="controls">
                <button className="btn-success" onClick={addItem}>Add Item</button>
                <button className="btn-info" onClick={() => setCounter(counter + 1)}>
                    Increment Counter ({counter})
                </button>
            </div>

            <div style={{ margin: '20px 0' }}>
                {items.map((item, index) => (
                    <div key={index} className="dynamic-item">
                        <span>{item}</span>
                        <button className="btn-danger" onClick={() => removeItem(index)}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="counter-display">
                <span>Counter Value:</span>
                <span className="counter-value">{counter}</span>
            </div>

            <div className="card mt-20">
                <div className="card-header">Mutation Stats</div>
                <div className="card-body">
                    <p>Total Items: {items.length}</p>
                    <p>Counter Value: {counter}</p>
                    <p>Check console for mutation logs from Session Recorder</p>
                </div>
            </div>
        </div>
    );
}

// Settings Page Component
function SettingsPage() {
    const [storageItems, setStorageItems] = useState({});
    const [customKey, setCustomKey] = useState('');
    const [customValue, setCustomValue] = useState('');

    const refreshStorage = () => {
        const items = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            items[key] = localStorage.getItem(key);
        }
        setStorageItems(items);
    };

    useEffect(() => {
        refreshStorage();
    }, []);

    const setTestSr = () => {
        localStorage.setItem('test_sr', '1');
        addLog('Set localStorage.test_sr = 1 (may trigger rule 3)', 'success');
        refreshStorage();
        // Trigger rule evaluation
        window.testUtils.evaluateMockRules();
    };

    const clearTestSr = () => {
        localStorage.removeItem('test_sr');
        addLog('Cleared localStorage.test_sr (may stop recording)', 'info');
        refreshStorage();
        // Trigger rule evaluation
        window.testUtils.evaluateMockRules();
    };

    const setCustom = () => {
        if (customKey) {
            localStorage.setItem(customKey, customValue);
            addLog(`Set localStorage.${customKey} = "${customValue}"`, 'success');
            refreshStorage();
            setCustomKey('');
            setCustomValue('');
        }
    };

    const clearAll = () => {
        localStorage.clear();
        addLog('Cleared all localStorage items', 'warn');
        refreshStorage();
    };

    return (
        <div>
            <h1>Settings - LocalStorage Testing</h1>

            <div className="card">
                <div className="card-header">Test localStorage + when_start_conditions</div>
                <div className="card-body">
                    <p>
                        This page allows you to manipulate localStorage values to test rule evaluation
                        with application_state conditions (mock rule 3 uses localStorage.test_sr == 1).
                    </p>
                </div>
            </div>

            <h2>Quick Actions</h2>
            <div className="controls">
                <button className="btn-success" onClick={setTestSr}>
                    Set test_sr = 1
                </button>
                <button className="btn-warning" onClick={clearTestSr}>
                    Clear test_sr
                </button>
                <button className="btn-info" onClick={refreshStorage}>
                    Refresh Storage
                </button>
                <button className="btn-danger" onClick={clearAll}>
                    Clear All Storage
                </button>
            </div>

            <h2>LocalStorage Viewer</h2>
            <div className="storage-viewer">
                {Object.keys(storageItems).length === 0 ? (
                    <div className="text-muted text-center">No items in localStorage</div>
                ) : (
                    Object.entries(storageItems).map(([key, value]) => (
                        <div key={key} className="storage-item">
                            <span className="storage-key">{key}:</span>
                            <span className="storage-value">{value}</span>
                        </div>
                    ))
                )}
            </div>

            <h2>Set Custom Value</h2>
            <div className="grid-2">
                <div className="form-group">
                    <label className="form-label">Key</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="localStorage key"
                        value={customKey}
                        onChange={(e) => setCustomKey(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Value</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="value"
                        value={customValue}
                        onChange={(e) => setCustomValue(e.target.value)}
                    />
                </div>
            </div>
            <button className="btn-primary" onClick={setCustom} disabled={!customKey}>
                Set Custom Value
            </button>

            <div className="card mt-20">
                <div className="card-header">Mock Rule 3 Info</div>
                <div className="card-body">
                    <p>Rule 3 requires:</p>
                    <ul>
                        <li>URL contains "my-test-environment" ✓ (always true on this page)</li>
                        <li>localStorage.test_sr == "1" (use button above to set)</li>
                    </ul>
                    <p>When both conditions are met, recording should start (if not already started).</p>
                </div>
            </div>
        </div>
    );
}

// Dashboard Page Component
function DashboardPage() {
    const [mutations, setMutations] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [rapidItems, setRapidItems] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const generateRapidMutations = () => {
        const newItems = [];
        for (let i = 0; i < 50; i++) {
            newItems.push(`Rapid Item ${Date.now()}-${i}`);
        }
        setRapidItems([...rapidItems, ...newItems]);
        setMutations(mutations + 50);
        addLog(`Generated 50 rapid mutations (total: ${mutations + 50})`, 'warn');
    };

    const clearItems = () => {
        setRapidItems([]);
        addLog('Cleared all rapid items', 'info');
    };

    return (
        <div>
            <h1>Dashboard - Mixed Scenarios</h1>

            <div className="card">
                <div className="card-header">Combined testing environment</div>
                <div className="card-body">
                    <p>
                        This page combines multiple test scenarios: forms, dynamic content, localStorage controls,
                        and performance stress testing. Use this to verify complex recording scenarios.
                    </p>
                </div>
            </div>

            <h2>Performance Metrics</h2>
            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-label">Total Mutations</div>
                    <div className="metric-value">{mutations}</div>
                </div>
                <div className="metric-card">
                    <div className="metric-label">Rapid Items</div>
                    <div className="metric-value">{rapidItems.length}</div>
                </div>
                <div className="metric-card">
                    <div className="metric-label">Mouse X</div>
                    <div className="metric-value">{mousePos.x}</div>
                </div>
                <div className="metric-card">
                    <div className="metric-label">Mouse Y</div>
                    <div className="metric-value">{mousePos.y}</div>
                </div>
            </div>

            <h2>Stress Test Controls</h2>
            <div className="controls">
                <button className="btn-warning" onClick={generateRapidMutations}>
                    Generate 50 Mutations
                </button>
                <button className="btn-danger" onClick={clearItems}>
                    Clear Items
                </button>
                <button className="btn-info" onClick={() => addLog('Manual log entry', 'info')}>
                    Add Log Entry
                </button>
            </div>

            <h2>Rapid Mutations Container</h2>
            <div style={{ maxHeight: '300px', overflow: 'auto', border: '2px solid #dee2e6', borderRadius: '8px', padding: '10px' }}>
                {rapidItems.length === 0 ? (
                    <div className="text-muted text-center">Click "Generate Mutations" to add items</div>
                ) : (
                    rapidItems.map((item, index) => (
                        <div key={index} style={{ padding: '5px', borderBottom: '1px solid #e9ecef' }}>
                            {item}
                        </div>
                    ))
                )}
            </div>

            <h2>Quick Form Test</h2>
            <div className="grid-2">
                <div className="form-group">
                    <label className="form-label">Test Input</label>
                    <input type="text" className="form-input" placeholder="Type something..." />
                </div>
                <div className="form-group">
                    <label className="form-label">Test Select</label>
                    <select className="form-select">
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
