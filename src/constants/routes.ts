export const protectedRoutes:{[key: string]: {}} = {
  '/': {},
  '/search': {},
  '/add-post': {}
}

export const publicRoutes: {[key: string]: string}= {
  "/[username]": "/[username]",
  signin: "/signin",
};
