export const authenticator = (cookies: string) => {
  let token = cookies.split("=")[1];
  token = token.slice(0, token.length - 1);
  if (token === process.env.AUTH_TOKEN) return true;
  return false;
};
