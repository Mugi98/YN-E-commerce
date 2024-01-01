import NavBar from "../features/navbar/Navbar";
import UserWishlist from "../features/wishlist/components/UserWishlist";

function UserWishlistPage() {
  return (
    <div>
      <NavBar>
        <h1 className="mx-auto text-2xl">My Wishlist</h1>
        <UserWishlist></UserWishlist>
      </NavBar>
    </div>
  );
}

export default UserWishlistPage;
