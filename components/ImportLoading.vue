<template>
  <div class="loading-container">
    <div class="loading">
      <span></span><span></span><span></span><span></span><span></span
      ><span></span><span></span><span></span>
    </div>
    <!-- <span class="loading-info">Importing</span> -->
    <span class="loading-info">Adding</span>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.loading-container {
  border: solid 1px rgba(186, 191, 195, 1);
  border-radius: 4px;
  width: 100%;
  height: 32px;
  padding: 7px 16px;
  background-color: #fff;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: auto;
  }
  .loading-info {
    font-size: 14px;
  }
  .loading {
    width: 0;
    height: 0;
    position: relative;
    margin: 0 20px 0 0;
    span {
      display: block;
      width: 6px;
      height: 2px;
      border-radius: 50%;
      background-color: #6d7175;
      position: absolute;
      &:nth-child(1) {
        top: 7px;
        left: 0px;
        transform: rotate(90deg);
        -webkit-animation: loading 1s ease 0s infinite;
      }
      &:nth-child(2) {
        top: 5px;
        left: 5px;
        transform: rotate(45deg);
        -webkit-animation: loading 1s ease -0.12s infinite;
      }
      &:nth-child(3) {
        top: 0px;
        left: 7px;
        -webkit-animation: loading 1s ease -0.24s infinite;
      }
      &:nth-child(4) {
        top: -5px;
        left: 5px;
        transform: rotate(-45deg);
        -webkit-animation: loading 1s ease -0.36s infinite;
      }
      &:nth-child(5) {
        top: -7px;
        left: 0px;
        transform: rotate(90deg);
        -webkit-animation: loading 1s ease -0.48s infinite;
      }
      &:nth-child(6) {
        top: -5px;
        left: -5px;
        transform: rotate(45deg);
        -webkit-animation: loading 1s ease -0.6s infinite;
      }
      &:nth-child(7) {
        top: 0px;
        left: -7px;
        -webkit-animation: loading 1s ease -0.72s infinite;
      }
      &:nth-child(8) {
        top: 5px;
        left: -5px;
        transform: rotate(-45deg);
        -webkit-animation: loading 1s ease -0.84s infinite;
      }
    }
  }
}
@-webkit-keyframes loading {
  50% {
    // transform: scale(0.4);
    opacity: 0.3;
  }
  100% {
    // transform: scale(1);
    opacity: 1;
  }
}
</style>
