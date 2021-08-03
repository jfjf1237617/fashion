<template>
  <div>
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import CookieHelper from "~/utils/helper/CookieHelper";
export default Vue.extend({
  // beforeMount(){
  // let fullPath = this.$route.path;
  // let token = localStorage.getItem('token');
  // if (/^\/login/.test(fullPath) || /^\/signup/.test(fullPath)){
  //   if (token) {
  //     this.$router.push('/rep/home');
  //     return;
  //   }
  // } else if (/^\/rep/.test(fullPath)) {
  //   if (!token) {
  //     location.href  = '/';
  //     return;
  //   }
  // }
  // },
  async middleware({ route, store, app, redirect }) {
    let fullPath = route.path;
    // console.log('default middware path: ', fullPath);
    var pageRedirect = (token?: any, id?: any) => {
      let result = false;
      let toRep = [/\/login.*/, /\/signup.*/];
      let flag = toRep.filter((reg) => {
        return reg.test(fullPath);
      });
      if (!token && !id) {
        if (fullPath !== "/" && flag.length < 1) {
          redirect("/login");
          result = true;
        }
        result = true;
      } else if (id) {
        if (flag.length > 0) {
          // redirect('/rep/home');
          redirect("/rep/products");
          // redirect("/rep/order");
          result = true;
        }
      }
      return result;
    };
    let token = app.$cookies.get("token");
    if (pageRedirect(token)) return;
    if (store.state.adminUser.user.id === null) {
      await store.dispatch("adminUser/getUser", token);
    }
    if (pageRedirect(undefined, store.state.adminUser.user.id)) return;
  },
  beforeMount() {
    this.updateMenuByPath(this.$route.path);
  },
  mounted() {
    (window as any).CookieHelper = CookieHelper;
  },
  watch: {
    // "$route.path": function (path) {
    //   this.updateMenuByPath(path);
    // },
  },
  methods: {
    ...mapMutations({ updateMenu: "menu/change" }),
    updateMenuByPath(path: string) {
      let pathArray = path.split("/");
      if (pathArray[1] === "rep") {
        this.updateMenu(pathArray[2] || "");
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

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
