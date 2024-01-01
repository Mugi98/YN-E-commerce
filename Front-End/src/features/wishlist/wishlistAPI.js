export function addToWishlist(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/wishlist", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function fetchWishlistByUserId() {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch("/wishlist/own");
    const data = await response.json();
    console.log(data, "DATATA");
    resolve({ data });
  });
}

export function deleteItemFromWishlist(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/wishlist/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data: { id: itemId } });
  });
}
