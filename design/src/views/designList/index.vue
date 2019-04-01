<template>
  <div class="design-list">
    <h1>{{name}}</h1>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as _ from 'lodash';
@Component({})
export default class designList extends Vue {
  name: string = "Welcome to Your Vue-Typescript App";
  
  mounted() {
    let a = { name: "zs" };
    console.log(_.cloneDeep(a));
    this.$message({
      message: "恭喜你，这是一条成功消息",
      type: "success"
    });
  }
}
</script>
<style lang="scss" scoped>
.design-list {
  color: red;
}
</style>