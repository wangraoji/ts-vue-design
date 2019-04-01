

// 
// import Vue from 'vue'

// import vue from 'vue'
// import * as lodash from 'lodash'
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue

}
// 全局变量设置
// declare global {
//   const _: typeof lodash
// }

// declare module '*.vue' {
//   import Vue from 'vue'
//   export default Vue
// }


// declare module 'vue/types/vue' {
//   // 3. 声明为 Vue 补充的东西
//   interface Vue {
//     $myProperty: string
//   }
// }

// 声明全局方法
// declare module 'vue/types/vue' {
//   interface Vue {
//     $Message: any,
//     $Modal: any
//   }
// }