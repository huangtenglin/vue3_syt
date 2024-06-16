<template>
  <div class="search">
    <el-autocomplete
      v-model="search"
      :fetch-suggestions="querySearch"
      clearable
      class="inline-input"
      placeholder="请输入医院名称"
      @select="handleSelect"
    />
    <el-button type="primary" size="default" :icon="Search">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import { reqHospitalInfo } from '@/api/home/index.ts';
const handleSelect = (item: any) => {
  // 选择某一项触发
  console.log(item, 'item');
  router.push({ path: '/hospital/register', query: item });
};
import { Search } from '@element-plus/icons-vue';
let search = ref('');

const querySearch = async (keyword: string, cb: Function) => {
  let result = await reqHospitalInfo(keyword);
  //整理数据，变成人家组件需要数据格式
  let showData =
    result.data?.map((item) => {
      return {
        value: item.hosname, //展示的医院的名字
        hoscode: item.hoscode, //存储医院的编码
      };
    }) || [];
  console.log(result.data);
  //给组件提供展示的户数
  cb(showData);
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;

  :deep(.inline-input) {
    width: 600px !important;
    margin-right: 10px;
  }
}
</style>
