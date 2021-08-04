<template>
  <div class="page-register">
    <h1 class="h1 title">Join <i>Fashion Express</i> free</h1>
    <div class="block email-pswd">
      <div class="gray-input">
        <input type="text" placeholder="Username" v-model="username" />
        <p v-show="usernameError" class="input-error">{{ usernameError }}</p>
      </div>
      <div class="gray-input">
        <input type="text" placeholder="Email" v-model="email" />
        <p v-show="emailError" class="input-error">{{ emailError }}</p>
      </div>
      <div class="gray-input">
        <input
          class="gray-input"
          :type="show ? 'text' : 'Password'"
          placeholder="Password"
          v-model="password"
          @keyup.enter="signup"
        />
        <p v-show="passwordError" class="input-error">{{ passwordError }}</p>
        <span
          @click="show = true"
          v-show="!show"
          class="iconfont icon-no_eye"
        ></span>
        <span
          @click="show = false"
          v-show="show"
          class="iconfont icon-eye"
        ></span>
      </div>
    </div>
    <div class="block login-signup">
      <button class="button login" @click="signup">Join Fashion Express</button>
      <p class="to-slogin">
        Already have an account?<span class="to-slogin-btn" @click="toSlogin">
          Log in</span
        >
      </p>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Loading } from "element-ui";
import shopifyService from "~/global/service/shopify.js";
import Cookies from "js-cookie";
export default Vue.extend({
  async asyncData({ query }) {
    if (query.name && query.channel) {
      return { name: query.name, channel: query.channel };
    }
  },
  layout: "public",
  data() {
    return {
      state: {
        signup: false,
      },
      loadingServer: Loading.service({}),
      show: false,
      username: "",
      channel: "",
      usernameError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      name: "",
    };
  },
  watch: {
    "state.signup": function a(val) {
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
  beforeMount() {
    this.loadingServer.close();
  },
  methods: {
    async signup() {
      if (this.state.signup) return;
      this.emailError = "";
      this.passwordError = "";
      this.usernameError = "";
      let emailReg =
        /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
      // let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{8,14}$/;
      if (this.username.trim().length < 1) {
        this.usernameError = "Please fill in username.";
        return;
      }
      if (emailReg.test(this.email)) {
        let params = {
          username: this.username,
          password: this.password,
          shopName: this.name,
          newStatus: 1,
          email: this.email,
          channel: this.channel,
          platform:'fashion',
        };
        this.state.signup = true;
        let lgRes = await shopifyService.shopifyLogin(params);
        console.log(lgRes);
        if (lgRes.data.code !== 200) {
          this.state.signup = false;
          this.$message({
            type: "warning",
            message: lgRes.data.message,
            duration: 3000,
          });
          return;
        } else if (lgRes.data.code === 200) {
          let token = lgRes.data.data.tokenHead + lgRes.data.data.token;
          Cookies.set("token", token);
          Cookies.set("shopname", this.name);
          this.state.signup = false;
          this.$message({
            showClose: true,
            duration: 3000,
            type: "success",
            message: "Register Success!",
          });
          location.href = "/";
        }
      } else if (
        !emailReg.test(this.email) &&
        this.password.trim().length < 6
      ) {
        this.emailError = "Please enter the correct email format.";
        // this.passwordError =
        //   "Password must be at least 8 characters long and at most 14 characters long, consisting of letter and number.";
        this.passwordError = "Password must be at least 6 characters.";
      } else if (!emailReg.test(this.email)) {
        this.emailError = "Please enter the correct email format.";
      } else if (this.password.trim().length < 6) {
        this.passwordError = "Password must be at least 6 characters.";
      }
    },
    toSlogin() {
      let obj = JSON.parse(JSON.stringify(this.$route.query));
      Object.assign(obj);
      this.$router.replace({ query: obj, path: "/slogin" });
    },
  },
});
</script>
<style lang="scss" scoped>
.page-register {
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

  .to-slogin {
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
    .to-slogin-btn {
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
  .page-login {
    padding: 0 10px;
  }
}
.gray-input {
  position: relative;
  .icon-no_eye,
  .icon-eye {
    color: #929292;
    position: absolute;
    top: 13px;
    right: 10px;
    cursor: pointer;
  }
}
.input-error {
  color: red;
  font-size: 12px;
  margin-left: 30px;
  margin-top: 3px;
}
</style>