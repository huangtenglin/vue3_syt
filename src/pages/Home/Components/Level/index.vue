<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级:</div>
      <ul class="hospital">
        <li
          :class="{ active: homeStore.levelHopital == '' }"
          @click="changeLevel('')"
        >
          全部
        </li>
        <li
          v-for="level in levelArr"
          :class="{ active: homeStore.levelHopital === level.value }"
          :key="level.value"
          @click="changeLevel(level.value)"
        >
          {{ level.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts" name="level">
import { useHomeStore } from '@/store/home';

const { levelArr }: any = defineProps({
  levelArr: {
    type: Array,
    default: () => [],
  },
});

const homeStore = useHomeStore();

const changeLevel = (value: string) => {
  homeStore.setLevelHopital(value);
};
</script>

<style scoped lang="scss">
.level {
  color: #7f7f7f;
  margin-top: 20px;
  h1 {
    font-weight: 900;
    margin: 10px 0px;
  }
  .content {
    display: flex;
    .left {
      margin-right: 10px;
    }
    .hospital {
      display: flex;
      li {
        margin-right: 10px;
        cursor: pointer;
        &.active {
          color: #55a6fe;
        }
      }
      li:hover {
        color: #55a6fe;
        cursor: pointer;
      }
    }
  }
}
</style>
