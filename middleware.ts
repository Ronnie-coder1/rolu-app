import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/dashboard(.*)", 
  "/products(.*)",    
  "/cart(.*)",
  "/orders(.*)", 
  "/faq(.*)",       // Changed to lowercase to match typical URL patterns
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/uploadthing(.*)", // CRITICAL: Must be public
]);

const isAdminRoute = createRouteMatcher([
  "/dashboard/rolu-admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // 1. If it's NOT a public route, handle protection
  if (!isPublicRoute(req)) {
    const session = await auth();

    // Redirect to sign-in if no user
    if (!session.userId) {
      return session.redirectToSignIn();
    }

    // Admin Protection
    if (isAdminRoute(req)) {
      const role = (session.sessionClaims?.metadata as any)?.role;
      if (role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  }
  
  // 2. Let the request continue normally
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next|api/uploadthing).*)", // Explicitly ignore uploadthing here
    "/", 
    "/(api|trpc)(.*)"
  ],
};

