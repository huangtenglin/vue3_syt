<template>
  <div class="app">
    <Hospital_Top />
    <div class="app_body">
      <router-view></router-view>
    </div>
    <Hospital_Bottom />
    <Login v-if="userStore.loginDialog" />
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from './store/user';
const userStore = useUserStore();
</script>
<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  .app_body {
    width: 1200px;
    min-height: 700px;
    margin-top: 70px;
  }
}
</style>
