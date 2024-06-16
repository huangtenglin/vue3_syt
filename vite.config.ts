import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueSetUp from 'vite-plugin-vue-setup-extend';
import { resolve } from 'path';

// 如果出现红色语法提示错误，请下载@types/node,用于描述Node.js核心模块和常用的第三方库的类型信息

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueSetUp()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  // 配置拦截代理
  server: {
    proxy: {
      '/api': {
        target: 'http://syt.atguigu.cn',
        changeOrigin: true,
        // 不需要开启路径重写，因为api接口是需要带api的
      },
    },
  },
});
