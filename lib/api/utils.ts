import * as cookie from 'cookie'

// if mocking is enabled return the absoulte url, else return the rel path
export function createURL(path: string) {
  // FIXME handle this when Port is not 3000
  // this works for testing and if there is a mock handler for msw
  // but the request which are not mocked will always be sent to localhost:3000 even if next port is different
  // this applies ONLY if mock in enabled AND not in dev or prod
  return process.env.NEXT_PUBLIC_API_MOCKING === 'enabled' ? new URL(path, 'http://localhost:3000').href : path
}

export function createImageURL(id: string) {
  return process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
    ? `https://picsum.photos/500/500`
    : `https://adsezaistorage.blob.core.windows.net/adsezai/${id}`
}

export function createCookie(name: string, value: string, path?: string): string {
  return cookie.serialize(name, value, {
    httpOnly: true,
    path: path || '/',
    sameSite: 'lax',
    secure: false // TODO change to true (only sends over https if true)
  })
}
