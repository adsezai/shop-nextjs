import useSWR from 'swr'

import { User } from '../../common/user.interface'
import { Item } from '../../common/item.interface'

import { createURL } from '../utils'

export function handleFetchErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
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

/**
 * @deprecated Use useSWRInfinite Hook for Page access for items.
 */
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

export const fetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
    credentials: 'include',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(handleFetchErrors)

export function useUser() {
  const { data, error, mutate } = useSWR(createURL('/api/user'), fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // TODO change this to 401 so it does not retry when unautorized
      if (error.status === 500) return
    }
  })

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}
