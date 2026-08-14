
let Bill = "200";
let partySize = 2;
let paymentMethod = "CBE Birr"; 

let bill = Number(Bill);


let tipRate = bill > 300 ? 0.10 : 0.05;
let tip = bill * tipRate;


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


let total = bill + tip + serviceFee;
let perPerson = total / partySize;

let result = `Bill: ${bill} ETB | Tip: ${tip} ETB | Fee: ${serviceFee} ETB | Total: ${total} ETB | Per Person: ${perPerson.toFixed(2)} ETB`;

console.log(result);





