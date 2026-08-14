Requirements
-  central `items` array.
- Create a `render()` function that builds the DOM elements directly from the `items` array.
-  form submit with `preventDefault()`, read input value, push to `items`, and call `render()`.
- Delegate click events on the `<ul>` element to handle toggling item state and deleting rows.
- Use `data-id` on each `<li>` row to locate items inside the state array.
- Toggle completion state using CSS classes (e.g., `.done`).