import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers"; // 导入vant组件
import styleImport, { VantResolve } from "vite-plugin-style-import";
import AutoImport from "unplugin-auto-import/vite"; // 导入自动装配插件
import viteCompression from "vite-plugin-compression";
import postcsspxtoviewport from "postcss-px-to-viewport";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  build: {
    assetsDir: "./static",
    chunkSizeWarningLimit: 500,
    minify: "terser",
    cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    terserOptions: {
      compress: {
        // warnings: false,
        drop_console: true, //打包时删除console
        drop_debugger: true, //打包时删除 debugger
        pure_funcs: ["console.log"],
      },
      output: {
        // 去掉注释内容
        comments: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // 拆分代码，这个就是分包，配置完后自动按需加载，现在还比不上webpack的splitchunk，不过也能用了。
          vue: ["vue", "vue-router"],
          // vue: ['vue', 'vue-router', 'vuex'],
          vant: ["vant"],
        },
      },
    },
    brotliSize: false,
  },
  plugins: [
    vue({ reactivityTransform: true }),
    styleImport({
      resolves: [VantResolve()],
      libs: [
        {
          libraryName: "vant",
          esModule: true,
          resolveStyle: (name) => `../es/${name}/style`,
        },
      ],
    }),
    // 引入Vant UI
    Components({
      dirs: ["src/components"],
      extensions: ["vue"],
      resolvers: [VantResolver()],
      dts: "types/components.d.ts",
    }),
    // 配置自动装载配置
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: "types/auto-imports.d.ts",
    }),
    viteCompression(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport({
          unitToConvert: "px", // 要转化的单位
          viewportWidth: 375, // UI设计稿的宽度
          unitPrecision: 6, // 转换后的精度，即小数点位数
          propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ["ignore-"], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          landscape: false, // 是否处理横屏情况
          landscapeUnit: "vw", // 横屏时使用的单位
          landscapeWidth: 568, // 横屏时使用的视口宽度
        }),
      ],
    },
    /* CSS 预处理器 */
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/assets/styles/global.scss";',
      },
    },
  },
  // 通过代理方式解决跨域问题
  server: {
    port: "5173",
    host: "0.0.0.0", //指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 将监听所有地址，包括局域网和公网地址。如果不设置，运行会有Network: use `--host` to expose
    open: false, //自动打开
    proxy: {
      // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      // 正则表达式写法
      "/api": {
        target: "http://localhost:3000", // 后端服务实际地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
