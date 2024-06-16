<template>
  <div class="hospital">
    <div class="menu">
      <div class="menu">
        <div class="top">
          <el-icon><HomeFilled /></el-icon>
          <span> / 医院信息</span>
        </div>
        <el-menu :default-active="$route.path" route>
          <el-menu-item
            v-for="item in menuRoutes"
            :index="item.index"
            @click="changeActive(item.path)"
          >
            <el-icon> <component :is="item.icon" /></el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { onMounted } from 'vue';
import { useDetailStore } from '@/store/detail';
import { useRouter, useRoute } from 'vue-router';
const route = useRoute();
const detailStore = useDetailStore();
const menuRoutes = [
  {
    index: '/hospital/register',
    path: '/hospital/register',
    name: '预约挂号',
    icon: 'IconMenu',
  },
  {
    index: '/hospital/detail',
    path: '/hospital/detail',
    name: '医院详情',
    icon: 'Document',
  },
  {
    index: '/hospital/notice',
    path: '/hospital/notice',
    name: '停诊信息',
    icon: 'Setting',
  },
  {
    index: '/hospital/close',
    path: '/hospital/close',
    name: '预约通知',
    icon: 'InfoFilled',
  },
  {
    index: '/hospital/search',
    path: '/hospital/search',
    name: '查询/取消',
    icon: 'Search',
  },
];

onMounted(async () => {
  const hoscode: any = route.query.hoscode;
  await detailStore.getHospitalInfo(hoscode);
  await detailStore.getHopitalDeparment(hoscode);
});

const changeActive = (path: string) => {
  router.push({
    path: path,
    query: {
      hoscode: route.query.hoscode,
    },
  });
};
</script>

<style scoped lang="scss">
.hospital {
  display: flex;
  .menu {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top {
      color: #7f7f7f;
    }
  }
  .content {
    flex: 8;
  }
}
</style>
