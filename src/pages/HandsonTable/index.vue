<template>
  <div ref="tableRef" class="hottable"></div>
</template>
<script lang="ts" setup>
import Handsontable from 'handsontable';
import { registerAllModules } from 'handsontable/registry';
import { ref, onMounted, getCurrentInstance, nextTick } from 'vue';

registerAllModules();

let hotTable: any = null;
let tableRef: any = ref();
let scrollWrap: HTMLElement;
const setHotTable = (data: string[][], columnData: string[][]) => {
  const { proxy } = getCurrentInstance() as any;
  const hotWrap = proxy.$refs['tableRef']!;
  // 获取容器
  // 展示修改行的内容
  hotTable = new Handsontable(hotWrap, {
    data, //数据
    colWidths: 120, //单元格宽度
    fixedRowsTop: 1, //固定第一行
    fixedColumnsLeft: 2, //固定左两列
    className: 'htCenter htMiddle', //内容居中
    manualColumnResize: true,
    readOnly: false, //只读
    cells: setCells, //渲染单元格
    licenseKey: 'non-commercial-and-evaluation',
    autoWrapCol: true,
    width: '50%',
    height: 'auto',
    columns: function (data) {
      return data;
    },
  });
};
const setCells = () => {
  return {
    renderer: cellsRender,
  };
};

const cellsRender = (
  instance: any,
  td: HTMLTableCellElement,
  row: number,
  col: number,
  prop: any,
  value: any,
  cellProperties: any
) => {
  Handsontable.renderers.TextRenderer.apply(this, [
    instance,
    td,
    row,
    col,
    prop,
    value,
    cellProperties,
  ]);
  if (row % 2 === 0 && row !== 0) {
    td.style.backgroundColor = '#67C23A';
    td.style.color = '#fff';
  } else {
    td.style.backgroundColor = '#f56c6c';
    td.style.color = '#fff';
  }
};

onMounted(() => {
  const data = [
    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1'],
    ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2', 'J2', 'K2'],
    ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3', 'J3', 'K3'],
  ];
  data.map((item: any) => {
    item.unshift(false);
    console.log(item, 'item');
    return item;
  });
  setHotTable(data, []);
});
</script>
