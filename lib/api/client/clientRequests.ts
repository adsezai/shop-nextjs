import { User } from '../../common/user.interface'
import { Item } from '../../common/item.interface'

import { createURL } from '../utils'

export function handleFetchErrors(response) {
  if (!response.ok) throw Error(response.statusText)
  return response.json()
}

export async function login(email: string, password: string) {
  return fetch(createURL('/api/login'), {
    method: 'POST',
    credentials: 'include',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(handleFetchErrors)
}

export async function fetchUser(): Promise<User | null> {
  return fetch(createURL('/api/user'), {
    method: 'GET',
    credentials: 'include',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(handleFetchErrors)
}

export async function fetchItems(pageNumber: number, limit: number): Promise<Array<Item> | null> {
  return fetch(createURL('/api/items'), {
    method: 'POST',
    credentials: 'include',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pageNumber, limit })
  }).then(handleFetchErrors)
}
