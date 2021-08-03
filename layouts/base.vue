<template>
  <div>
    <fe-header></fe-header>
    <el-container style="height: 100vh">
      <fe-sidebar v-if="tokenBoolean" @have-token="haveToken"></fe-sidebar>
      <el-main style="background-color: #fff; padding: 20px 40px" ref="elMain">
        <Nuxt />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FeHeader from "~/components/FeHeader.vue";
import FeSidebar from "~/components/FeSidebar.vue";
import { mapState } from "vuex";
export default Vue.extend({
  components: {
    FeHeader,
    FeSidebar,
  },
  data() {
    return {
      tokenBoolean: true,
    };
  },
  computed: {},
  watch: {},
  methods:{
    haveToken(val: string) {
      if (val) {
        this.tokenBoolean = true;
      } else {
        this.tokenBoolean = false;
      }
    },
  },
});
</script>

<style lang="scss">
@import "~assets/scss/style.scss";
</style>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
