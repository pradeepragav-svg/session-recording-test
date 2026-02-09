import React, { useState } from 'react';

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
        window.addLog('Form submitted (check recorded events for masking)', 'success');
        console.log('Form data:', formData);
    };

    const resetForm = () => {
        setFormData({
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
                    <button type="button" className="btn-secondary" onClick={resetForm}>
                        Reset Form
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormsPage;
