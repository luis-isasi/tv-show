import { API_BASE_URL } from '@Constants'

//FETCHER
export async function fetcher<DataResponse>({
  endpoint,
  method = 'GET',
  body,
  headers = {
    'content-type': 'application/x-www-form-urlencoded',
  },
}: {
  endpoint: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  headers?: {
    [key: string]: string
  }
}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: JSON.stringify(body),
  })

  let data = await response.json()

  type MyResponse = DataResponse & {
    error?: string
  }

  return data as MyResponse
}
