<template>
  <div class="region">
    <div class="content">
      <div class="left">地区:</div>
      <ul>
        <li
          :class="{ active: homeStore.levelZone == '' }"
          @click="changeZone('')"
        >
          全部
        </li>
        <li
          v-for="item in props.regionArr"
          :key="item.value"
          :class="{ active: homeStore.levelZone == item.value }"
          @click="changeZone(item.value)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts" name="region">
import { ref, reactive } from 'vue';
import { useHomeStore } from '@/store/home.ts';
const homeStore = useHomeStore();

const props: any = defineProps({
  regionArr: {
    type: Array,
    default: () => [],
  },
});

const changeZone = (value: string) => {
  homeStore.setLevelZone(value);
};
</script>

<style scoped lang="scss">
.region {
  color: #7f7f7f;
  margin-top: 20px;
  .content {
    display: flex;
    .left {
      margin-right: 10px;
      width: 50px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        &.active {
          color: #55a6fe;
        }
      }
      li:hover {
        color: #55a6fe;
      }
    }
  }
}
</style>
