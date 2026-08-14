const orderFood = new Promise((resolve, reject) => {
    let isAvailable = true;
    if (isAvailable) {
        resolve("Food is ready!");
    } else {
        reject("sorry raw meat is not available");
    }
});

orderFood
    .then((message) => {
        console.log("success message: " + message);
        document.getElementById("status").textContent = message;
    })
    .catch((error) => {
        console.log("failed message: " + error);
        document.getElementById("status").textContent = error;
    });