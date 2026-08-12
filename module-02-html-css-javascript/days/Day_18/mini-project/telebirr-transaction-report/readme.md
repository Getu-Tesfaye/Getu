1`filter()`: Separates credit and debit transactions.
2. `reduce()`: Accumulates transaction totals.
3. `map()`: Transforms transaction objects into printable receipt strings.
4. Object Destructuring: Extracts `customer` and `amount` directly inside callback parameters.
5. Template Literals: Constructs formatted strings (`${variable}`).
6. Spread Syntax (`...`): Creates modified object copies without mutating originals.



`transactions.js`: Defines and exports the initial list of transaction objects.
- `report.js`: Contains pure utility functions for filtering, totaling, receipt formatting, and copying objects.
- `app.js`: Main execution file that imports data and functions to run the report and output results to the console.