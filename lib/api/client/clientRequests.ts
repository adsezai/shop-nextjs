import useSWR from 'swr'

import { User } from '../../common/user.interface'
import { Item } from '../../common/item.interface'

import { createURL } from '../utils'
import { errorByHttpCode } from '../../global/errors'

export function handleFetchErrors(response: Response) {
  response.ok || errorByHttpCode(response.status, response.statusText)

  return response.json()
}

export async function addItemData(data: any) {
  return fetch(createURL('/api/additem'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data })
  }).then(handleFetchErrors)
}

export async function addItemImages(itemid: string, formData: FormData) {
  return fetch(createURL('/api/addimages') + `?${new URLSearchParams({ itemid })}`, {
    method: 'POST',
    body: formData
  }).then(handleFetchErrors)
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

export async function register(name: string, email: string, password: string) {
  return fetch(createURL('/api/register'), {
    method: 'POST',
    credentials: 'include',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
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
      // does not retry when unautorized
      if (error.status === 401) return
    }
  })

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}
