import React, { useState, useEffect } from 'react';

function DashboardPage() {
    const [metrics, setMetrics] = useState({
        clicks: 0,
        inputs: 0,
        scrolls: 0,
        mutations: 0
    });
    const [isStressRunning, setIsStressRunning] = useState(false);
    const [stressInterval, setStressInterval] = useState(null);

    useEffect(() => {
        const handleClick = () => setMetrics(m => ({ ...m, clicks: m.clicks + 1 }));
        const handleInput = () => setMetrics(m => ({ ...m, inputs: m.inputs + 1 }));
        const handleScroll = () => setMetrics(m => ({ ...m, scrolls: m.scrolls + 1 }));

        document.addEventListener('click', handleClick);
        document.addEventListener('input', handleInput);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('input', handleInput);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const resetMetrics = () => {
        setMetrics({ clicks: 0, inputs: 0, scrolls: 0, mutations: 0 });
        window.addLog('Metrics reset', 'info');
    };

    const performStressTest = () => {
        window.addLog('Starting stress test...', 'info');
        setIsStressRunning(true);

        let count = 0;
        const interval = setInterval(() => {
            // Simulate rapid DOM changes
            setMetrics(m => ({ ...m, mutations: m.mutations + 1 }));
            
            // Log some events
            if (count % 5 === 0) {
                window.addLog('Stress test iteration ' + count, 'info');
            }

            count++;
            if (count >= 50) {
                clearInterval(interval);
                setIsStressRunning(false);
                window.addLog('Stress test completed (50 iterations)', 'success');
            }
        }, 100);

        setStressInterval(interval);
    };

    const stopStressTest = () => {
        if (stressInterval) {
            clearInterval(stressInterval);
            setStressInterval(null);
            setIsStressRunning(false);
            window.addLog('Stress test stopped', 'warn');
        }
    };

    const triggerFullSnapshot = () => {
        if (window.testUtils && window.testUtils.triggerFullSnapshot) {
            window.testUtils.triggerFullSnapshot();
            window.addLog('Triggered full snapshot manually', 'success');
        } else {
            window.addLog('Full snapshot function not available', 'error');
        }
    };

    const simulateLongTask = () => {
        window.addLog('Starting long task simulation (3 seconds)...', 'info');
        const start = Date.now();
        
        // Simulate CPU-intensive task
        setTimeout(() => {
            let result = 0;
            for (let i = 0; i < 10000000; i++) {
                result += Math.sqrt(i);
            }
            const duration = Date.now() - start;
            window.addLog('Long task completed in ' + duration + 'ms', 'success');
        }, 0);
    };

    return (
        <div>
            <h1>Dashboard - Mixed Scenarios & Stress Testing</h1>

            <div className="card">
                <div className="card-header">Performance & Edge Case Testing</div>
                <div className="card-body">
                    <p>
                        This page tests various scenarios including high-frequency events,
                        rapid DOM mutations, performance tracking, and edge cases.
                    </p>
                </div>
            </div>

            <h2>Activity Metrics</h2>
            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-label">Clicks</div>
                    <div className="metric-value">{metrics.clicks}</div>
                </div>
                <div className="metric-card">
                    <div className="metric-label">Inputs</div>
                    <div className="metric-value">{metrics.inputs}</div>
                </div>
                <div className="metric-card">
                    <div className="metric-label">Scrolls</div>
                    <div className="metric-value">{metrics.scrolls}</div>
                </div>
                <div className="metric-card">
                    <div className="metric-label">Mutations</div>
                    <div className="metric-value">{metrics.mutations}</div>
                </div>
            </div>

            <div className="controls">
                <button className="btn-secondary" onClick={resetMetrics}>
                    Reset Metrics
                </button>
            </div>

            <h2>Stress Tests</h2>
            <div className="controls">
                <button 
                    className="btn-warning" 
                    onClick={performStressTest}
                    disabled={isStressRunning}
                >
                    {isStressRunning ? 'Running...' : 'Start Stress Test (50x)'}
                </button>
                <button 
                    className="btn-danger" 
                    onClick={stopStressTest}
                    disabled={!isStressRunning}
                >
                    Stop Stress Test
                </button>
                <button className="btn-info" onClick={simulateLongTask}>
                    Simulate Long Task
                </button>
                <button className="btn-primary" onClick={triggerFullSnapshot}>
                    Trigger Full Snapshot
                </button>
            </div>

            <h2>Interactive Test Area</h2>
            <div className="grid-2">
                <div className="form-group">
                    <label className="form-label">Test Input 1</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Type something..."
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Test Input 2</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Type something else..."
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Test Select</label>
                    <select className="form-select">
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Test Range</label>
                    <input
                        type="range"
                        className="form-input"
                        min="0"
                        max="100"
                    />
                </div>
            </div>

            <div className="test-content mt-20">
                <h3>Dashboard Testing Guide</h3>
                <ul>
                    <li><strong>Metrics:</strong> Real-time tracking of user interactions (auto-increments on actions)</li>
                    <li><strong>Stress Test:</strong> Rapid DOM mutations (50 iterations @ 100ms interval)</li>
                    <li><strong>Long Task:</strong> CPU-intensive operation to test performance impact</li>
                    <li><strong>Full Snapshot:</strong> Manually trigger a complete DOM snapshot</li>
                    <li><strong>Interactive Area:</strong> Various input types for quick testing</li>
                </ul>
                <p className="text-muted">
                    <strong>Note:</strong> Metrics track all interactions across the entire page, 
                    including clicks on buttons and navigation.
                </p>
            </div>
        </div>
    );
}

export default DashboardPage;
