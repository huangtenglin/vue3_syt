<template>
  <div class="carousel">
    <el-carousel>
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="@/assets/images/web-banner-1.png" alt="背景图" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 350px;
}
</style>
<script lang="ts">
export default {
  name: 'lunbotu',
};
</script>
