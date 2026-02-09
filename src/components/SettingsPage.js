import React, { useState, useEffect } from 'react';

function SettingsPage() {
    const [storageData, setStorageData] = useState({});
    const [newKey, setNewKey] = useState('');
    const [newValue, setNewValue] = useState('');

    const refreshStorage = () => {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            data[key] = localStorage.getItem(key);
        }
        setStorageData(data);
    };

    useEffect(() => {
        refreshStorage();
    }, []);

    const addToStorage = () => {
        if (newKey.trim()) {
            localStorage.setItem(newKey, newValue);
            window.addLog(`Added to localStorage: ${newKey} = ${newValue}`, 'success');
            setNewKey('');
            setNewValue('');
            refreshStorage();
        }
    };

    const removeFromStorage = (key) => {
        localStorage.removeItem(key);
        window.addLog(`Removed from localStorage: ${key}`, 'warn');
        refreshStorage();
    };

    const clearStorage = () => {
        localStorage.clear();
        window.addLog('Cleared all localStorage', 'warn');
        refreshStorage();
    };

    const testStorageScenarios = () => {
        localStorage.setItem('test_string', 'Hello World');
        localStorage.setItem('test_number', '42');
        localStorage.setItem('test_json', JSON.stringify({ foo: 'bar', nested: { value: 123 } }));
        localStorage.setItem('test_timestamp', new Date().toISOString());
        window.addLog('Added test scenarios to localStorage', 'success');
        refreshStorage();
    };

    return (
        <div>
            <h1>Settings Page - LocalStorage Testing</h1>

            <div className="card">
                <div className="card-header">Testing Browser Storage Events</div>
                <div className="card-body">
                    <p>
                        This page tests localStorage manipulation to verify that the session recorder
                        captures storage events and state changes correctly.
                    </p>
                </div>
            </div>

            <h2>Add New Storage Item</h2>
            <div className="grid-2">
                <div className="form-group">
                    <label className="form-label">Key</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="storage_key"
                        value={newKey}
                        onChange={(e) => setNewKey(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Value</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="storage_value"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                    />
                </div>
            </div>

            <div className="controls">
                <button className="btn-success" onClick={addToStorage}>
                    Add to Storage
                </button>
                <button className="btn-info" onClick={testStorageScenarios}>
                    Add Test Data
                </button>
                <button className="btn-warning" onClick={refreshStorage}>
                    Refresh Display
                </button>
                <button className="btn-danger" onClick={clearStorage}>
                    Clear All Storage
                </button>
            </div>

            <h2>Current LocalStorage Contents</h2>
            <div className="storage-viewer">
                {Object.keys(storageData).length === 0 ? (
                    <p className="text-muted text-center">LocalStorage is empty</p>
                ) : (
                    Object.entries(storageData).map(([key, value]) => (
                        <div key={key} className="storage-item">
                            <div>
                                <span className="storage-key">{key}:</span>
                                <span className="storage-value">
                                    {value.length > 100 ? value.substring(0, 100) + '...' : value}
                                </span>
                            </div>
                            <button 
                                className="btn-danger"
                                onClick={() => removeFromStorage(key)}
                            >
                                Remove
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="test-content mt-20">
                <h3>Storage Testing Tips</h3>
                <ul>
                    <li>Add/remove items to test storage events</li>
                    <li>Use "Add Test Data" to create various data types</li>
                    <li>Clear all to test bulk removal</li>
                    <li>Check if recorder captures localStorage changes</li>
                    <li>Note: Some keys (wfx_unq, wfx_usr_session_id) are used by the recorder itself</li>
                </ul>
            </div>
        </div>
    );
}

export default SettingsPage;
