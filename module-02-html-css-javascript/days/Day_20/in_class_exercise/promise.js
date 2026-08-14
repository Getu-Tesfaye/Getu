
const orderFood = new Promise((resolve, reject) => {
    const israwMeat = true;
    if (israwMeat) {
        resolve("raw meat is available");
    } else {
        reject("sorry raw meat is not available");
    }
});

orderFood
    .then((message) => {
        console.log("success message: " + message);
    })
    .catch((error) => {
        console.log("failed message: " + error);
    });

