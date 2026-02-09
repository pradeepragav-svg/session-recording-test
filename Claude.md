# Session Recording Test Environment

## Overview

This is a test environment for the Session Recorder feature. It provides a multi-page React application with various interactive elements to test session recording capabilities. The Home page specifically focuses on comprehensive PII (Personally Identifiable Information) masking tests.

## GitHub Pages Hosting

This web page is hosted on GitHub Pages, making it accessible for automated testing without requiring a local server. The page is used as a test target for Playwright-based integration tests.

**GitHub Pages URL**: The project is configured to be deployed via GitHub Pages (configure in repository settings).

## Usage in Playwright Tests

This test environment is referenced in the Playwright test suite located at:
```
/Users/pradeep/Documents/git/whatfix-ui-playwright/src/test/resources/test-suite/analytics/session-recorder-testsuite.xml
```

### Test Suite Details

The Session Recorder Test Suite includes the following test classes:

1. **SessionRecorderRecordTest** - Tests basic recording functionality
2. **SessionRecorderBatchingTest** - Tests event batching behavior
3. **SessionRecorderExtensionTest** - Tests extension-specific features
4. **SessionRecorderQueueHappyFlowTest** - Tests queue operations in success scenarios
5. **SessionRecorderQueueFailureTest** - Tests queue failure handling
6. **SessionRecorderSessionTimeoutTest** - Tests session timeout behavior
7. **SessionRecorderUserIdChangeTest** - Tests user ID change scenarios

### Test Configuration

- **Pod**: analytics_capture
- **Tribe**: analytics
- **Owner**: pradeep.ragav
- **Parallel Execution**: Enabled (15 threads)

## Application Features

The test environment includes:

### Home Page - PII Masking Test Page
Comprehensive PII testing for:
- **Email Addresses**: Various formats and input types
- **SSN (Social Security Numbers)**: Multiple formats with different separators
- **Credit Card Numbers**: Visa, Mastercard, American Express formats
- **IP Addresses**: IPv4 addresses in various contexts
- **MAC Addresses**: Network hardware addresses
- **Date of Birth**: Multiple date formats
- **ITIN**: Individual Taxpayer Identification Numbers
- **Aadhaar Numbers**: Indian identification numbers
- **PAN Card Numbers**: Indian tax identification
- **UK National Insurance Numbers**: UK NIN formats
- **USA Passport Numbers**: US passport formats
- **Password Fields**: Secure input testing
- **Mixed Content**: Paragraphs and tables with multiple PII types

### Other Pages
- **Forms Page**: Various form input types for interaction testing
- **Profile Page**: Dynamic content and DOM mutation testing
- **Settings Page**: LocalStorage manipulation and rule evaluation testing
- **Dashboard Page**: Performance and stress testing scenarios

### Core Features
- **Session Recorder Integration**: Embedded with Whatfix for testing session capture
- **Mock Rules**: Configurable rules in `mock-rules.json`
- **Module Status Indicators**: Real-time status of Embed, CE, SR, and Rules Evaluator
- **Test Controls**: Initialize, evaluate, and manage session recording rules

## Project Structure

```
.
├── index.html              # Main HTML page with React loader
├── app.jsx                 # Main React application
├── src/                    # Source files
│   ├── App.js
│   ├── index.js
│   ├── styles.css
│   └── components/         # React components
│       ├── HomePage.js     # PII Masking Test Page
│       ├── DashboardPage.js
│       ├── FormsPage.js
│       ├── ProfilePage.js
│       ├── SettingsPage.js
│       └── Layout.js
├── embed/                  # Whatfix embed files
├── ce/                     # Custom elements
├── styles.css              # Main styles
├── mock-rules.json         # Mock configuration
├── package.json            # NPM dependencies
└── webpack.config.js       # Webpack configuration
```

## Development

### Install Dependencies
```bash
npm install
```

### Build
```bash
npm run build
```

### Local Development
Open `index.html` in a browser or serve using a local HTTP server.

## Documentation

- **MIGRATION_TO_WEBPACK.md** - Details about webpack migration
- **TEST_STATE_UPDATE.md** - Information about test state updates
- **README.md** - General project documentation

## Notes

- The application uses Whatfix embed for session recording functionality
- Mock rules can be configured via `mock-rules.json`
- The environment is designed to test various session recording scenarios including:
  - PII masking (Home page)
  - Navigation and form interactions (Forms page)
  - DOM mutations and dynamic content (Profile page)
  - LocalStorage and rule evaluation (Settings page)
  - Performance and stress testing (Dashboard page)
- The Home page serves as the primary PII masking test page for Playwright tests
