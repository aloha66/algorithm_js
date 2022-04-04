import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    //   可以在源文件加入测试用例
    includeSource: ['src/*.ts'],
  },
})
