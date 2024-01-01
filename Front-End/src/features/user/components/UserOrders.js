import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrderAsync,
  selectUserOrders,
  fetchUserPaymentDetailsAsync,
  selectUserInfoStatus,
} from "../userSlice";
import { Grid } from "react-loader-spinner";

export default function UserOrders() {
  const dispatch = useDispatch();
  const [paymentIds, setPaymentIds] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectUserInfoStatus);

  const checkStatus = (status) => {
    switch (status) {
      case "pending":
        return 1;
      case "dispatched":
        return 2;
      case "delivered":
        return 3;
      case "cancelled":
        return 4;
      default:
        return 1;
    }
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "text-purple-600";
      case "dispatched":
        return "text-yellow-600";
      case "delivered":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-purple-600";
    }
  };

  const handleCardPayment = (PaymentByCardId, razorPayId) => {
    setOrderId(PaymentByCardId);
    setPaymentIds(razorPayId);
  };

  useEffect(() => {
    if ((paymentIds, orderId)) {
      dispatch(
        fetchUserPaymentDetailsAsync({
          paymentID: paymentIds,
          orderID: orderId,
        })
      );
    }

    dispatch(fetchLoggedInUserOrderAsync());
  }, [dispatch, paymentIds, orderId]);

  return (
    orders?.length > 0 && (
      <div>
        {orders.map((order) => (
          <div key={order.id}>
            <div>
              <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <h1
                    className="sm:text-xl text-4xl my-5 font-bold tracking-tight text-gray-900"
                    onClick={() => {
                      console.log(order);
                    }}
                  >
                    Order # {order?.id}
                  </h1>
                  <h3
                    className={`${chooseColor(
                      order?.status
                    )} text-xl my-5 font-bold tracking-tight`}
                  >
                    Order Status : {order?.status}
                  </h3>
                  <ol class="my-9 flex items-center w-full">
                    <li class="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                      {checkStatus(order?.status) >= 1 ? (
                        <span class="flex items-center justify-center w-10 h-10 bg-green-700 rounded-full lg:h-12 lg:w-12 dark:bg-green-700 shrink-0">
                          <svg
                            class="w-3.5 h-3.5 text-white dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 12"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5.917 5.724 10.5 15 1.5"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                          <svg
                            class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 20"
                          >
                            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                          </svg>
                        </span>
                      )}
                    </li>
                    <li class="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                      {checkStatus(order?.status) >= 2 ? (
                        <span class="flex items-center justify-center w-10 h-10 bg-green-700 rounded-full lg:h-12 lg:w-12 dark:bg-green-700 shrink-0">
                          <svg
                            class="w-3.5 h-3.5 text-white dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 12"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5.917 5.724 10.5 15 1.5"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                          <svg
                            class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 21 20"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m8.806 5.614-4.251.362-2.244 2.243a1.058 1.058 0 0 0 .6 1.8l3.036.356m9.439 1.819-.362 4.25-2.243 2.245a1.059 1.059 0 0 1-1.795-.6l-.449-2.983m9.187-12.57a1.536 1.536 0 0 0-1.26-1.26c-1.818-.313-5.52-.7-7.179.96-1.88 1.88-5.863 9.016-7.1 11.275a1.05 1.05 0 0 0 .183 1.25l.932.939.937.936a1.049 1.049 0 0 0 1.25.183c2.259-1.24 9.394-5.222 11.275-7.1 1.66-1.663 1.275-5.365.962-7.183Zm-3.332 4.187a2.115 2.115 0 1 1-4.23 0 2.115 2.115 0 0 1 4.23 0Z"
                            />
                          </svg>
                        </span>
                      )}
                    </li>
                    <li class="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                      {checkStatus(order?.status) >= 3 ? (
                        <span class="flex items-center justify-center w-10 h-10 bg-green-700 rounded-full lg:h-12 lg:w-12 dark:bg-green-700 shrink-0">
                          <svg
                            class="w-3.5 h-3.5 text-white dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 12"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5.917 5.724 10.5 15 1.5"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                          <svg
                            class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 19"
                          >
                            <path d="M10.013 4.175 5.006 7.369l5.007 3.194-5.007 3.193L0 10.545l5.006-3.193L0 4.175 5.006.981l5.007 3.194ZM4.981 15.806l5.006-3.193 5.006 3.193L9.987 19l-5.006-3.194Z" />
                            <path d="m10.013 10.545 5.006-3.194-5.006-3.176 4.98-3.194L20 4.175l-5.007 3.194L20 10.562l-5.007 3.194-4.98-3.211Z" />
                          </svg>
                        </span>
                      )}
                    </li>
                    <li class="flex items-center w-full">
                      {order?.status === "cancelled" ? (
                        <span class="flex items-center justify-center w-10 h-10 bg-red-700 rounded-full lg:h-12 lg:w-12 dark:bg-red-700 shrink-0">
                          <svg
                            class="w-3.5 h-3.5 text-white dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 12"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5.917 5.724 10.5 15 1.5"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                          <svg
                            class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                        </span>
                      )}
                    </li>
                  </ol>
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {order?.items?.map((item) => (
                        <li key={item.product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={item.product.id}>
                                    {item.product.title}
                                  </a>
                                </h3>
                                <div>
                                  <p className="ml-4 line-through text-gray-500">
                                    ${item.product.price}
                                  </p>
                                  <p className="ml-4">
                                    ${item.product?.discountedPrice}
                                  </p>
                                </div>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty :{item.quantity}
                                </label>
                              </div>

                              <div className="flex"></div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$ {order?.totalAmount}</p>
                  </div>
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Total Items in Cart</p>
                    <p>{order?.totalItems} items</p>
                  </div>
                  <div className="sm:block flex justify-between">
                    <div className="sm:mb-7">
                      <p className="my-2 text-base font-medium text-gray-900">
                        Shipping Address :
                      </p>
                      <div className="px-5 py-5 border-solid border-2 border-gray-200">
                        <div className="flex gap-x-4">
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {order?.selectedAddress.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {order?.selectedAddress.street}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {order?.selectedAddress.state}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {order?.selectedAddress.city}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {order?.selectedAddress.pinCode}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              Phone: {order?.selectedAddress.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="flex my-2 text-base gap-2 font-medium text-gray-900">
                        Payment Method
                        {order?.paymentMethod === "cash" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                            />
                            CASH
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                            />
                            CARD
                          </svg>
                        )}
                      </p>
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order?.paymentMethod === "card" ? (
                          <div key={order?.id}>
                            {order?.paymentByCard?.razorpay_payment_id && (
                              <div>
                                Payment ID:-
                                {order?.paymentByCard?.razorpay_payment_id}
                              </div>
                            )}
                            {order?.paymentByCard?.cardDetails?.network && (
                              <div>
                                Card Network:-
                                {order?.paymentByCard?.cardDetails?.network}
                              </div>
                            )}
                            {order?.paymentByCard?.cardDetails?.last4 && (
                              <div>
                                Card Number:- **** **** ****{" "}
                                {order?.paymentByCard?.cardDetails?.last4}
                              </div>
                            )}
                            {order?.paymentByCard?.cardDetails?.type && (
                              <div>
                                Card Type:-
                                {order?.paymentByCard?.cardDetails?.type}
                              </div>
                            )}
                            <div className="flex justify-center">
                              <button
                                className="mt-10 flex w-1/2 items-center justify-center rounded-md border border-transparent bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() =>
                                  handleCardPayment(
                                    order.paymentByCard?.id,
                                    order?.paymentByCard?.razorpay_payment_id
                                  )
                                }
                              >
                                Show Card
                              </button>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {status === "loading" ? (
          <Grid
            height="80"
            width="80"
            color="rgb(79, 70, 229) "
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : null}
      </div>
    )
  );
}
