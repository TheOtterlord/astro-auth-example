async function signIn(providerId, options, authorizationParams) {
  const { callbackUrl = window.location.href, redirect = true } = options ?? {};
  const { prefix = "/api/auth", ...opts } = options ?? {};
  const isCredentials = providerId === "credentials";
  const isEmail = providerId === "email";
  const isSupportingReturn = isCredentials || isEmail;
  const signInUrl = `${prefix}/${isCredentials ? "callback" : "signin"}/${providerId}`;
  const _signInUrl = `${signInUrl}?${new URLSearchParams(authorizationParams)}`;
  const csrfTokenResponse = await fetch(`${prefix}/csrf`);
  const { csrfToken } = await csrfTokenResponse.json();
  const res = await fetch(_signInUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Auth-Return-Redirect": "1"
    },
    body: new URLSearchParams({
      ...opts,
      csrfToken,
      callbackUrl
    })
  });
  const data = await res.clone().json();
  const error = new URL(data.url).searchParams.get("error");
  if (redirect || !isSupportingReturn || !error) {
    window.location.href = data.url ?? callbackUrl;
    if (data.url.includes("#"))
      window.location.reload();
    return;
  }
  return res;
}
async function signOut(options) {
  const { callbackUrl = window.location.href, prefix = "/api/auth" } = options ?? {};
  const csrfTokenResponse = await fetch(`${prefix}/csrf`);
  const { csrfToken } = await csrfTokenResponse.json();
  const res = await fetch(`${prefix}/signout`, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Auth-Return-Redirect": "1"
    },
    body: new URLSearchParams({
      csrfToken,
      callbackUrl
    })
  });
  const data = await res.json();
  const url = data.url ?? callbackUrl;
  window.location.href = url;
  if (url.includes("#"))
    window.location.reload();
}
export {
  signIn,
  signOut
};
