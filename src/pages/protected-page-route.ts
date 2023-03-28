export default async function ProtectedPageRoute(
  context: any,
  redirectTo: string, // string route where user will be redirected if they are not authenticated
  getProps: any, // function to fetch initial props
) {
  const userIsAuthenticated = true // TODO: check if user is authenticated
  if (!userIsAuthenticated) {
    return {
      redirect: {
        destination: redirectTo ?? '/sign-in',
        permanent: false,
      }
    }
  }

  if (getProps) {
    return {
      props: getProps(),
    }
  }

  return {
    props: {},
  }
}