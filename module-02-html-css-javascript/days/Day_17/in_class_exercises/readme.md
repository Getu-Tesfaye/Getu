

A modular JavaScript utility for managing order totals, discounts, taxes, and receipt numbers using pure functions and closures.

* `subtotal(...prices)` – Calculates total price for any number of items.
* `discountBy(rate)` – Returns a function to apply percentage discounts.
* `withVat(amount, vatRate = 0.3)` – Calculates total price including VAT.
* `toETB(amount)` – Formats numbers to Ethiopian Birr currency (`0.00 ETB`).
* `makeReceiptMaker()` – Tracks order counter and formats receipt output strings.