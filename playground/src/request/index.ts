import { createAxle } from '@varlet/axle'
import { createUseAxle } from '@varlet/axle/use'

const axle = createAxle({
  baseURL: '/api',
})

const useAxle = createUseAxle({
  axle,
  onTransform: (response) => response.data,
})

axle.useResponseInterceptor({
  onFulfilled(response) {
    if (response.data.code !== 200 && response.data.message) {
      Snackbar.warning(response.data.message)
    }

    return response.data
  },
  onRejected(error) {
    console.log(error)
    Snackbar.error(error.message)
    return Promise.reject(error)
  },
})

export { axle, useAxle }
