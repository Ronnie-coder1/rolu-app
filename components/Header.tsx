"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import CartIcon from "@/components/cart/CartIcon";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="flex justify-between items-center p-4 h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl sm:text-2xl font-extrabold">
          <span className="text-orange-400">Rolu.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <span className="text-blue-500">
            <Link href="/faq">FAQ</Link>
          </span>
          <Link href="/products">Products</Link>
            <Link href="/orders">Orders</Link>

          {/* Cart with dynamic badge */}
          <Link href="/cart" className="flex items-center gap-2">
            <CartIcon />
            Cart
          </Link>

          <SignedIn>
            <Link href="/dashboard">Dashboard</Link>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="redirect">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="redirect">
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden z-50 relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
         <div className="md:hidden flex flex-col gap-4 p-4 border-t bg-white z-50 relative">
          <span className="text-blue-500">
          <Link href="/faq" onClick={() => setIsOpen(false)}>
            FAQ
          </Link>
          </span>
          <Link href="/products" onClick={() => setIsOpen(false)}>
            Products
          </Link>
           <Link href="/orders" onClick={() => setIsOpen(false)}>
          Orders
          </Link>

          <Link href="/cart" className="flex items-center gap-2">
            <CartIcon />
            Cart
          </Link>

          <SignedIn>
            <Link href="/dashboard">Dashboard</Link>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="redirect">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="redirect">
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      )}
    </header>
  );
}