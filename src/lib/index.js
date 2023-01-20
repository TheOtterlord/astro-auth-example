import { Auth } from "@auth/core";
import { parseString, splitCookiesString } from "set-cookie-parser";
import { serialize } from "cookie";
const actions = [
  "providers",
  "session",
  "csrf",
  "signin",
  "signout",
  "callback",
  "verify-request",
  "error"
];
const getSetCookieCallback = (cook) => {
  if (!cook)
    return;
  const splitCookie = splitCookiesString(cook);
  for (const cookName of [
    "__Secure-next-auth.session-token",
    "next-auth.session-token",
    "next-auth.pkce.code_verifier",
    "__Secure-next-auth.pkce.code_verifier"
  ]) {
    const temp = splitCookie.find((e) => e.startsWith(`${cookName}=`));
    if (temp) {
      return parseString(temp);
    }
  }
  return parseString(splitCookie?.[0] ?? "");
};
function AstroAuthHandler(prefix, authConfig) {
  return async ({ request }) => {
    const url = new URL(request.url);
    const action = url.pathname.slice(prefix.length + 1).split("/")[0];
    if (!actions.includes(action) || !url.pathname.startsWith(prefix + "/"))
      return;
    const res = await Auth(request, authConfig);
    if (["callback", "signin", "signout"].includes(action)) {
      const parsedCookie = getSetCookieCallback(
        res.clone().headers.get("Set-Cookie")
      );
      if (parsedCookie) {
        res.headers.set(
          "Set-Cookie",
          serialize(parsedCookie.name, parsedCookie.value, parsedCookie)
        );
      }
    }
    return res;
  };
}
function AstroAuth(config) {
  const { prefix = "/api/auth", ...authConfig } = config;
  const { AUTH_SECRET, AUTH_TRUST_HOST, VERCEL, NODE_ENV } = import.meta.env;
  authConfig.secret ??= AUTH_SECRET;
  authConfig.trustHost ??= !!(AUTH_TRUST_HOST ?? VERCEL ?? NODE_ENV !== "production");
  const handler = AstroAuthHandler(prefix, authConfig);
  return {
    async get(event) {
      return await handler(event);
    },
    async post(event) {
      return await handler(event);
    }
  };
}
async function getSession(req, options) {
  options.secret ??= import.meta.env.AUTH_SECRET;
  options.trustHost ??= true;
  const url = new URL(`${options.prefix}/session`, req.url);
  const response = await Auth(
    new Request(url, { headers: req.headers }),
    options
  );
  const { status = 200 } = response;
  const data = await response.json();
  if (!data || !Object.keys(data).length)
    return null;
  if (status === 200)
    return data;
  throw new Error(data.message);
}
export {
  AstroAuth,
  getSession
};
