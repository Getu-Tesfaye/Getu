// Sample Inputs
let Bill = "200";
let partySize = 2;
let paymentMethod = "CBE Birr"; // Options: "TeleBirr", "CBE Birr", 

// Step 1: Convert the bill with Number()
let bill = Number(Bill);

// Step 2: Add a 10% tip when the bill is over 300 ETB, else 5%
let tipRate = bill > 300 ? 0.10 : 0.05;
let tip = bill * tipRate;

// Step 3: Use a switch to add a TeleBirr / CBE Birr service fee
let serviceFee = 0;
switch (paymentMethod) {
    case "CBE Birr":
        serviceFee = 10;
        break;
    case "Telebirr":
        serviceFee = 5;
        break;
    default:
        serviceFee = 0;
        break;
}

// Step 4: Compute the total and per-person amount
let total = bill + tip + serviceFee;
let perPerson = total / partySize;

// Step 5: Print a clear message with a template
let result = `Bill: ${bill} ETB | Tip: ${tip} ETB | Fee: ${serviceFee} ETB | Total: ${total} ETB | Per Person: ${perPerson.toFixed(2)} ETB`;

console.log(result);





