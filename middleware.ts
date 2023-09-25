import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // console.log(req.nextauth.token?.user?.role)
    // const path = req.nextUrl.pathname;
    // if (path.startsWith('/manager')){
    //   if (req.nextauth.token?.user?.role !== 'admin'){
    //     console.log("MANAGER NOT ADMIN")
    //     NextResponse.redirect(new URL('/', req.url))
    //   }
    // }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;

        if (path.startsWith("/manager")) {
          return token?.user?.role === "admin"
        }

        return token !== null
      },
    },
  }
)

export const config = { matcher: [
  "/manager/:path*",
  "/orders/:path*",
  "/cart/:path*"
] }