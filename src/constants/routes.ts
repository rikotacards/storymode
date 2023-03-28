export const protectedRoutes:{[key: string]: {}} = {
  '/': {},
  '/explore': {},
  '/add-post': {}
}

export const publicRoutes: {[key: string]: string}= {
  "/[username]": "/[username]",
  signin: "/signin",
};
