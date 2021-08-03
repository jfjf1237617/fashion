<template>
  <div class="password-box-container">
    <el-dialog title="Change password" :visible.sync="passwordBoxVisible">
      <el-form :rules="rules" ref="passwordForm" :model="passwordForm">
        <el-form-item prop="userName">
          <el-input
            @focus="() => (validateError = false)"
            placeholder="Username"
            v-model="passwordForm.userName"
            autocomplete="off"
          ></el-input>
          <span v-if="validateError" class="shopify-setting-password"
            >User name or password is incorrect</span
          >
        </el-form-item>
        <el-form-item prop="current">
          <el-input
            type="password"
            placeholder="Current password"
            v-model="passwordForm.current"
            autocomplete="off"
          ></el-input>
          <span v-if="validateError" class="shopify-setting-password"
            >User name or password is incorrect</span
          >
        </el-form-item>
        <el-form-item prop="new">
          <el-input
            type="password"
            placeholder="New password"
            v-model="passwordForm.new"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirm">
          <el-input
            type="password"
            placeholder="Confirm new password"
            v-model="passwordForm.confirm"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passwordBoxVisible = false">CANCEL</el-button>
        <el-button type="primary" @click="changePassword('passwordForm')"
          >CHANGE</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import shopifyService from "~/global/service/shopify";
export default Vue.extend({
  props: {},
  data() {
    var validateNewPwd = (rule, value, callback) => {
      if (this.passwordForm.confirm !== this.passwordForm.new) {
        callback(
          new Error("New password and confirmation password do not match")
        );
      } else {
        callback();
      }
    };
    return {
      validateError: false,
      passwordBoxVisible: false,
      rules: {
        userName: [{ required: true, message: "User name cannot be empty" }],
        current: [{ required: true, message: "Current password is incorrect" }],
        new: [
          {
            required: true,
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{8,14}$/,
            message:
              "Password must be at least 8 characters long and at most 14 characters long, consisting of letter and number",
          },
        ],
        confirm: [{ validator: validateNewPwd }],
      },
      passwordForm: {
        userName: "",
        current: "",
        new: "",
        confirm: "",
      },
    };
  },
  methods: {
    changePassword(val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          let params = {
            newPassword: this.passwordForm.new,
            oldPassword: this.passwordForm.current,
            username: this.passwordForm.userName,
          };
          shopifyService.updatePassword(params).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: "success",
                message: "Password changed successfully",
              });
              this.passwordBoxVisible = false;
            } else {
              this.validateError = true;
            }
          });
        } else {
          return false;
        }
      });
    },
  },
});
</script>
<style lang="less">
.password-box-container {
  .el-dialog {
    width: 662px;
    .el-dialog__header {
      background-color: #f6f6f9;
      padding: 16px 24px;
      .el-dialog__title {
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        color: #272742;
      }
      .el-dialog__close {
        font-weight: bold;
        color: #62628d;
      }
    }
    .el-dialog__body {
      padding: 16px 24px !important;
      .el-form-item {
        margin-bottom: 40px !important;
        .el-input__inner {
          padding: 9px 16px;
          border-radius: 3px;
          border: 1px solid #8e8eb0;
          &:focus {
            outline-color: #b3efff;
            outline-style: auto;
            outline-width: 3px;
            outline-offset: 2px;
          }
        }
      }
    }
    .el-dialog__footer {
      border-top: solid 1px #e5e5ec;
      padding: 16px 24px;
    }
  }
}
.shopify-setting-password {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 0;
}
</style>