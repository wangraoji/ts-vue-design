# ts-vue-design
vue2.0 cli + ts + webpack3.6 基础模板

# 使用vue+ts好处
让你的逼格提升2个level，后端也没法吐槽js是弱类型了~
本项目参考三命大佬教程，本人有些小修改（为的就是让广大同胞能跑起来），因为三命大佬是4.0的。咱们普遍还是用webpack3.6+
如果要用webpack4.0+ 直接vue3.0 @vue/cli 了，谁还整这玩意2.0啊~

# 为什么标注是 webpack3.6
新版都是ts-loader 是4.5+ 版本，要求使用webpack 4.0.0+ 手动搭建还没有具体的操作步奏（个人是感觉有点小麻烦），只能拿别人的模板进行修改。

# 不废话了，直接上手

### 1. vue-cli init 一个项目 
这里就不用我多说了吧？ vue init webpack xxx

### 2. 安装Ts依赖
```
npm i vue-class-component vue-property-decorator --save

npm i ts-loader typescript tslint tslint-loader tslint-config-standard --save-dev

```
- vue-class-component：强化 Vue 组件，使用 TypeScript/装饰器 增强 Vue 组件
- vue-property-decorator：在 vue-class-component 上增强更多的结合 Vue 特性的装饰器
- ts-loader：TypeScript 为 Webpack 提供了 ts-loader，其实就是为了让webpack识别 .ts .tsx文件
- tslint-loader跟tslint：我想你也会在.ts .tsx文件 约束代码格式（作用等同于eslint）
- tslint-config-standard：tslint 配置 standard风格的约束

**这里需要注意 ts-loader 下载下来是最新版，我们下载完成之后需要手动改成3.5.0重新yarn install，至于为什么我上面说了。你要是想有你自己的逼格，请自行琢磨**

### 3. 配置 webpack
首先找到./build/webpack.base.conf.js

- 找到entry.app 将main.js 改成 main.ts, 顺便把项目文件中的main.js也改成main.ts, 里面内容改变如下
```
/* ./build/webpack.base.conf.js */
entry: {
  app: './src/main.ts'
}

/* main.ts */
// 变更前
import App from './App'
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})

// 变更后
import App from './App.vue'
export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
```

- 找到resolve.extensions 里面加上.ts 后缀 （是为了之后引入.ts的时候不写后缀）
```
resolve: {
  extensions: ['.js', '.vue', '.json', '.ts'],
  alias: {
      '@': resolve('src')
  }
}
```

- 找到module.rules 添加webpack对.ts的解析
```
module: {
  rules: [
    {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src'), resolve('test')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
    // 从这里复制下面的代码就可以了
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'tslint-loader'
    },
    {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        appendTsSuffixTo: [/\.vue$/],
      }
    },
    // 复制以上的
  }
}
```

### 4. 在根路径(跟package.json同级)添加 tsconfig.json
```
// 我的
{
    "include": [
      "src/**/*"
    ],
    "exclude": [
      "node_modules"
    ],
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["*", "src/*"]
      },
      "jsx": "preserve",
      "jsxFactory": "h",
      "allowSyntheticDefaultImports": true,
      "experimentalDecorators": true,
      "allowJs": true,
      "module": "esnext",
      "target": "es5",
      "moduleResolution": "node",
      "isolatedModules": false,
      "lib": [
        "dom",
        "es5",
        "es6",
        "es7",
        "es2015.promise"
      ],
      "sourceMap": true,
      "pretty": true
    }
  }
  // 详细说明 无需添加
  {
  // 编译选项
  "compilerOptions": {
    // 输出目录
    "outDir": "./output",
    // 是否包含可以用于 debug 的 sourceMap
    "sourceMap": true,
    // 以严格模式解析
    "strict": true,
    // 采用的模块系统
    "module": "esnext",
    // 如何处理模块
    "moduleResolution": "node",
    // 编译输出目标 ES 版本
    "target": "es5",
    // 允许从没有设置默认导出的模块中默认导入
    "allowSyntheticDefaultImports": true,
    // 将每个文件作为单独的模块
    "isolatedModules": false,
    // 启用装饰器
    "experimentalDecorators": true,
    // 启用设计类型元数据（用于反射）
    "emitDecoratorMetadata": true,
    // 在表达式和声明上有隐含的any类型时报错
    "noImplicitAny": false,
    // 不是函数的所有返回路径都有返回值时报错。
    "noImplicitReturns": true,
    // 从 tslib 导入外部帮助库: 比如__extends，__rest等
    "importHelpers": true,
    // 编译过程中打印文件名
    "listFiles": true,
    // 移除注释
    "removeComments": true,
    "suppressImplicitAnyIndexErrors": true,
    // 允许编译javascript文件
    "allowJs": true,
    // 解析非相对模块名的基准目录
    "baseUrl": "./",
    // 指定特殊模块的路径
    "paths": {
      "jquery": [
        "node_modules/jquery/dist/jquery"
      ]
    },
    // 编译过程中需要引入的库文件的列表
    "lib": [
      "dom",
      "es2015",
      "es2015.promise"
    ]
  }
}
```
更详细的配置： [tsconfig.json](http://json.schemastore.org/tsconfig)

### 5. 在根级路径添加 tslint.json
```
// 本人的，其实本人并没有启动tslint启动了很蛋疼，不能使用缩进，只能使用2个空格
// 以及一大堆限制，参考 eslint 不建议开启 但还是加这么一段
// 如需更详细的配置请自行百度：tslint详细配置（跟ng2+是一样的）
{
    "globals": {
        "require": true
    }
}
```

### 6. 让 ts 识别 .vue
由于 TypeScript 默认并不支持 *.vue 后缀的文件，所以在 vue 项目中引入的时候需要创建一个 vue-shim.d.ts 文件，放在项目项目对应使用目录下，例如 src/vue-shim.d.ts
```
// 下面这个意思是告诉 TypeScript *.vue 后缀的文件可以交给 vue 模块来处理。
// 而在代码中导入 *.vue 文件的时候，需要写上 .vue 后缀。原因还是因为 TypeScript 
// 默认只识别 *.ts文件， 不识别 *.vue 文件
// 就比如main.ts 中需要 import App from './App.vue'
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

```

### 7. 改造 .vue 文件
在这之前先让我们了解一下所需要的插件（下面的内容需要掌握es7的装饰器, 就是下面使用的@符号）
#### vue-class-component
vue-class-component 对 Vue 组件进行了一层封装，让 Vue 组件语法在结合了 TypeScript 语法之后更加扁平化：
```
<template>
  <div>
    <input v-model="msg">
    <p>msg: {{ msg }}</p>
    <p>computed msg: {{ computedMsg }}</p>
    <button @click="greet">Greet</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class App extends Vue {
    // 初始化数据
    msg = 123

    // 声明周期钩子
    mounted () {
      this.greet()
    }

    // 计算属性
    get computedMsg () {
      return 'computed ' + this.msg
    }

    // 方法
    greet () {
      alert('greeting: ' + this.msg)
    }
  }
</script>
```
上面的代码跟下面的代码作用是一样的
```
export default {
  data () {
    return {
      msg: 123
    }
  }

  // 声明周期钩子
  mounted () {
    this.greet()
  }

  // 计算属性
  computed: {
    computedMsg () {
      return 'computed ' + this.msg
    }
  }

  // 方法
  methods: {
    greet () {
      alert('greeting: ' + this.msg)
    }
  }
}
```

#### vue-property-decorator
vue-property-decorator 是在 vue-class-component 上增强了更多的结合 Vue 特性的装饰器，新增了这 7 个装饰器：

- @Emit
- @Inject
- @Model
- @Prop
- @Provide
- @Watch
- @Component (从 vue-class-component 继承)

在这里列举几个常用的@Prop/@Watch/@Component, 更多信息，详见[官方文档](https://github.com/kaorun343/vue-property-decorator)
```
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'

@Component
export class MyComponent extends Vue {
  
  @Prop()
  propA: number = 1

  @Prop({ default: 'default value' })
  propB: string

  @Prop([String, Boolean])
  propC: string | boolean

  @Prop({ type: null })
  propD: any

  @Watch('child')
  onChildChanged(val: string, oldVal: string) { }
}
```
上面的代码等价于：
```
export default {
  props: {
    checked: Boolean,
    propA: Number,
    propB: {
      type: String,
      default: 'default value'
    },
    propC: [String, Boolean],
    propD: { type: null }
  }
  methods: {
    onChildChanged(val, oldVal) { }
  },
  watch: {
    'child': {
      handler: 'onChildChanged',
      immediate: false,
      deep: false
    }
  }
}
```
### 8. 开始修改App.vue文件
1. 在script 标签上加上 lang="ts", 意思是让webpack将这段代码识别为typescript 而非javascript
2. 修改vue组件的构造方式( 跟ng2+组件写法有点类似, 详见官方 )
3. 用vue-property-decorator语法改造之前代码
```
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class App extends Vue {
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
```
其他vue修改如上~

### 9. 想玩高端的附上三命大佬的两篇文章
[vue+ts基础篇](https://segmentfault.com/a/1190000011744210)
[vue+ts进阶篇](https://segmentfault.com/a/1190000011878086)

