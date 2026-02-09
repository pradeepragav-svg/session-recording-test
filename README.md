# Session Recorder + Customization Engine Integration Test (React SPA)

This directory contains a **React-based Single Page Application** for testing the integration between Session Recorder and Customization Engine, specifically the visibility rules evaluation flow.

## 🆕 What's New - Webpack-based Build System

The test environment has been **migrated to webpack** with proper npm package management:
- **5 distinct testing tabs** with different URLs for rule testing
- **Client-side routing** using React Router (no page reloads)
- **Proper build system** with webpack + Babel
- **Hot reload** for development
- **Production-ready** minified builds
- **Persistent status indicators** across all tabs
- **Real-time console logging** shared across tabs
- **URL-based rule evaluation** testing

## 📁 Directory Structure

```
my-test-environment/
├── package.json             # npm dependencies and scripts
├── webpack.config.js        # webpack configuration
├── README.md               # This file
├── MIGRATION_TO_WEBPACK.md # Migration documentation
├── mock-rules.json         # Mock visibility rules
├── src/                    # Source code
│   ├── index.html          # HTML template
│   ├── index.js            # React entry point
│   ├── App.js              # Main app with routing
│   ├── styles.css          # Component styles
│   └── components/         # React components
│       ├── Layout.js       # Navigation & status bar
│       ├── HomePage.js     # Test controls & console
│       ├── FormsPage.js    # PII masking forms
│       ├── ProfilePage.js  # Dynamic content testing
│       ├── SettingsPage.js # LocalStorage testing
│       └── DashboardPage.js # Stress testing & metrics
├── dist/                   # Build output (generated)
├── node_modules/           # Dependencies (generated)
├── embed/                  # Embed files (bootstrap + EventBus)
│   ├── embed.nocache.js
│   └── 37F3F3A92241F47B4AEF97D88265A3BF.cache.js
├── ce/                     # Customization Engine
│   └── ce.js
└── sr/                     # Session Recorder (built from ../build/sr/)
    ├── remoteEntry.js
    ├── sr.js
    └── *.chunk.js
```

## 🎯 Purpose

This test environment allows you to:
1. **Test visibility rule evaluation** locally without a remote server
2. **Debug message flow** between SR and CE via EventBus
3. **Verify WfxSessionRecordingRulesEvaluator** integration
4. **Test URL-based rules** across different routes
5. **Test PII masking** on various form inputs
6. **Test dynamic content** and DOM mutations
7. **Test localStorage conditions** (application_state rules)
8. **Stress test** with rapid mutations

## 🚀 Quick Start

### 1. Install Dependencies

First time setup (only needed once):
```bash
cd /Users/pradeep/Documents/git/session_recorder/my-test-environment
npm install
```

### 2. Start Development Server

Start webpack dev server with hot reload:
```bash
npm start
```

This will:
- Build the React app with webpack
- Start dev server on http://localhost:8000
- Open browser automatically
- Watch for changes and hot reload

**Alternative: Production Build**
```bash
# Build minified production bundle
npm run build

# Serve the dist/ folder with any web server
python3 -m http.server 8000 --directory dist
```

### 3. Open in Browser

The dev server will open automatically, or navigate to:
```
http://localhost:8000/
```

The SPA will load with the Home tab active.

### 4. Navigate Between Tabs

Click any of the 5 tabs in the navigation bar:
- **Home** (`/`) - Test controls and console output
- **Forms** (`/forms`) - PII masking testing
- **Profile** (`/profile`) - Dynamic content and mutations
- **Settings** (`/settings`) - LocalStorage manipulation
- **Dashboard** (`/dashboard`) - Combined scenarios and stress testing

## 📦 NPM Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server with hot reload (port 8000) |
| `npm run build` | Production build (minified) |
| `npm run build:dev` | Development build (unminified) |
| `npm run watch` | Watch mode (auto-rebuild on changes) |

## 📋 Tab Overview

### 1. Home (`/`)
**Purpose**: Overview + existing test controls

**Features**:
- All test control buttons (Initialize Test, Evaluate Rules, etc.)
- Real-time console output window
- Quick start instructions
- Test input field

**Test Workflow**:
1. Check status indicators (all should be green)
2. Click "Initialize Test" to create test rules
3. Click "Evaluate Rules" or "Evaluate Mock Rules"
4. Watch console output for message flow

### 2. Forms (`/forms`)
**Purpose**: Test PII masking on various input types

**Features**:
- Text inputs (name, email, SSN, credit card)
- Password input (always masked)
- Radio buttons, checkboxes, select dropdowns
- Textarea
- Form submission

**What to Test**:
- Type sensitive data (SSN: 123-45-6789)
- Type credit card (4111 1111 1111 1111)
- Check that these are masked in recorded events
- Verify password field is always masked

### 3. Profile (`/profile`)
**Purpose**: Test dynamic content + mutations

**Features**:
- Auto-updating timestamp (1 second interval)
- Add/Remove item buttons (DOM mutations)
- Counter increment button (text mutations)
- Mutation statistics

**What to Test**:
- Click "Add Item" to create DOM elements
- Click "Remove" to delete DOM elements
- Watch counter increment (text mutations)
- Verify mutations are captured in console logs

### 4. Settings (`/settings`)
**Purpose**: Test localStorage + when_start_conditions

**Features**:
- LocalStorage viewer (displays all keys/values)
- Quick action buttons (Set test_sr = 1, Clear test_sr)
- Custom key/value setter
- Clear all storage button

**What to Test**:
- Click "Set test_sr = 1" → triggers mock rule 3
- Click "Clear test_sr" → may stop recording
- Set custom localStorage values
- Check that rule evaluation responds to localStorage changes

**Mock Rule 3**:
```json
{
  "where_conditions": [[ {"type": "url", "operator": "~", "op1": "my-test-environment"} ]],
  "when_start_conditions": [[ {"type": "application_state", "op1": "local_storage", "op3": "test_sr", "op4": "{\"operator\":\"=\",\"type\":\"number\",\"op1\":\"1\"}"} ]]
}
```

### 5. Dashboard (`/dashboard`)
**Purpose**: Mixed scenarios + stress testing

**Features**:
- Performance metrics (mutations, mouse position)
- Rapid mutation generator (adds 50 items at once)
- Mouse movement tracker
- Combined form inputs

**What to Test**:
- Click "Generate 50 Mutations" for stress testing
- Watch mutation counter increase
- Test recording performance under load
- Verify mouse tracking is throttled

## 🔍 Testing Scenarios

### URL-Based Rule Testing

Each tab has a distinct URL pattern for testing where_conditions:

| Tab | URL Pattern | Rule Match Example |
|-----|------------|-------------------|
| Home | `/` | Base URL rules |
| Forms | `/forms` | `op1: "forms"` |
| Profile | `/profile` | `op1: "profile"` |
| Settings | `/settings` | `op1: "settings"` |
| Dashboard | `/dashboard` | `op1: "dashboard"` |

**Test Example**:
1. Go to Home, initialize mock rules
2. Navigate to `/forms` → Check if recording starts/stops based on rules
3. Check console logs for: `[WfxSessionRecorder] ▶️ STARTING recording session...`

### PII Masking Verification

**Forms Tab Test**:
1. Open browser DevTools Console
2. Type SSN: `123-45-6789` in SSN field
3. Type credit card: `4111 1111 1111 1111`
4. Submit form
5. Check recorded events (events should show masked values: `***`)

### Dynamic Content Testing

**Profile Tab Test**:
1. Watch timestamp update (triggers mutations every second)
2. Click "Add Item" multiple times
3. Click "Remove" on items
4. Check console for: `[WfxSessionRecorder] Mutation observed`
5. Verify mutation counts in performance logs

### LocalStorage Conditions

**Settings Tab Test**:
1. Click "Evaluate Mock Rules" on Home tab first
2. Go to Settings tab
3. Click "Set test_sr = 1"
4. Rule 3 should trigger (if URL matches)
5. Check console for: `[WfxSessionRecorder] ▶️ STARTING recording session...`
6. Click "Clear test_sr" → may stop recording

## 📊 What to Expect

### Module Loading Sequence

```
1. index.html loads → webpack bundle.js loads
   └─► React app initializes

2. React app renders → Layout component mounts
   └─► Navigation bar appears
   └─► Status indicators show "loading"

3. embed.nocache.js loads (via script in HTML)
   └─► Creates window.embed_$.WFX namespace
   └─► Initializes EventBus
   └─► Status indicator: green

4. ce.js loads
   └─► Customization Engine initializes
   └─► GroupEvaluator registers for VisibilityRulesEvaluateEvent
   └─► Status indicator: green

5. sr/remoteEntry.js loads (Module Federation)
   └─► Session Recorder initializes
   └─► Registers for VisibilityRulesEvaluatedEvent
   └─► Status indicator: green

6. WfxSessionRecordingRulesEvaluator available
   └─► Status indicator: green
   └─► Test utilities ready
```

### Rule Evaluation Flow

```
1. User clicks "Evaluate Rules"
   │
2. WfxSessionRecordingRulesEvaluator.evaluate()
   │
   ├─► Creates VisibilityRulesEvaluateEvent
   ├─► Fires event to EventBus
   │
3. EventBus routes to Customization Engine
   │
4. CE GroupEvaluator processes rules
   │
   ├─► Evaluates WHERE conditions (URL matching)
   ├─► Evaluates WHO conditions (user attributes)
   ├─► Evaluates WHEN conditions (localStorage, time, etc.)
   │
5. CE fires VisibilityRulesEvaluatedEvent back
   │
6. WfxSessionRecordingRulesEvaluator receives event
   │
   ├─► Aggregates results (ALL_MUST_PASS strategy)
   ├─► Updates internal state
   ├─► Compares with previous result
   │
7. If result changed:
   │
   ├─► Fires RulesEvaluationChangeEvent
   │
8. WfxSessionRecorderModule handles event
   │
   ├─► If shouldStartRecording(): call this.start()
   ├─► If shouldStopRecording(): flush events + stop()
```

### Expected Console Logs

**On Page Load**:
```
[HH:MM:SS] === Starting Module Loading Sequence ===
[HH:MM:SS] Loading Embed & EventBus...
[HH:MM:SS] ✓ Embed script loaded
[HH:MM:SS] ✓ WfxNamespace available: window.embed_$.WFX
[HH:MM:SS] Loading Customization Engine...
[HH:MM:SS] ✓ CE script loaded
[HH:MM:SS] ✓ Customization Engine initialized
[HH:MM:SS] Loading Session Recorder...
[HH:MM:SS] ✓ SR remoteEntry loaded
[HH:MM:SS] ✓ Session Recorder initialized
[HH:MM:SS] ✓ WfxSessionRecordingRulesEvaluator found
[HH:MM:SS] === Module Loading Complete ===
```

**After Clicking "Initialize Test"**:
```
[HH:MM:SS] === Initializing Test ===
[HH:MM:SS] Setting test rule...
[HH:MM:SS] ✓ Test initialized successfully
[HH:MM:SS] Rule created: URL contains "my-test-environment"
```

**After Clicking "Evaluate Rules"**:
```
[HH:MM:SS] === Evaluating Rules ===
[HH:MM:SS] Triggering rule evaluation...
[HH:MM:SS] ✓ Evaluation triggered
[HH:MM:SS] [WfxSessionRecordingRulesEvaluator] Processing evaluation results...
[HH:MM:SS] [WfxSessionRecordingRulesEvaluator] 🔄 Result CHANGED: null → true
[HH:MM:SS] [WfxSessionRecorderModule] Starting recording - rules evaluation passed
[HH:MM:SS] [WfxSessionRecorder] ▶️ STARTING recording session...
[HH:MM:SS] [WfxSessionRecorder] ✅ Recording STARTED successfully
```

**When Navigating Between Tabs**:
- URL changes but page doesn't reload
- Status indicators remain visible
- Console logs persist
- Recording continues (or stops/starts based on rules)

## 🧪 Testing Checklist

### Initial Setup
- [ ] Web server running on port 8000
- [ ] Browser opened to http://localhost:8000/
- [ ] All 4 status indicators are green
- [ ] Navigation bar shows 5 tabs

### Home Tab Tests
- [ ] Click "Initialize Test" → success message
- [ ] Click "Evaluate Rules" → evaluation logs appear
- [ ] Click "Evaluate Mock Rules" → loads 3 rules from mock.json
- [ ] Click "Log Current State" → state JSON appears
- [ ] Click "Clear Console" → console clears

### Forms Tab Tests
- [ ] Type in all input fields
- [ ] Enter SSN (123-45-6789)
- [ ] Enter credit card (4111 1111 1111 1111)
- [ ] Select radio button
- [ ] Check checkboxes
- [ ] Select dropdown option
- [ ] Submit form → success log
- [ ] Verify PII masked in DevTools console

### Profile Tab Tests
- [ ] Watch timestamp update (1 sec intervals)
- [ ] Click "Add Item" multiple times
- [ ] Click "Remove" on items
- [ ] Click "Increment Counter"
- [ ] Check mutation logs in console

### Settings Tab Tests
- [ ] View localStorage items
- [ ] Click "Set test_sr = 1" → localStorage updated
- [ ] Click "Refresh Storage" → display updates
- [ ] Set custom key/value → appears in viewer
- [ ] Click "Clear All Storage" → storage empties

### Dashboard Tab Tests
- [ ] Click "Generate 50 Mutations" → items appear
- [ ] Watch mouse position metrics update
- [ ] Click "Clear Items" → items removed
- [ ] Type in quick form inputs

### Navigation Tests
- [ ] Click each tab → URL changes
- [ ] Use browser back button → navigates back
- [ ] Use browser forward button → navigates forward
- [ ] Refresh page → stays on current tab
- [ ] Copy URL → paste in new tab → loads correct page

### Rule Evaluation Tests
- [ ] Create rule with URL condition
- [ ] Navigate to matching tab → recording starts
- [ ] Navigate to non-matching tab → recording stops
- [ ] Set localStorage condition → recording responds

## 🐛 Troubleshooting

### Dev Server Won't Start
**Symptom**: `npm start` fails or hangs

**Solution**:
- Check if port 8000 is in use: `lsof -i :8000`
- Kill existing process: `kill -9 <PID>`
- Or change port in webpack.config.js
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

### Build Fails
**Symptom**: Webpack compilation errors

**Solution**:
- Check for syntax errors in component files
- Clear dist folder: `rm -rf dist`
- Check webpack.config.js for typos
- Verify all imports use correct paths
- Run `npm run build:dev` for better error messages

### Modules Not Loading
**Symptom**: Status indicators stay red/yellow

**Solution**:
1. Check browser console for errors
2. Verify files exist: embed/, ce/, sr/ directories
3. Check webpack CopyPlugin copied files to dist/
4. Verify file paths in src/index.html template
5. Check Network tab in DevTools for 404 errors

### Navigation Not Working
**Symptom**: Clicking tabs doesn't change content or causes 404

**Solution**:
- Ensure `historyApiFallback: true` in webpack.config.js
- Verify `publicPath: '/'` in webpack output config
- Check that BrowserRouter is used (not HashRouter)
- Restart dev server if needed

### Recording Not Starting
**Symptom**: Rules evaluate but recording doesn't start

**Solution**:
1. Check that SR module loaded (status indicator green)
2. Verify rules match current URL
3. Check localStorage conditions (Settings tab)
4. Look for console logs: `[WfxSessionRecorder] ▶️ STARTING...`
5. Check browser console for errors

### Console Logs Not Appearing
**Symptom**: On-page console is empty

**Solution**:
- Check browser DevTools console for JavaScript errors
- Verify `addLog` function is defined
- Click "Refresh" to reload component
- Check React DevTools for component state

## 🔧 Development Notes

### Tech Stack
- **React 18.2** (via npm packages)
- **React Router 6.22** (client-side routing)
- **Webpack 5** (module bundler)
- **Babel** (JSX → JavaScript transpilation)
- **Vanilla CSS** (no preprocessor)

### Build System
This SPA uses **webpack with npm packages** for proper module resolution and bundling. A build step is required, but hot reload makes development fast.

### Modifying the SPA

**To add a new tab**:
1. Create new component file in `src/components/`:
   ```javascript
   // src/components/NewTabPage.js
   import React from 'react';

   function NewTabPage() {
       return <div><h1>New Tab</h1></div>;
   }

   export default NewTabPage;
   ```

2. Import and add route to `src/App.js`:
   ```javascript
   import NewTabPage from './components/NewTabPage';

   <Route path="newtab" element={<NewTabPage />} />
   ```

3. Add navigation link in `src/components/Layout.js`:
   ```javascript
   <Link to="/newtab" className="nav-link">New Tab</Link>
   ```

**To modify styles**:
- Edit `src/styles.css` directly
- Changes hot reload automatically (no page refresh needed)

**To add new test utilities**:
- Add function to `window.testUtils` in `src/index.html`
- Call from any component: `window.testUtils.yourFunction()`

### Hot Reload
Webpack dev server watches for changes and automatically rebuilds:
- Component changes: Fast refresh (< 500ms)
- CSS changes: Hot reload without refresh
- index.html changes: Full page reload required

## 📚 Related Files

- **`TEST_STATE_UPDATE.md`** - Details on state update implementation
- **`mock-rules.json`** - Mock visibility rules (3 test rules)
- **`../build/sr/`** - Session Recorder build output
- **`../src/`** - Session Recorder source code

## 🎓 Learning Resources

### React Router Basics
- Navigation: `<Link to="/path">Text</Link>`
- Current location: `useLocation()` hook
- Active route styling: Check `location.pathname`

### Testing Best Practices
1. Always check status indicators first
2. Initialize rules before evaluating
3. Check both on-page console and browser DevTools
4. Test URL-based rules by navigating between tabs
5. Use Settings tab to manipulate localStorage conditions

## 📞 Support

If you encounter issues:
1. Check status indicators (should all be green)
2. Check browser DevTools console for errors
3. Verify web server is running
4. Check that all files are present
5. Try clearing browser cache and reloading

---

**Created**: February 3, 2026
**Updated**: February 3, 2026
**Version**: 2.0 (React SPA)
