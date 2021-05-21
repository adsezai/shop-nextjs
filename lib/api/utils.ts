// if mocking is enabled return the absoulte url, else return the rel path
export function createURL(path: string) {
  return process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
    ? new URL(path, process.env.NEXT_PUBLIC_BACKEND_URL).href
    : path
}
