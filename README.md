# Reveel Pay(ID) ElizaOS Plugin


Certainly! I'll create documentation based on the testSuite that explains how to test the library using the example messages. Here's the markdown documentation:

```markdown
# Testing the PayID Plugin Library

This guide explains how to test the PayID Plugin library using the provided test suite.

## Overview

The test suite is designed to simulate various user interactions with the PayID system. Each test case in the suite represents a specific functionality or user action.

## Test Suite Structure

The test suite is defined in `src/tests.ts` and consists of multiple test cases under the main suite named 'payid-plugin'.

## Running Tests

To run the tests, you'll need to set up a runtime environment that implements the `IAgentRuntime` interface. The tests use this runtime to process actions and simulate user interactions.

## Example Test Cases

### 1. Searching for PayIDs

**Test Name:** 'search-andree'

**Example Message:**
```typescript
{
    text: 'list all similar Pay(ID) for andree',
    source: 'test',
    actions: ['SEARCH_PAYID']
}
```

**How to Test:**
1. Create a runtime instance.
2. Call the test function with this runtime.
3. The test will simulate a user searching for PayIDs similar to "andree".
4. Check the console output for the search results.

### 2. Signing In with Email

**Test Name:** 'signin-with-email'

**Example Message:**
```typescript
{
    text: 'Sign in with email: fernando@r3vl.xyz',
    source: 'test',
    actions: ['SIGNIN_WITH_FB']
}
```

**How to Test:**
1. Use the same runtime instance.
2. Call this test function.
3. It simulates a user signing in with the email "fernando@r3vl.xyz".
4. Check the console for the sign-in response.

### 3. Getting PayID Routes

**Test Name:** 'get-pay-id-routes'

**Example Message:**
```typescript
{
    text: 'get Pay(ID) routes for current user',
    source: 'test',
    actions: ['GET_USER_ROUTES']
}
```

**How to Test:**
1. Ensure you're using a runtime with a signed-in user.
2. Run this test function.
3. It simulates fetching PayID routes for the current user.
4. Verify the returned routes in the console output.

### 4. Getting Transaction History

**Test Name:** 'get-pay-id-tx-history'

**Example Message:**
```typescript
{
    text: 'get transaction history for current user',
    source: 'test',
    actions: ['GET_USER_TX_HISTORY']
}
```

**How to Test:**
1. Use a runtime with a signed-in user.
2. Execute this test function.
3. It simulates retrieving the transaction history.
4. Check the console for the transaction history data.

## General Testing Process

1. Set up a test runtime implementing `IAgentRuntime`.
2. For each test case:
   a. Create a message object as shown in the examples.
   b. Call the test function with your runtime.
   c. The test will process the message and attempt to trigger the relevant action.
   d. If the action isn't automatically triggered, the test will manually execute it.
   e. Check the console output for the results.

## Error Handling

Each test includes error handling. If an expected action is not found in the runtime, the test will throw an error indicating which action is missing.

## Extending the Tests

To add new test cases:
1. Follow the existing pattern in `src/tests.ts`.
2. Create a new test object with a unique name.
3. Define the test function, simulating the desired user interaction.
4. Add appropriate assertions or logging to verify the results.

Remember to update this documentation when adding new test cases to keep it in sync with the actual test suite.
```

This documentation provides a comprehensive guide on how to use the example messages in the test suite to test the PayID Plugin library. It covers the structure of the tests, how to run them, and gives specific examples for each test case currently in the suite.
