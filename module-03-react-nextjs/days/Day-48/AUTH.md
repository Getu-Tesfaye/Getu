# AUTH.md — Addis Eats Security Plan

## 1. Purpose

This document explains how Addis Eats protects user accounts, orders, and private pages.

The goal is to ensure that users can access only the information and actions they are authorized to use.

## 2. Route Protection Plan

| Route | Who can access it? | Security checks |
|---|---|---|
| `/menu` | Everyone | Public page |
| `/orders` | Signed-in users viewing their own orders | Middleware, page-level authentication, and order ownership query |
| `/checkout` | Signed-in users | Middleware, page-level authentication, and server-side write validation |
| `/kitchen` | Authorized staff only | Page-level role check and role verification in every protected server action |
| `/login` | Everyone | Validate sign-in details and redirect destinations |

## 3. Three Layers of Protection

### Layer 1: Middleware

Middleware checks whether a user has a valid session before allowing access to protected routes.

It can redirect signed-out users to the login page.

Middleware is the first check, but it is not the only check.

### Layer 2: Page-Level Authentication and Authorization

Protected pages verify the signed-in user on the server.

For example:
- The orders page requires a signed-in user.
- The kitchen page requires an authorized staff role.

A user must not gain access simply by typing a private URL into the browser.

### Layer 3: Server Actions and Database Queries

Every protected server action must verify the user's identity and permissions.

Order queries must return only orders belonging to the signed-in user. Staff actions must verify the staff role.

Never trust an order ID, user ID, or role supplied by the browser.

Database access should also enforce appropriate ownership rules.

## 4. Required Security Tests

### Attack 1: Signed-Out User

**Test:** Sign out and attempt to call a protected server action.

**Expected result:** The action refuses the request because there is no valid signed-in user.

**Evidence:** Record the result after testing.

### Attack 2: Accessing Another User's Order

**Test:** Sign in as User A and try to access User B's order by changing the order ID.

**Expected result:** The request is denied or returns no order data. User A must never see or modify User B's order.

**Evidence:** Record the result after testing.

### Attack 3: Unsafe Login Redirect

**Test:** Open `/signin?next=https://example.com`.

**Expected result:** After successful sign-in, the application redirects to a safe internal page, such as `/`, rather than `https://example.com`.

**Evidence:** Record the result after testing.

## 5. Session and Authentication Rules

- Use a trusted authentication provider to manage sign-in and sessions.
- Verify the authenticated user on the server before accessing private data.
- Do not store secret credentials in browser-accessible code.
- Keep service-role keys and other server secrets out of client-side code.
- Validate all data received by server actions.
- Use environment variables for authentication configuration.
- Enforce database ownership rules wherever appropriate.

## 6. Verification Status

Do not mark a security test as passed until it has actually been performed.

| Security test | Status |
|---|---|
| Signed-out action is rejected | Not tested |
| Another user's order is inaccessible | Not tested |
| External login redirect is blocked | Not tested |
| Kitchen role restrictions work | Not tested |
