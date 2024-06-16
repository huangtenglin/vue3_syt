<template>
  <div class="home">
    <lunbotu />
    <search ref="searchRef" />
    <el-row>
      <el-col :span="20">
        <!-- 展示医院层级 -->
        <level ref="levelRef" :levelArr="levelArr"></level>
        <!-- 展示地区 -->
        <region :regionArr="regionArr" />
        <!-- 展示医院结构 -->
        <div
          ref="hospitalRef"
          class="hospital"
          v-if="hasHospitalArr.length > 0"
        >
          <card
            class="item"
            v-for="(item, index) in hasHospitalArr"
            :key="index"
            :hospitalInfo="item"
            @click="toHospitalDetal(item)"
          />
        </div>
        <el-empty v-else description="暂无数据" />
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-col>
      <el-col :span="4">
        <div class="grid-content ep-bg-purple-light">
          <Tip />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import lunbotu from './Components/LunBoTu/index.vue';
import search from './Components/Search/index.vue';
import level from './Components/Level/index.vue';
import region from './Components/Region/index.vue';
import card from './Components/Card/index.vue';
import Tip from './Components/Tip/index.vue';
import { reqHospital } from '@/api/home';
import { ref, onMounted, watch } from 'vue';
import type {
  Content,
  HospitalResponseData,
  HospitalLevelAndRegionArr,
  HospitalLevelAndRegionResponseData,
} from '@/api/home/type.ts';
import { reqHospitalLevelAndRegion } from '@/api/home/index.ts';
import { ElLoading } from 'element-plus';
import { useHomeStore } from '@/store/home';
import { useRouter } from 'vue-router';
const router = useRouter();
let pageNo = ref(1);
let total = ref(0);

let pageSize = ref(10);

let levelRef = ref();

// 定义一个数组存储医院等级数据
let levelArr = ref<HospitalLevelAndRegionArr>([]);
// 定义一个数组存储地区等级数据
let regionArr = ref<HospitalLevelAndRegionArr>([]);

let searchRef = ref();

let hasHospitalArr: any = ref([]);

let hostype = ref<number | string>('');
let districtCode = ref<number | string>('');
let loadingInstance: any;
let hospitalRef = ref();

let homeStore = useHomeStore();

watch(
  () => homeStore.levelHopital,
  (nv: any) => {
    hostype.value = nv;
    getHospitalInfo();
  }
);

watch(
  () => homeStore.levelZone,
  (nv: any) => {
    districtCode.value = nv;
    getHospitalInfo();
  }
);

onMounted(() => {
  getHospitalInfo();
  getHospitalLevelData();
  getRegion();
});

//获取已有的医院的数据
const getHospitalInfo = async () => {
  //获取医院的数据:默认获取第一页、一页十个医院的数据
  try {
    let result: HospitalResponseData = await reqHospital(
      pageNo.value,
      pageSize.value,
      hostype.value,
      districtCode.value
    );
    loadingInstance = ElLoading.service({
      target: hospitalRef.value,
      body: true,
      text: '数据加载中',
    });
    if (result.code == 200) {
      //存储已有的医院的数据
      hasHospitalArr.value = result.data.content;
      //存储医院的总个数
      total.value = result.data.totalElements;
      loadingInstance.close();
    }
  } catch (error) {
    loadingInstance = ElLoading.service({
      target: hospitalRef.value,
      body: true,
      text: error,
    } as any);
  } finally {
    loadingInstance.close();
  }
};

// 获取医院层级数据
const getHospitalLevelData = async () => {
  let result: HospitalLevelAndRegionResponseData =
    await reqHospitalLevelAndRegion('HosType');
  //存储医院等级的数据
  if (result.code == 200) {
    levelArr.value = result.data;
  }
};

//获取地区的数据
const getRegion = async () => {
  let result: HospitalLevelAndRegionResponseData =
    await reqHospitalLevelAndRegion('Beijin');
  //存储全部地区的数据
  if (result.code == 200) {
    regionArr.value = result.data;
  }
};
// 请求分页数据
const handleCurrentChange = (val: number) => {
  console.log(val, '分页数据');
  pageNo.value = val;
  // 重新请求接口数据
  getHospitalInfo();
};
const handleSizeChange = (val: number) => {
  console.log(val, 'xxx');
};

const toHospitalDetal = (item: any) => {
  router.push({ path: '/hospital/register', query: { ...item } });
};
</script>

<style lang="scss" scoped>
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 48%;
    margin: 10px 0px;
  }
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
.grid-content {
  margin-left: 20px;
}
</style>
