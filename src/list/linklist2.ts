
const data: number[] = [] // 数据域
const next: number[] = [] // 指针域
const head = 3 // 头指针

/**
 *
 * @param idx 原节点位置
 * @param p 新节点位置
 * @param val 新节点值
 */
function add(idx: number, p: number, val: number) {
  // 暂存之前的指向，记忆中间插入后面的节点地址
  next[p] = next[idx]
  next[idx] = p
  data[p] = val
}

data[head] = 0 // 初始化头结点
add(3, 5, 1) // 在3节点后面添加5节点，值是1
add(5, 2, 2) // 在5节点后面添加2节点，值是2
add(2, 7, 3) // 在2节点后面添加7节点，值是3
add(7, 9, 4) // 在7节点后面添加9节点，值是4
add(5, 6, 100) // 在5节点后面添加6节点，值是100

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest
  describe('should', () => {
    it('exported', () => {
      expect(data).toMatchInlineSnapshot(`
        [
          ,
          ,
          2,
          0,
          ,
          1,
          100,
          3,
          ,
          4,
        ]
      `)
      expect(next).toMatchInlineSnapshot(`
        [
          ,
          ,
          7,
          5,
          ,
          6,
          2,
          9,
          ,
          undefined,
        ]
      `)
    })
  })
}
