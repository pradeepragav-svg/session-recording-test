import React, { useState } from 'react';

function HomePage() {
    const [formData, setFormData] = useState({
        name: '',
        email: 'user.test@example.com',
        ssn: '234-56-7890',
        password: '',
        creditCard: '4532015112830366',
        dob: '06/25/1988',
        itin: '93-7654321',
        aadhaar: '3456 7890 1234',
        pan: 'PQRST5678K',
        nin: 'CD246801A',
        passport: 'B56 78901',
        ip: '192.168.0.100',
        mac: 'A1:B2:C3:D4:E5:F6'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <div className="header" style={{ backgroundColor: '#2c3e50', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h1>🔒 PII Masking Test Page</h1>
                <p>This page contains various types of Personally Identifiable Information (PII) to test the masking functionality.</p>
            </div>

            <div className="instructions" style={{ backgroundColor: '#fff3cd', border: '1px solid #ffc107', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3 style={{ marginTop: 0, color: '#856404' }}>📋 Testing Instructions</h3>
                <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>
                    <li>Ensure modules are loaded (check status indicators above)</li>
                    <li>Interact with the page (type in inputs, select text, etc.)</li>
                    <li>Navigate between tabs to test different scenarios</li>
                    <li>Verify that all PII data is replaced with <code>***</code> in recordings</li>
                </ol>
            </div>

            {/* Email Tests */}
            <div className="test-section" style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>📧 Email Addresses</h2>
                <div className="test-item" style={{ margin: '15px 0', padding: '10px', backgroundColor: '#ecf0f1', borderLeft: '4px solid #3498db' }}>
                    <label style={{ fontWeight: 'bold', color: '#34495e', display: 'block', marginBottom: '5px' }}>Static Email Text:</label>
                    <div style={{ color: '#e74c3c', fontFamily: 'monospace', fontSize: '14px' }}>john.doe@example.com</div>
                </div>
                <div className="test-item" style={{ margin: '15px 0', padding: '10px', backgroundColor: '#ecf0f1', borderLeft: '4px solid #3498db' }}>
                    <label style={{ fontWeight: 'bold', color: '#34495e', display: 'block', marginBottom: '5px' }}>Multiple Emails:</label>
                    <div style={{ color: '#e74c3c', fontFamily: 'monospace', fontSize: '14px' }}>admin@company.com, support@website.org, info@test.co.uk</div>
                </div>
                <div className="form-group">
                    <label className="form-label">Email Input Field:</label>
                    <input
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* SSN Tests */}
            <div className="test-section" style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>🔢 Social Security Numbers (SSN)</h2>
                <div className="test-item" style={{ margin: '15px 0', padding: '10px', backgroundColor: '#ecf0f1', borderLeft: '4px solid #3498db' }}>
                    <label style={{ fontWeight: 'bold', color: '#34495e', display: 'block', marginBottom: '5px' }}>SSN Format:</label>
                    <div style={{ color: '#e74c3c', fontFamily: 'monospace', fontSize: '14px' }}>123-45-6789</div>
                </div>
                <div className="test-item" style={{ margin: '15px 0', padding: '10px', backgroundColor: '#ecf0f1', borderLeft: '4px solid #3498db' }}>
                    <label style={{ fontWeight: 'bold', color: '#34495e', display: 'block', marginBottom: '5px' }}>Multiple SSNs:</label>
                    <div style={{ color: '#e74c3c', fontFamily: 'monospace', fontSize: '14px' }}>987-65-4321, 555-12-3456</div>
                </div>
                <div className="form-group">
                    <label className="form-label">SSN Input:</label>
                    <input
                        type="text"
                        name="ssn"
                        className="form-input"
                        placeholder="Enter SSN"
                        value={formData.ssn}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Credit Card Tests */}
            <div className="test-section" style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>💳 Credit Card Numbers</h2>
                <div className="test-item" style={{ margin: '15px 0', padding: '10px', backgroundColor: '#ecf0f1', borderLeft: '4px solid #3498db' }}>
                    <label style={{ fontWeight: 'bold', color: '#34495e', display: 'block', marginBottom: '5px' }}>Visa Card (spaces):</label>
                    <div style={{ color: '#e74c3c', fontFamily: 'monospace', fontSize: '14px' }}>4111 1111 1111 1111</div>
                </div>
                <div className="test-item" style={{ margin: '15px 0', padding: '10px', backgroundColor: '#ecf0f1', borderLeft: '4px solid #3498db' }}>
                    <label style={{ fontWeight: 'bold', color: '#34495e', display: 'block', marginBottom: '5px' }}>Mastercard:</label>
                    <div style={{ color: '#e74c3c', fontFamily: 'monospace', fontSize: '14px' }}>5555555555554444</div>
                </div>
                <div className="test-item" style={{ margin: '15px 0', padding: '10px', backgroundColor: '#ecf0f1', borderLeft: '4px solid #3498db' }}>
                    <label style={{ fontWeight: 'bold', color: '#34495e', display: 'block', marginBottom: '5px' }}>American Express:</label>
                    <div style={{ color: '#e74c3c', fontFamily: 'monospace', fontSize: '14px' }}>3782-822463-10005</div>
                </div>
                <div className="form-group">
                    <label className="form-label">Credit Card Input:</label>
                    <input
                        type="text"
                        name="creditCard"
                        className="form-input"
                        placeholder="Enter card number"
                        value={formData.creditCard}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* IP Address Tests */}
            <div className="test-section" style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>🌐 IP Addresses (IPv4)</h2>
                <div className="test-item" style={{ margin: '15px 0', padding: '10px', backgroundColor: '#ecf0f1', borderLeft: '4px solid #3498db' }}>
                    <label style={{ fontWeight: 'bold', color: '#34495e', display: 'block', marginBottom: '5px' }}>Local IP:</label>
                    <div style={{ color: '#e74c3c', fontFamily: 'monospace', fontSize: '14px' }}>192.168.1.1</div>
                </div>
                <div className="test-item" style={{ margin: '15px 0', padding: '10px', backgroundColor: '#ecf0f1', borderLeft: '4px solid #3498db' }}>
                    <label style={{ fontWeight: 'bold', color: '#34495e', display: 'block', marginBottom: '5px' }}>Multiple IPs:</label>
                    <div style={{ color: '#e74c3c', fontFamily: 'monospace', fontSize: '14px' }}>10.0.0.1, 172.16.0.1, 203.0.113.0</div>
                </div>
                <div className="form-group">
                    <label className="form-label">IP Address Input:</label>
                    <input
                        type="text"
                        name="ip"
                        className="form-input"
                        placeholder="Enter IP"
                        value={formData.ip}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* MAC Address Tests */}
            <div className="test-section" style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>🖥️ MAC Addresses</h2>
                <div className="test-item" style={{ margin: '15px 0', padding: '10px', backgroundColor: '#ecf0f1', borderLeft: '4px solid #3498db' }}>
                    <label style={{ fontWeight: 'bold', color: '#34495e', display: 'block', marginBottom: '5px' }}>MAC with colons:</label>
                    <div style={{ color: '#e74c3c', fontFamily: 'monospace', fontSize: '14px' }}>00:1B:63:84:45:E6</div>
                </div>
                <div className="form-group">
                    <label className="form-label">MAC Address Input:</label>
                    <input
                        type="text"
                        name="mac"
                        className="form-input"
                        placeholder="Enter MAC address"
                        value={formData.mac}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Date of Birth Tests */}
            <div className="test-section" style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>🎂 Date of Birth</h2>
                <div className="test-item" style={{ margin: '15px 0', padding: '10px', backgroundColor: '#ecf0f1', borderLeft: '4px solid #3498db' }}>
                    <label style={{ fontWeight: 'bold', color: '#34495e', display: 'block', marginBottom: '5px' }}>DOB Format (MM/DD/YYYY):</label>
                    <div style={{ color: '#e74c3c', fontFamily: 'monospace', fontSize: '14px' }}>12/31/1990</div>
                </div>
                <div className="form-group">
                    <label className="form-label">Date of Birth Input:</label>
                    <input
                        type="text"
                        name="dob"
                        className="form-input"
                        placeholder="Enter DOB"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* ITIN Tests */}
            <div className="test-section" style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>🆔 Individual Taxpayer Identification Number (ITIN)</h2>
                <div className="test-item" style={{ margin: '15px 0', padding: '10px', backgroundColor: '#ecf0f1', borderLeft: '4px solid #3498db' }}>
                    <label style={{ fontWeight: 'bold', color: '#34495e', display: 'block', marginBottom: '5px' }}>ITIN Format:</label>
                    <div style={{ color: '#e74c3c', fontFamily: 'monospace', fontSize: '14px' }}>92-1234567</div>
                </div>
                <div className="form-group">
                    <label className="form-label">ITIN Input:</label>
                    <input
                        type="text"
                        name="itin"
                        className="form-input"
                        placeholder="Enter ITIN"
                        value={formData.itin}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Aadhaar Tests */}
            <div className="test-section" style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>🇮🇳 Aadhaar Number (India)</h2>
                <div className="test-item" style={{ margin: '15px 0', padding: '10px', backgroundColor: '#ecf0f1', borderLeft: '4px solid #3498db' }}>
                    <label style={{ fontWeight: 'bold', color: '#34495e', display: 'block', marginBottom: '5px' }}>Aadhaar Format:</label>
                    <div style={{ color: '#e74c3c', fontFamily: 'monospace', fontSize: '14px' }}>2234 5678 9012</div>
                </div>
                <div className="form-group">
                    <label className="form-label">Aadhaar Input:</label>
                    <input
                        type="text"
                        name="aadhaar"
                        className="form-input"
                        placeholder="Enter Aadhaar"
                        value={formData.aadhaar}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* PAN Tests */}
            <div className="test-section" style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>🇮🇳 PAN Card Number (India)</h2>
                <div className="test-item" style={{ margin: '15px 0', padding: '10px', backgroundColor: '#ecf0f1', borderLeft: '4px solid #3498db' }}>
                    <label style={{ fontWeight: 'bold', color: '#34495e', display: 'block', marginBottom: '5px' }}>PAN Format:</label>
                    <div style={{ color: '#e74c3c', fontFamily: 'monospace', fontSize: '14px' }}>ABCDE1234F</div>
                </div>
                <div className="form-group">
                    <label className="form-label">PAN Input:</label>
                    <input
                        type="text"
                        name="pan"
                        className="form-input"
                        placeholder="Enter PAN"
                        value={formData.pan}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* UK National Insurance Number Tests */}
            <div className="test-section" style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>🇬🇧 UK National Insurance Number</h2>
                <div className="test-item" style={{ margin: '15px 0', padding: '10px', backgroundColor: '#ecf0f1', borderLeft: '4px solid #3498db' }}>
                    <label style={{ fontWeight: 'bold', color: '#34495e', display: 'block', marginBottom: '5px' }}>NIN Format:</label>
                    <div style={{ color: '#e74c3c', fontFamily: 'monospace', fontSize: '14px' }}>AB123456C</div>
                </div>
                <div className="form-group">
                    <label className="form-label">NIN Input:</label>
                    <input
                        type="text"
                        name="nin"
                        className="form-input"
                        placeholder="Enter NIN"
                        value={formData.nin}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* USA Passport Tests */}
            <div className="test-section" style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>🇺🇸 USA Passport Number</h2>
                <div className="test-item" style={{ margin: '15px 0', padding: '10px', backgroundColor: '#ecf0f1', borderLeft: '4px solid #3498db' }}>
                    <label style={{ fontWeight: 'bold', color: '#34495e', display: 'block', marginBottom: '5px' }}>Passport Format:</label>
                    <div style={{ color: '#e74c3c', fontFamily: 'monospace', fontSize: '14px' }}>A12 34567</div>
                </div>
                <div className="form-group">
                    <label className="form-label">Passport Input:</label>
                    <input
                        type="text"
                        name="passport"
                        className="form-input"
                        placeholder="Enter Passport"
                        value={formData.passport}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Password Test */}
            <div className="test-section" style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>🔐 Password Field Test</h2>
                <div className="form-group">
                    <label className="form-label">Password Input (should be masked):</label>
                    <input
                        type="password"
                        name="password"
                        className="form-input"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Mixed Content Test */}
            <div className="test-section" style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>🔀 Mixed PII Content</h2>
                <div className="test-item" style={{ margin: '15px 0', padding: '10px', backgroundColor: '#ecf0f1', borderLeft: '4px solid #3498db' }}>
                    <label style={{ fontWeight: 'bold', color: '#34495e', display: 'block', marginBottom: '5px' }}>Paragraph with Multiple PII Types:</label>
                    <div style={{ color: '#e74c3c', fontFamily: 'monospace', fontSize: '14px' }}>
                        John's email is john.smith@company.com and his SSN is 456-78-9012.
                        He lives at IP address 192.168.1.50 and his credit card is 4111 1111 1111 1111.
                        His date of birth is 05/15/1985 and PAN number is ABCDE1234F.
                    </div>
                </div>
            </div>

            {/* Table with PII Data */}
            <div className="test-section" style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>📊 Customer Data Table</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd', backgroundColor: '#3498db', color: 'white' }}>Name</th>
                            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd', backgroundColor: '#3498db', color: 'white' }}>Email</th>
                            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd', backgroundColor: '#3498db', color: 'white' }}>SSN</th>
                            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd', backgroundColor: '#3498db', color: 'white' }}>Credit Card</th>
                            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd', backgroundColor: '#3498db', color: 'white' }}>IP Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Alice Johnson</td>
                            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>alice.j@test.com</td>
                            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>111-22-3333</td>
                            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>4532 0151 1283 0366</td>
                            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>192.168.2.10</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Bob Williams</td>
                            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>bob.w@example.net</td>
                            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>444-55-6666</td>
                            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>5555-5555-5555-4444</td>
                            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>10.0.0.25</td>
                        </tr>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Carol Martinez</td>
                            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>carol.m@company.io</td>
                            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>777-88-9999</td>
                            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>378282246310005</td>
                            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>172.16.0.50</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Summary */}
            <div className="test-section" style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>✅ Expected Results</h2>
                <div style={{ backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', color: '#721c24', padding: '10px', borderRadius: '4px', marginTop: '10px' }}>
                    <strong>⚠️ Important:</strong> When you replay the recording, ALL PII data shown on this page
                    should be replaced with <code>***</code>. This includes:
                    <ul>
                        <li>Email addresses</li>
                        <li>Social Security Numbers (SSN)</li>
                        <li>Credit card numbers (Visa, Mastercard, Amex)</li>
                        <li>IP addresses (IPv4)</li>
                        <li>MAC addresses</li>
                        <li>Dates of birth</li>
                        <li>ITIN numbers</li>
                        <li>Aadhaar numbers</li>
                        <li>PAN card numbers</li>
                        <li>UK National Insurance Numbers</li>
                        <li>USA Passport numbers</li>
                        <li>Password field values</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
