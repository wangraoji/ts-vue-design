<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({})
// export default class HelloWorld extends Vue<TestMixin> {
export default class HelloWorld extends Vue {
  // @Getter info
  msg: string = "Welcome to Your Vue-Typescript App";
  $store: any;

  mounted() {
    let a = {
      name: "zs"
    };
    this.$store.commit("addAuth", "zs1111");
    console.log(_.cloneDeep(this.$store.getters));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>