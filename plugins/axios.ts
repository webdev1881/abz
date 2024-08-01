import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  let api = axios.create({
    baseURL:
      "https://frontend-test-assignment-api.abz.agency/api/v1",
  })
  return {
    provide: {
        api
    }
  }
})
