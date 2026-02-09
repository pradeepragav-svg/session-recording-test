# Testing State Update Implementation

## What Was Implemented

Added state processing logic in `WfxSessionRecordingRulesEvaluator` to handle evaluation results from Customization Engine:

### New Methods

1. **`processEvaluationResults(results: EvaluateVisibilityRulesResponse[])`**
   - Maps CE results to internal rule states
   - Applies aggregation strategy
   - Updates `this.state` with aggregated result and timestamp

2. **`applyAggregationStrategy(ruleStates: WfxSessionRecordingRuleState[])`**
   - `ALL_MUST_PASS`: All rules must return true
   - `ANY_CAN_PASS`: At least one rule must return true
   - `FIRST_RULE_WINS`: Only first rule matters

## How to Test

### 1. Start Local Server

```bash
cd /Users/pradeep/Documents/git/session_recorder/my-test-environment
python3 -m http.server 8000
```

### 2. Open Test Page

Navigate to: `http://localhost:8000/index.html`

### 3. Wait for Modules to Load

You should see:
- ✓ Embed initialized successfully
- ✓ CE initialized successfully
- ✓ SR initialized successfully

### 4. Click "Evaluate Mock Rules" Button

This will:
1. Load mock rules from `mock-rules.json`
2. Set rules on the evaluator
3. Fire `VisibilityRulesEvaluateEvent` to CE
4. CE evaluates and fires back `VisibilityRulesEvaluatedEvent`
5. SR processes results and updates state

## Expected Console Output

### Browser Console (F12)

#### First Evaluation (Initial State)

```javascript
[WfxSessionRecordingRulesEvaluator] Received VisibilityRulesEvaluatedEvent
[WfxSessionRecordingRulesEvaluator] Event payload: {
  groupType: "session-recorder",
  hasResults: true,
  resultCount: 3,
  timestamp: 1738515234567
}

[WfxSessionRecordingRulesEvaluator] Processing evaluation results...

[WfxSessionRecordingRulesEvaluator] Strategy: ALL_MUST_PASS => false

[WfxSessionRecordingRulesEvaluator] State updated: {
  aggregatedResult: false,
  previousResult: false,
  resultChanged: false,
  strategy: "ALL",
  ruleCount: 3,
  passedCount: 1
}

[WfxSessionRecordingRulesEvaluator] ⏸️  Result unchanged: false

[WfxSessionRecordingRulesEvaluator] Evaluation results:
  Array(3) [
    {
      visibility_id: "b2d62652-41b4-47eb-858d-aab8a54f7b3b",
      evalStatus: false,
      parent_id: "session_recorder:mock_rule_1",
      group_type: "session-recorder"
    },
    {
      visibility_id: "c8e73763-52c5-48fc-969e-6eb9b65a8c4c",
      evalStatus: true,
      parent_id: "session_recorder:mock_rule_2",
      group_type: "session-recorder"
    },
    {
      visibility_id: "d9f84874-63d6-59fd-a7ae-7fc0c76b9d5d",
      evalStatus: false,
      parent_id: "session_recorder:mock_rule_3",
      group_type: "session-recorder"
    }
  ]

[WfxSessionRecordingRulesEvaluator] ✗ Rules failed - should STOP recording
```

### Why Rules Failed

**Current Strategy**: `ALL_MUST_PASS`

**Rule Results**:
- Rule 1 (URL contains "pii"): ❌ FAILED - URL doesn't contain "pii"
- Rule 2 (URL contains "my-test-environment"): ✅ PASSED - URL matches
- Rule 3 (URL + localStorage.test_sr == 1): ❌ FAILED - localStorage not set

**Aggregated Result**: `false` (not all rules passed)

## Testing Different Scenarios

### Scenario 1: Make Rule 3 Pass (Result Should NOT Change)

Set the localStorage value:

```javascript
localStorage.setItem('test_sr', '1');
```

Click "Evaluate Mock Rules" again.

**Expected**:
- Rule 2: ✅ PASSED
- Rule 3: ✅ PASSED (now passes!)
- Rule 1: ❌ FAILED (still fails)
- Aggregated: `false` (Rule 1 still fails, ALL_MUST_PASS requires all)
- **Result Changed**: `false` → `false` = NO CHANGE

**Console Output**:
```javascript
[WfxSessionRecordingRulesEvaluator] State updated: {
  aggregatedResult: false,
  previousResult: false,
  resultChanged: false,  // ← NO CHANGE
  strategy: "ALL",
  ruleCount: 3,
  passedCount: 2  // ← Two rules passed now
}

[WfxSessionRecordingRulesEvaluator] ⏸️  Result unchanged: false
[WfxSessionRecordingRulesEvaluator] ✗ Rules failed - should STOP recording
```

### Scenario 2: Change Aggregation Strategy (Result WILL Change!)

In `src/ts/index.ts`, change:

```typescript
// From:
RuleAggregationStrategy.ALL_MUST_PASS

// To:
RuleAggregationStrategy.ANY_CAN_PASS
```

Rebuild (`npm run build`) and test.

**Expected**:
- Rule 2: ✅ PASSED
- Aggregated: `true` (at least one rule passed)
- **Result Changed**: `false` → `true` = **CHANGED!** 🔄

**Console Output**:
```javascript
[WfxSessionRecordingRulesEvaluator] Strategy: ANY_CAN_PASS => true

[WfxSessionRecordingRulesEvaluator] State updated: {
  aggregatedResult: true,
  previousResult: false,
  resultChanged: true,  // ← CHANGED!
  strategy: "ANY",
  ruleCount: 3,
  passedCount: 1
}

[WfxSessionRecordingRulesEvaluator] 🔄 Result CHANGED: false → true

// TODO: Fire evaluation result change event will be triggered here

[WfxSessionRecordingRulesEvaluator] ✓ Rules passed - should START recording
```

### Scenario 3: Inspect Current State

In browser console:

```javascript
// Get current evaluator state
const state = window.embed_$.WFX.SessionRecorder.getEvaluatorState();
console.log('Current State:', JSON.stringify(state, null, 2));
```

**Expected Output**:

```json
{
  "result": false,
  "aggregation_strategy": "ALL",
  "rule_states": [
    {
      "visibility_id": "b2d62652-41b4-47eb-858d-aab8a54f7b3b",
      "rule_index": 0,
      "result": false,
      "parent_id": "session_recorder:mock_rule_1",
      "group_type": "session-recorder"
    },
    {
      "visibility_id": "c8e73763-52c5-48fc-969e-6eb9b65a8c4c",
      "rule_index": 1,
      "result": true,
      "parent_id": "session_recorder:mock_rule_2",
      "group_type": "session-recorder"
    },
    {
      "visibility_id": "d9f84874-63d6-59fd-a7ae-7fc0c76b9d5d",
      "rule_index": 2,
      "result": false,
      "parent_id": "session_recorder:mock_rule_3",
      "group_type": "session-recorder"
    }
  ],
  "timestamp": 1738515234567
}
```

## Verifying State is Updated

Run this sequence in browser console:

```javascript
// 1. Get initial state (should be null before evaluation)
console.log('Before:', window.embed_$.WFX.SessionRecorder.getEvaluatorState());

// 2. Trigger evaluation (via button or programmatically)
document.getElementById('evaluateRulesBtn').click();

// 3. Wait a moment for evaluation to complete
setTimeout(() => {
  // 4. Get updated state
  const state = window.embed_$.WFX.SessionRecorder.getEvaluatorState();
  console.log('After:', state);

  // Verify state properties
  console.assert(state !== null, 'State should not be null');
  console.assert(state.hasOwnProperty('result'), 'State should have result');
  console.assert(state.hasOwnProperty('aggregation_strategy'), 'State should have strategy');
  console.assert(Array.isArray(state.rule_states), 'State should have rule_states array');
  console.assert(state.rule_states.length === 3, 'Should have 3 rule states');
  console.assert(state.hasOwnProperty('timestamp'), 'State should have timestamp');

  console.log('✓ All state assertions passed');
}, 1000);
```

## Testing Result Change Detection

To see the result change detection in action, follow this sequence:

### Test Sequence: Toggling Result from `false` → `true`

1. **Initial state** (page load): `result = false`
2. **Click "Evaluate Mock Rules"**: Result stays `false` (1/3 rules pass with ALL_MUST_PASS)
   - Console shows: `⏸️ Result unchanged: false`
3. **Change to ANY_CAN_PASS strategy** and rebuild
4. **Click "Evaluate Mock Rules"** again: Result changes to `true`
   - Console shows: `🔄 Result CHANGED: false → true`
   - **TODO comment fires**: "Fire evaluation result change event"

### Test Sequence: Toggling Result from `true` → `false`

1. **With ANY_CAN_PASS strategy**: `result = true`
2. **Click "Evaluate Mock Rules"**: Result stays `true`
   - Console shows: `⏸️ Result unchanged: true`
3. **Remove localStorage.test_sr** to make all rules but one fail
4. **Manually delete Rule 2** from mock-rules.json (only passing rule)
5. **Click "Evaluate Mock Rules"**: Result changes to `false`
   - Console shows: `🔄 Result CHANGED: true → false`
   - **TODO comment fires**: "Fire evaluation result change event"

### Quick Test in Browser Console

```javascript
// Function to watch state changes
function watchStateChanges() {
  let lastResult = null;

  setInterval(() => {
    const state = window.embed_$.WFX.SessionRecorder.getEvaluatorState();
    if (state && state.result !== lastResult) {
      console.log('🔄 DETECTED STATE CHANGE:', {
        from: lastResult,
        to: state.result,
        timestamp: new Date(state.timestamp).toLocaleTimeString()
      });
      lastResult = state.result;
    }
  }, 500);
}

// Start watching
watchStateChanges();

// Now click "Evaluate Mock Rules" multiple times with different conditions
```

## Next Steps (TODO)

The state processing with change detection is now working. Next tasks:

1. ✅ **Result Change Detection**: COMPLETE - Tracks when `state.result` toggles
   - Location: `processEvaluationResults()` lines 388-453
   - Status: Implemented with `previousResult` comparison

2. **Fire Evaluation Result Change Event**: TODO (marked in code)
   - Location: `processEvaluationResults()` lines 443-450
   - Purpose: Notify other parts of system when recording state toggles
   - Event payload should include:
     - `previousResult: boolean`
     - `currentResult: boolean`
     - `timestamp: number`
     - `rule_states: WfxSessionRecordingRuleState[]`
     - `aggregation_strategy: RuleAggregationStrategy`

3. **Recording Control**: Implement actual start/stop recording based on `state.result`
   - Location: `processEvaluationResults()` lines 455-462
   - Current: Just logs "should START/STOP recording"
   - Needed: Call actual recording lifecycle methods

4. **Continuous Monitoring**: Re-evaluate on URL changes
   - Monitor `popstate`, `pushState`, `replaceState` events
   - Call `evaluate()` when URL changes

5. **Error Handling**: Add more robust error handling for edge cases

6. **Performance**: Optimize for large rule sets

---

**Date**: February 2, 2026
**Status**: ✅ State update with change detection complete and built
**Location**: `src/ts/rules/evaluation/WfxSessionRecordingRulesEvaluator.ts:379-486`
**Latest**: Added `resultChanged` tracking and TODO for firing evaluation result change event
