import { hostGlobal } from 'src/envs'

function isObject(param: any) {
  return param.constructor === Object
}

function reportUnhandledRejection(reason: any, promise: any) {
  console.log('reportUnhandledRejection', reason, promise)
}

function reportRejectionHandled(promise: any) {
  console.log('reportUnhandledRejection', promise)
}

function addEventListenerCore(e: any) {
  e.preventDefault()
  const detail = e.detail || {}
  const promise = detail.promise
  let reason = detail.reason || e.reason || {
    message: 'addEventListenerCore 未知错误',
    event: e
  }
  if (!isObject(reason)) reason = {
    reason,
  }
  return {
    reason,
    promise,
  }
}

export function addUnhandledrejectionListener() {
  if ('addEventListener' in hostGlobal) {
    hostGlobal.addEventListener('unhandledrejection', function(e: any) {
      console.error('unhandledrejection', e)
      const { reason, promise } = addEventListenerCore(e)
      reportUnhandledRejection(reason, promise)
    })
    hostGlobal.addEventListener('rejectionhandled', function(e: any) {
      console.error('rejectionhandled', e)
      const {
        promise,
      } = addEventListenerCore(e)
      reportRejectionHandled(promise)
    })
  } else if (process) {
    process.on('unhandledRejection', reportUnhandledRejection)
    // process.on("rejectionHandled", rejectionHandled)
  }
}
