export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    try {
      const responseOrders = await fetch("http://localhost:8080/orders/own/");
      const dataOrders = await responseOrders.json();

      // Assuming you have the necessary paymentID and orderID in your orders data
      const paymentDetailsPromises = dataOrders.map((order) =>
        fetchUserPaymentDetails({
          paymentID: order.paymentByCard.razorpay_payment_id,
          orderID: order.paymentByCard.id,
        })
      );

      // Fetch payment details concurrently
      const paymentDetails = await Promise.all(paymentDetailsPromises);

      // Combine order data with payment details
      const combinedData = dataOrders.map((order, index) => ({
        ...order,
        paymentDetails: paymentDetails[index].data,
      }));
      resolve({ data: combinedData });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      resolve({ error: "Internal Server Error" });
    }
  });
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/own");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchUserPaymentDetails(paymentID) {
  console.log(paymentID.paymentID, paymentID.orderID);
  return new Promise(async (resolve) => {
    const queryParams = new URLSearchParams({
      paymentID: paymentID.paymentID,
      orderID: paymentID.orderID,
    });
    const response = await fetch(
      `http://localhost:8080/payment/?${queryParams}`
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
