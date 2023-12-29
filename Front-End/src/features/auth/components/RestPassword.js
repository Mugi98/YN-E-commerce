import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import logo from "../../../assests/Y-N E-commerce.jpg";
import { resetPasswordAsync, selectPasswordReset } from "../authSlice";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function ResetPasswords() {
  const dispatch = useDispatch();
  const passwordReset = useSelector(selectPasswordReset);
  const query = new URLSearchParams(window.location.search);
  const email = query.get("email");
  const token = query.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {email && token ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="bg-white shadow py-5">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-16 w-auto"
                src={logo}
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Enter your new password.
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  dispatch(
                    resetPasswordAsync({
                      email,
                      token,
                      password: data.password,
                    })
                  );
                })}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      New Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      {...register("password", {
                        required: "Password is required !",
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                          message: `Password is not valid !`,
                        },
                      })}
                      type="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors?.password && (
                      <p className="text-red-500 flex mt-1">
                        <ExclamationCircleIcon
                          className="h-6 w-6 mr-1"
                          aria-hidden="true"
                        ></ExclamationCircleIcon>
                        {errors?.password?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm New Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      {...register("confirmPassword", {
                        required: "Conmfirm password is required !",
                        validate: (value, formValues) =>
                          value === formValues.password ||
                          "Password not matching !",
                      })}
                      type="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors?.confirmPassword && (
                      <p className="text-red-500 flex mt-1">
                        <ExclamationCircleIcon
                          className="h-6 w-6 mr-1"
                          aria-hidden="true"
                        ></ExclamationCircleIcon>
                        {errors?.confirmPassword?.message}
                      </p>
                    )}
                    {passwordReset && (
                      <p className="text-green-500">
                        Password Reset Successfully!!!
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p>Link is incorrect</p>
      )}
    </>
  );
}
