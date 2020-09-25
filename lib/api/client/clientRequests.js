export function handleFetchErrors(response) {
  if (!response.ok) throw Error(response.statusText)
  return response
}

export async function login(email, password) {
  return fetch('/api/login', {
    method: 'POST',
    credentials: 'include',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(handleFetchErrors)
}
