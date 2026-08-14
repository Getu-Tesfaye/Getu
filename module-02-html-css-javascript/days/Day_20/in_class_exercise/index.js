console.log("customer1: tibs")

function orderFood() {
    console.log("tibs start cooking")
    console.log("food")
    console.log("waiter serve food to customer 1")

}

// simulate asyn
setTimeout(function() {
   console.log("food is ready")
}, 2000);