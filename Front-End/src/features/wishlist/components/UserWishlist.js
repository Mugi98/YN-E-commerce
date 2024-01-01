import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromWishlistAsync,
  selectWishlist,
  selectWishlistStatus,
} from "../wishlistSlice";
import { StarIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import { useEffect, useState } from "react";

export default function UserWishlist() {
  const dispatch = useDispatch();
  const items = useSelector(selectWishlist);
  const status = useSelector(selectWishlistStatus);

  const [dynamicStyles, setDynamicStyles] = useState({
    position: "absolute",
    top: "12px",
    right: "12px",
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setDynamicStyles({
          position: "relative",
          top: "15px",
          left: "85%",
        });
      } else {
        setDynamicStyles({
          position: "absolute",
          top: "12px",
          right: "12px",
        });
      }
    };

    // Initial setup
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dynamicStyles]);

  const handleRemove = (e, itemId) => {
    dispatch(deleteItemFromWishlistAsync(itemId));
  };

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
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
                    {items?.map((product) => (
                      <div
                        onClick={(e) => {
                          handleRemove(e, product?.id);
                        }}
                        key={product?.product?.id}
                        className="group relative border-solid border-2 p-2 border-gray-200"
                      >
                        <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                          <img
                            src={product?.product?.thumbnail}
                            alt={product?.product?.title}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          />
                          <button style={dynamicStyles}>
                            <TrashIcon className="w-5 h-5 text-red-500" />
                          </button>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              <div href={product?.product?.id}>
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                {product?.product?.title}
                              </div>
                            </h3>
                            <p className="mt-1 text-sm text-gray-900 font-bold">
                              {product?.product?.brand}
                            </p>
                            <p className="mt-1 text-sm whitespace-nowrap">
                              {product?.product?.stock > 0 ? (
                                <span className="text-green-500">In Stock</span>
                              ) : (
                                <span className="text-red-500">
                                  Out of Stock
                                </span>
                              )}
                            </p>
                          </div>
                          <div>
                            <div>
                              <p className="text-sm font-medium text-gray-500 text-end whitespace-nowrap">
                                <span className="line-through pe-1 ">
                                  $ {product?.product?.price}
                                </span>
                                (
                                {Math.round(
                                  product?.product?.discountPercentage
                                )}
                                % Off)
                              </p>
                              <p className="text-sm font-medium text-gray-900 text-end whitespace-nowrap">
                                <span>
                                  ${product?.product?.discountedPrice}
                                </span>
                              </p>
                            </div>
                            <p className="text-sm flex justify-end pt-2 items-center gap-x-1.5 text-gray-900">
                              <StarIcon className="w-4 h-4 inline"></StarIcon>
                              <span className="align-bottom">
                                {product?.product?.rating}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
