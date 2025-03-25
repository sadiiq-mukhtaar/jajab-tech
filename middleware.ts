import middleware from "next-auth/middleware";
import { MiddlewareConfig } from "next/server";

export default middleware;

export const config: MiddlewareConfig = {
  matcher: ["/customers/:id/:path+", "/customers/add"],
};
