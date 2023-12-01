import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  //TODO: We will add payment section when we work on backend.

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };
  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
    setValue("phone", address.phone);
    setValue("street", address.street);
  };

  const handleAdd = (address) => {
    const newUser = { ...user, addresses: [...user.addresses, address] };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  };

  return (
    <div>
      <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
            Name: {user.name ? user.name : "New User"}
          </h1>
          <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
            email address : {user.email}
          </h3>
          {user.role === "admin" && (
            <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
              role : {user.role}
            </h3>
          )}
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <button
            onClick={(e) => {
              setShowAddAddressForm(true);
              setSelectedEditIndex(-1);
            }}
            type="submit"
            className="rounded-md my-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add New Address
          </button>
          {showAddAddressForm ? (
            <form
              className="bg-white px-5 py-12 mt-12"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                handleAdd(data);
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "name is required",
                          })}
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "street is required",
                          })}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.street && (
                          <p className="text-red-500">
                            {errors.street.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.city && (
                          <p className="text-red-500">{errors.city.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "state is required",
                          })}
                          id="state"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.state && (
                          <p className="text-red-500">{errors.state.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "pinCode is required",
                          })}
                          id="pinCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.pinCode && (
                          <p className="text-red-500">
                            {errors.pinCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
          ) : null}

          <p className="mt-0.5 text-sm text-gray-500">Your Addresses :</p>
          {user.addresses.map((address, index) => (
            <div>
              {selectedEditIndex === index ? (
                <form
                  className="bg-white px-5 py-12 mt-12"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    console.log(data);
                    handleEdit(data, index);
                    reset();
                  })}
                >
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive mail.
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Full name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("name", {
                                required: "name is required",
                              })}
                              id="name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.name && (
                              <p className="text-red-500">
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              {...register("email", {
                                required: "email is required",
                              })}
                              type="email"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.email && (
                              <p className="text-red-500">
                                {errors.email.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Phone
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              {...register("phone", {
                                required: "phone is required",
                              })}
                              type="tel"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.phone && (
                              <p className="text-red-500">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("street", {
                                required: "street is required",
                              })}
                              id="street"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.street && (
                              <p className="text-red-500">
                                {errors.street.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("city", {
                                required: "city is required",
                              })}
                              id="city"
                              autoComplete="address-level2"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.city && (
                              <p className="text-red-500">
                                {errors.city.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("state", {
                                required: "state is required",
                              })}
                              id="state"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.state && (
                              <p className="text-red-500">
                                {errors.state.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="pinCode"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("pinCode", {
                                required: "pinCode is required",
                              })}
                              id="pinCode"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.pinCode && (
                              <p className="text-red-500">
                                {errors.pinCode.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        onClick={(e) => setSelectedEditIndex(-1)}
                        type="submit"
                        className="rounded-md px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit Address
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}
              <div className="flex my-5 justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {address.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.street}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.city}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.state}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.pinCode}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      Phone: {address.phone}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={(e) => handleEditForm(index)}
                    type="button"
                    className="pr-5 font-medium text-indigo-600 hover:text-indigo-500"
                  >
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => handleRemove(e, index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
