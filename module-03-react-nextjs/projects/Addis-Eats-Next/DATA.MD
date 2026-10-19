# DATA.md — Addis Eats Data Strategy

## 1. Purpose

This document explains how Addis Eats loads, stores, and refreshes data.

The goal is to make the application responsive while keeping private user data secure.

## 2. Data Fetching Plan

| Data | Where it loads | Cache or storage | Refresh rule | Reason |
|---|---|---|---|---|
| Menu and dishes | Server | Public cache when safe | Refresh when menu data changes | Everyone can browse dishes |
| User orders | Server | Private; scoped to the signed-in user | Load when the orders page opens | Users must see only their own orders |
| Order status | Server first, then client polling | Private | Poll every 5 seconds | Customers can track order progress |
| Menu search | Client | SWR cache when configured | Debounce typing before requesting data | Avoid unnecessary requests |
| Cart | Client | Browser storage or application state | Update when items change | Keep the shopping experience responsive |
| Authentication session | Authentication provider and server | Secure session mechanism | Check when protected data or actions are accessed | Identify the current user |

## 3. Server and Client Responsibilities

### Server

The server should:
- Load public menu data.
- Verify the signed-in user before loading private orders.
- Filter orders by the authenticated user's identity.
- Validate data before creating or updating orders.
- Check staff permissions before kitchen actions.

### Client

The client should:
- Display menu search results.
- Manage cart interactions.
- Poll for order-status updates.
- Show loading, success, and error states when appropriate.

The client must not decide by itself whether a user is authorized to access private data.

## 4. SWR and Refreshing

SWR can cache fetched data and revalidate it when configured to do so.

For this project:
- Debounce menu search so a request is not sent for every keystroke.
- Use a null SWR key when the search input is empty if no request is needed.
- Keep previous results visible while a new search loads when appropriate.
- Poll order status every 5 seconds.
- Seed the orders page with server-loaded data when supported by the implementation.

The actual SWR keys, fallback data, and refresh settings must match the code.

## 5. Data Security

- Public menu data may be shared with visitors.
- Private order data must be scoped to the authenticated user.
- Never trust a user ID or order owner ID supplied by the client.
- Validate all order creation and update requests on the server.
- Enforce database access policies where supported.
- Never expose server secrets in browser code.

## 6. Verification Checklist

- [ ] Menu loads correctly.
- [ ] Search requests are debounced.
- [ ] Search does not request data when the search key is disabled.
- [ ] Order status refreshes every 5 seconds.
- [ ] The orders page starts with server-provided data.
- [ ] A user cannot retrieve another user's orders.
- [ ] Errors are handled without exposing private information.

## 7. Implementation Notes

Update this document after checking the actual code.

Record the real SWR keys, API routes, refresh intervals, database queries, and authentication method used by the application. Do not document a feature as completed until it has been verified.
