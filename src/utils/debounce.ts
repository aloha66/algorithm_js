import { timer } from 'rxjs'
export function debounce(fn: Function, delay: number) {
  let timer: ReturnType<typeof setTimeout>

  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('should', () => {
    it('debounce', (done) => {
      let count = 0
      const __addCount = () => count++
      const addCount = debounce(__addCount, 100)

      // 第0秒开始执行，周期是10ms
      // 每10ms调一次
      const source = timer(0, 10)
      const subscription = source.subscribe((i) => {
        if (i === 100) {
          subscription.unsubscribe()
          setTimeout(() => {
            expect(count).toBe(1)
            done()
          }, 200)
        }
        else { addCount() }
      })
    })
  })
}
