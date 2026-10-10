# PERF.md — Addis Eats Performance Report

## 1. Purpose

This document records the performance of Addis Eats before and after optimization.

The goal is to make the website load quickly, respond smoothly, and display content without unexpected layout movement.

## 2. Performance Targets

| Metric | Target |
|---|---|
| Largest Contentful Paint (LCP) | Less than 2.5 seconds |
| Cumulative Layout Shift (CLS) | Less than 0.1 |
| First Load JavaScript for `/menu` | Less than 120 kB |
| Largest image | Less than 150 kB |
| Lighthouse performance score | 90 or higher |

These are project targets, not measured results.

## 3. Baseline Measurements

Before optimization, run Lighthouse against the deployed website.

| Metric | Before optimization |
|---|---|
| LCP | Not measured |
| CLS | Not measured |
| First Load JavaScript for `/menu` | Not measured |
| Largest image size | Not measured |
| Lighthouse performance score | Not measured |

Replace these entries with actual measurements when available.

## 4. Optimizations to Investigate

### Images

- Use appropriately sized images.
- Compress large image files.
- Use Next.js Image where appropriate.
- Provide image dimensions to reduce layout shifts.
- Avoid loading unnecessary images immediately.

### Fonts

- Use optimized font loading.
- Avoid unnecessary font files and weights.

### JavaScript

- Keep components on the server unless client-side interaction is needed.
- Reduce unnecessary client-side JavaScript.
- Avoid unnecessary dependencies and repeated requests.

### Loading Experience

- Display useful content quickly.
- Reserve space for images and other elements.
- Handle loading and error states appropriately.

## 5. Measurements After Optimization

| Metric | Before | After |
|---|---|---|
| LCP | Not measured | Not measured |
| CLS | Not measured | Not measured |
| First Load JavaScript for `/menu` | Not measured | Not measured |
| Largest image size | Not measured | Not measured |
| Lighthouse performance score | Not measured | Not measured |

Update this table using real measurements from the same deployed route and testing conditions.

## 6. Verification

- [ ] Run Lighthouse before optimization.
- [ ] Record the baseline measurements.
- [ ] Apply performance improvements.
- [ ] Deploy the optimized version.
- [ ] Run Lighthouse again.
- [ ] Record the final measurements.
- [ ] Compare the results and explain what changed.

## 7. Results and Lessons

Complete this section after testing.

**Main performance problem:** Not measured yet.

**Optimization applied:** Not completed yet.

**Measured improvement:** Not measured yet.

**Remaining issues:** Not measured yet.
