import { timer } from 'rxjs'
export function throttle(fn: Function, delay: number) {
  let start: number
  let timer: ReturnType<typeof setTimeout>
  let lock = false

  return (...args: any[]) => {
    if (start === undefined) start = +Date.now()
    if (lock) return
    lock = true
    fn(...args)
    const ellapsed = +Date.now() - start
    clearTimeout(timer)
    timer = setTimeout(() => {
      lock = false
      // ellapsed等于415ms
      // 实际上下次可调用的时间
    //   delay - 剩下的时间
    }, delay - ellapsed % delay)
  }
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('should', () => {
    it('throttle', (done) => {
      let count = 0
      const __addCount = () => count++
      const addCount = throttle(__addCount, 100)

      // 第0秒开始执行，周期是10ms
      // 每10ms调一次
      const source = timer(0, 10)
      const subscription = source.subscribe((i) => {
        if (i === 100) {
          subscription.unsubscribe()
          setTimeout(() => {
            expect(count).toBe(16)
            done()
          }, 200)
        }
        else { addCount() }
      })
    })
  })
}
