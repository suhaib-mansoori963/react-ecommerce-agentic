import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 15000,
})

function toErrorMessage(err) {
  if (axios.isAxiosError(err)) {
    return (
      err.response?.data?.message ||
      err.response?.statusText ||
      err.message ||
      'Request failed'
    )
  }
  if (err instanceof Error) return err.message
  return 'Something went wrong'
}

export async function fetchProducts(signal) {
  try {
    const res = await api.get('/products', { signal })
    return res.data
  } catch (err) {
    throw new Error(toErrorMessage(err))
  }
}

export async function fetchProductById(id, signal) {
  try {
    const res = await api.get(`/products/${id}`, { signal })
    return res.data
  } catch (err) {
    throw new Error(toErrorMessage(err))
  }
}

