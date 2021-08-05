<template>
  <div class="page-slogin">
    <h1 class="h1 title">Log in to your <i>Fashion Express</i></h1>
    <div class="block email-pswd">
      <div class="gray-input">
        <input type="text" placeholder="Username" v-model="userName" />
      </div>
      <div class="gray-input">
        <input
          class="gray-input"
          type="Password"
          placeholder="Password"
          v-model="password"
          @keyup.enter="slogin"
        />
      </div>
    </div>
    <div class="block login-signup">
      <button style="background:#c79818;" class="button login" @click="slogin">Login</button>
      <p class="to-signup">
        Don't have a Fashion Express account?
        <span class="to-signup-btn" @click="toSsignup"> Sign up now</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Loading } from "element-ui";
import Server from "~/utils/server";
import { mapState } from "vuex";
import shopifyService from "~/global/service/shopify";
import Cookies from "js-cookie";
export default Vue.extend({
  async asyncData({ query, app, redirect }) {
    if (
      app.$cookies.get("token") &&
      app.$cookies.get("shopname") == query.name
    ) {
      redirect("/");
    }
    if (query.name && query.bindOld && query.channel) {
      return {
        bindOld: true,
        shopName: query.name,
        channel: query.channel,
      };
    } else if (query.name && query.channel) {
      // if (query.pwd && !app.$cookies.get("token")) {
      //   return {
      //     shopName: query.name,
      //     passwordTip: query.pwd,
      //     install: true,
      //   };
      // } else if (app.$cookies.get("token")) {
      //   redirect("/products/all");
      // } else if (!query.pwd && !app.$cookies.get("token")) {
      //   return {
      //     shopName: query.name,
      //   };
      // }
      return {
        shopName: query.name,
        channel: query.channel,
      };
    }
    // if (query.name && query.pwd && !app.$cookies.get("token")) {
    // } else if (query.name && !query.pwd && app.$cookies.get("token")) {
    //   redirect("/products/all");
    // } else if (
    //   query.name &&
    //   app.$cookies.get("firstopen") &&
    //   !app.$cookies.get("token")
    // ) {
    //   return {
    //     shopName: query.name,
    //   };
    // }
  },
  layout: "public",
  data() {
    return {
      userName: "",
      channel: "",
      shopName: "",
      install: false,
      password: "",
      passwordTip: "",
      state: {
        login: false,
      },
      server: new Server(),
      loadingServer: Loading.service({}),
      adminId: 0,
      bindOld: false,
    };
  },
  beforeMount() {
    // this.shopNameInit();
    this.loadingServer.close();
    this.server.init();
  },
  watch: {
    "state.login": function a(val) {
      if (val) {
        this.loadingServer = Loading.service({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
          fullscreen: true,
        });
      } else {
        this.loadingServer.close();
      }
    },
  },
  methods: {
    // shopNameInit() {
    //   if (!this.$route.query.name) {
    //     // let shop = localStorage.getItem("shopname");
    //     let shop=Cookies.get('shopname')
    //     if (shop) {
    //       this.shopName = shop;
    //     }
    //   }
    // },
    async slogin() {
      if (this.state.login) return;
      this.state.login = true;
      if (this.userName.trim().length < 1 || this.password.trim().length < 1) {
        this.$message("Please fill in all the information.");
        this.state.login = false;
        return;
      }
      let params = {};
      if (this.bindOld) {
        params = {
          password: this.password,
          shopName: this.shopName,
          username: this.userName,
          channel: this.channel,
          newStatus: 2,
          platform: "fashion",
        };
      } else if (this.channel) {
        params = {
          password: this.password,
          username: this.userName,
          shopName: this.shopName,
          channel: this.channel,
          platform: "fashion",
        };
      } else {
        params = {
          password: this.password,
          username: this.userName,
          shopName: this.shopName,
          platform: "fashion",
        };
      }
      let lgRes = (await shopifyService.shopifyLogin(params)) as any;
      console.log(lgRes);
      if (lgRes.data.code !== 200) {
        this.state.login = false;
        this.$message({
          type: "warning",
          message: "The username/ password is wrong. Please try again.",
          duration: 3000,
        });
        return;
      } else if (lgRes.data.code === 200) {
        this.state.login = false;
        this.$message({
          showClose: true,
          duration: 3000,
          type: "success",
          message: "Login Success!",
        });
        let token = lgRes.data.data.tokenHead + lgRes.data.data.token;
        Cookies.set("token", token);
        Cookies.set("shopname", this.shopName);
        location.href = "/";
      }
      // } else {
      //   let params = {
      //     username: this.shopName,
      //     password: this.password,
      //   };
      //   let lgRes = (await shopifyService.shopifyLogin(params)) as any;
      //   if (lgRes.code !== 200) {
      //     this.state.login = false;
      //     this.$message({
      //       type: "warning",
      //       message: "The email/ password is wrong. Please try again.",
      //       duration: 3000,
      //     });
      //     return;
      //   } else if (lgRes.code === 200) {
      //     this.$message({
      //       showClose: true,
      //       duration: 3000,
      //       type: "success",
      //       message: "Login Success!",
      //     });
      //   }
      // }

      // localStorage.setItem("shopname", JSON.stringify(this.shopName));
      // if (this.$route.query.from) {
      //   location.pathname = `${this.$route.query.from}`;
      // }
      // else {
      // if (this.install === false) {
      //   location.href = "/products/all";
      // } else {
      //   this.$router.replace({
      //     name: "settings",
      //     params: {
      //       changePassword: "true",
      //       shopName: this.shopName,
      //       password: this.passwordTip,
      //     },
      //   });
      // }
      // }
    },
    toSsignup() {
      let obj = JSON.parse(JSON.stringify(this.$route.query));
      Object.assign(obj);
      this.$router.replace({ query: obj, path: "/ssignup" });
    },
  },
  computed: {
    ...mapState("shopifyInfo", ["shopify"]),
  },
});
</script>

<style lang="scss" scoped>
.page-slogin {
  width: 100%;
  max-width: 400px;
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > * {
    width: 100%;
  }
  & > * + * {
    margin-top: 30px;
  }

  .title {
    margin-bottom: 40px;
    text-align: center;
  }

  .email-pswd,
  .login-signup {
    & > * + * {
      margin-top: 20px;
    }
  }

  .email-pswd {
    .forget-pswd {
      text-align: right;
      font-size: 14px;
      font-family: Helvetica;
      color: #000000;
    }
  }

  .to-signup {
    font-size: 14px;
    font-family: SFProDisplay-Medium, SFProDisplay;
    font-weight: 500;
    color: #262626;
    text-align: center;
    margin-top: 15px;
    a,
    a:hover,
    a:link,
    a:visited,
    a:active {
      color: #07b9fb;
      text-decoration: none;
    }
    .to-signup-btn {
      color: #07b9fb;
      cursor: pointer;
    }
  }
}
.password-info {
  display: inline-block;
  margin-top: 5px;
  color: #929292;
  font-size: 12px;
  display: flex;
  .icon-a {
    margin-right: 5px;
  }
}
@media screen and (max-width: 400px) {
  .page-slogin {
    padding: 0 10px;
  }
}
</style>
