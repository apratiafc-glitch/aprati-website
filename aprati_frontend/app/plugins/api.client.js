export default defineNuxtPlugin(() => {
  const { request } = useApi()
  
  return {
    provide: {
      api: request
    }
  }
})
