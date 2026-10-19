export async function placeOrder(order) {
  console.log("Order received:", order);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    message: "Order placed successfully"
  };
}