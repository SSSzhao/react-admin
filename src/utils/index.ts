export function delayPromise (delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}
