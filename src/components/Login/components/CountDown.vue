<template>
  <div>
    <span>获取验证码({{ time }}s)</span>
  </div>
</template>

<script setup lang="ts">
//引入组合式API函数ref
import { ref, watch, defineEmits } from 'vue';
const emits = defineEmits(['getFlag']);
//倒计时的事件
let time = ref<number>(5);

const props = defineProps({
  flag: {
    type: Boolean,
    default: false,
  },
});

watch(
  () => props.flag,
  (nv: boolean) => {
    // 开启定时器
    let timer = setInterval(() => {
      time.value--;
      if (time.value <= 0) {
        clearInterval(timer);
        emits('getFlag', false);
      }
    }, 1000);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped></style>
