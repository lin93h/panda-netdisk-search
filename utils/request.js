const request = (url, params) => {
  return $fetch(import.meta.env.VITE_API_ORIGIN + url)
}

export default request