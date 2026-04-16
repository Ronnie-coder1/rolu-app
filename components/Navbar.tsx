import CartIcon from "@/components/cart/CartIcon";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center p-4 shadow-md">
      <h1 className="text-xl font-bold">Rolu.</h1>
      <CartIcon />
      
    </header>
  );
}