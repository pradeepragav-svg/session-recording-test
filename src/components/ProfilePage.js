import React, { useState, useEffect } from 'react';

function ProfilePage() {
    const [counter, setCounter] = useState(0);
    const [items, setItems] = useState([
        { id: 1, text: 'Profile item 1', visible: true },
        { id: 2, text: 'Profile item 2', visible: true },
        { id: 3, text: 'Profile item 3', visible: true }
    ]);
    const [newItemText, setNewItemText] = useState('');

    const addItem = () => {
        if (newItemText.trim()) {
            const newItem = {
                id: Date.now(),
                text: newItemText,
                visible: true
            };
            setItems([...items, newItem]);
            setNewItemText('');
            window.addLog(`Added new item: "${newItemText}"`, 'success');
        }
    };

    const removeItem = (id) => {
        const item = items.find(i => i.id === id);
        setItems(items.filter(i => i.id !== id));
        window.addLog(`Removed item: "${item.text}"`, 'info');
    };

    const toggleItem = (id) => {
        setItems(items.map(i => 
            i.id === id ? { ...i, visible: !i.visible } : i
        ));
    };

    const clearAll = () => {
        setItems([]);
        window.addLog('Cleared all items', 'warn');
    };

    return (
        <div>
            <h1>Profile Page - Dynamic Content</h1>

            <div className="card">
                <div className="card-header">Testing DOM Mutations</div>
                <div className="card-body">
                    <p>
                        This page tests dynamic content changes to verify that the session recorder
                        captures DOM mutations correctly (additions, removals, attribute changes).
                    </p>
                </div>
            </div>

            <h2>Counter Test</h2>
            <div className="counter-display">
                <span className="counter-value">{counter}</span>
                <div className="controls">
                    <button className="btn-primary" onClick={() => setCounter(counter + 1)}>
                        Increment
                    </button>
                    <button className="btn-secondary" onClick={() => setCounter(counter - 1)}>
                        Decrement
                    </button>
                    <button className="btn-danger" onClick={() => setCounter(0)}>
                        Reset
                    </button>
                </div>
            </div>

            <h2>Dynamic List (Add/Remove Elements)</h2>
            <div className="form-group">
                <label className="form-label">Add New Item</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Enter item text..."
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addItem()}
                        style={{ flex: 1 }}
                    />
                    <button className="btn-success" onClick={addItem}>Add Item</button>
                </div>
            </div>

            <div style={{ marginTop: '20px' }}>
                {items.map(item => (
                    <div 
                        key={item.id} 
                        className="dynamic-item"
                        style={{ opacity: item.visible ? 1 : 0.3 }}
                    >
                        <span>{item.text}</span>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button 
                                className="btn-info"
                                onClick={() => toggleItem(item.id)}
                            >
                                {item.visible ? 'Hide' : 'Show'}
                            </button>
                            <button 
                                className="btn-danger"
                                onClick={() => removeItem(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
                {items.length === 0 && (
                    <p className="text-muted text-center">No items. Add some items to test DOM mutations.</p>
                )}
            </div>

            {items.length > 0 && (
                <div className="controls mt-20">
                    <button className="btn-danger" onClick={clearAll}>
                        Clear All Items
                    </button>
                </div>
            )}

            <div className="test-content mt-20">
                <h3>Mutation Testing Tips</h3>
                <ul>
                    <li>Add/remove items to test element insertion/deletion</li>
                    <li>Toggle visibility to test attribute changes</li>
                    <li>Increment counter to test text node mutations</li>
                    <li>Check recorded events to verify all mutations are captured</li>
                </ul>
            </div>
        </div>
    );
}

export default ProfilePage;
