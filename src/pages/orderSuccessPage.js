import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";
import { Link } from "react-router-dom";

function OrderSuccessPage() {
  const orderPlaced = useSelector(selectCurrentOrder);

  const totalDiscountedPrice = orderPlaced?.items.reduce(
    (total, orderPlaced) => {
      const discountedAmount =
        (orderPlaced.discountPercentage / 100) * orderPlaced.price;
      return Math.round(total + (orderPlaced.price - discountedAmount));
    },
    0
  );
  const eighteenPercent = Math.round((18 / 100) * totalDiscountedPrice);
  const total = orderPlaced.totalAmount + eighteenPercent;

  return (
    <div>
      <div></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-12 bg-white max-w-7xl px-2 sm:px-2 lg:px-4">
          <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              Payment successful
            </p>
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Thanks for ordering
            </h1>
            <p className="text-gray-500">
              We appreciate your order, we’re currently processing it. So hang
              tight and we’ll send you confirmation very soon!
            </p>
            <div className="flex py-7 border-b border-gray-200">
              <h1 className="text-4xl">Order #{orderPlaced.id}</h1>
            </div>
            <div className="flow-root">
              <ul className="-my-6 pt-5 divide-y divide-gray-200">
                {orderPlaced?.items?.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item?.thumbnail}
                        alt={item?.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item?.id}>{item?.title}</a>
                          </h3>
                          <div>
                            <p className="ml-4">${item?.price}</p>
                            <p className="ml-4">
                              $
                              {Math.round(
                                item?.price *
                                  (1 - item?.discountPercentage / 100)
                              )}
                            </p>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item?.brand}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Qty : {item?.quantity}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
            <div className="flex justify-between pb-6 my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$ {orderPlaced?.totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Your Saving</p>
              <p className="text-green-500">${totalDiscountedPrice}</p>
            </div>
            <div className="flex justify-between pb-6 my-2 text-base font-medium text-gray-900">
              <p>Shipping</p>
              <p className="text-green-500">FREE</p>
            </div>
            <div className="flex border-b border-gray-200 justify-between pb-6 my-2 text-base font-medium text-gray-900">
              <p>Taxes</p>
              <p className="">{eighteenPercent}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total</p>
              <p>${total - totalDiscountedPrice}</p>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
