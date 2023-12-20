import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in"],
  afterAuth(auth, req) {
    // 沒登入的使用者
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth.userId && auth.userId === "user_2ZTg1sqwuuibR8c65tI3kPtoSpU") {
      return NextResponse.rewrite(new URL("/admin", req.url));
    }

    if (auth.userId && auth.userId !== "user_2ZTg1sqwuuibR8c65tI3kPtoSpU") {
      return NextResponse.next();
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
