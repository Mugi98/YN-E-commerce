/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectItems,
  selectcartLoaded,
  updateCartAsync,
  selectCartStatus,
} from "./cartSlice";
import { Grid } from "react-loader-spinner";
import Modal from "../../common/Modal";
import emptyCart from "../../assests/emptyCart.jpg";

export default function Cart() {
  const items = useSelector(selectItems);
  const status = useSelector(selectCartStatus);
  const cartLoaded = useSelector(selectcartLoaded);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(null);

  const totalAmount = items.reduce(
    (amount, item) => item?.product?.discountedPrice * item?.quantity + amount,
    0
  );

  const handleQuantity = (e, item) => {
    dispatch(
      updateCartAsync({
        id: item?.id,
        quantity: +e?.target?.value,
      })
    );
  };

  const handleRemove = (e, itemId) => {
    dispatch(deleteItemFromCartAsync(itemId));
  };

  return (
    <>
      {!(items?.length === 0) ? (
        <div className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white shadow">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 py-4">
            Shopping Cart
          </h1>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flow-root">
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
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item?.product?.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item?.product?.thumbnail}
                        alt={item?.product?.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item?.product?.id}>
                              {item?.product?.title}
                            </a>
                          </h3>
                          <div>
                            <p className="ml-4 line-through text-gray-500">
                              ${item?.product?.price}
                            </p>
                            <p className="ml-4">
                              ${item?.product?.discountedPrice}
                            </p>
                          </div>
                        </div>

                        <p className="mt-1 text-sm text-gray-500">
                          {item?.product?.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-green-900"
                          >
                            Qty
                          </label>
                          <select
                            onChange={(e) => handleQuantity(e, item)}
                            value={item?.quantity}
                            className="leading-4"
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>

                        <div className="flex">
                          <Modal
                            title={`Delete ${item?.product?.title}`}
                            message="Are you sure you want to delete this Cart item ?"
                            dangerOption="Delete"
                            cancelOption="Cancel"
                            dangerAction={(e) => handleRemove(e, item?.id)}
                            cancelAction={() => setOpenModal(null)}
                            showModal={openModal === item?.id}
                          ></Modal>
                          <button
                            onClick={(e) => handleRemove(e, item?.product?.id)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
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
              <p>${totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total</p>
              <p>${totalAmount}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    &nbsp; Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-6 flex justify-center text-sm text-gray-500">
            <img
              className="lg:w-1/3"
              src={emptyCart}
              onClick={(e) => console.log(items)}
              alt="emptyCart"
            />
          </div>
          <p className="mt-5 flex justify-center">
            <Link to="/">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                &nbsp; Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </>
      )}
    </>
  );
}
