<template>
  <el-button @click="handleAllRowSelect(true)">全选</el-button>
  <el-button @click="handleAllAdditionalRowSelect(false)">撤销</el-button>
  <el-button @click="saveData">保存</el-button>
  <el-button type="primary" @click="openDialog">点击弹窗</el-button>
  <el-dialog v-model="outerVisible" title="Outer Dialog" width="800">
    <span>This is the outer Dialog</span>
    <el-dialog
      v-model="innerVisible"
      :fullscreen="true"
      title="Inner Dialog"
      append-to-body
    >
      <span>This is the inner Dialog</span>
    </el-dialog>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="outerVisible = false">Cancel</el-button>
        <el-button type="primary" @click="innerVisible = true">
          Open the inner Dialog
        </el-button>
      </div>
    </template>
  </el-dialog>
  <div class="handsontable">
    <div ref="tableRef" class="hottable" style="height: 200px"></div>
  </div>
  <!-- 选择要复制的table -->
  <div class="handsontable">
    <div
      ref="tableRef2"
      class="hottable"
      style="margin-top: 50px; height: 200px"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import axios from 'axios'
import Handsontable from 'handsontable'
import 'handsontable/dist/handsontable.full.min.css'
import { registerAllModules } from 'handsontable/registry'
import { ref, onMounted, getCurrentInstance, nextTick } from 'vue'
const { proxy } = getCurrentInstance()
let hotTable: any = null
let tableRef: any = ref()
let tableRef2: any = ref()

const outerVisible = ref(false)
const innerVisible = ref(false)

const setHotTable = (data: any, []) => {
  const { proxy } = getCurrentInstance() as any
  const hotWrap = proxy.$refs['tableRef']!
  // 获取容器
  // 展示修改行的内容
  hotTable = new Handsontable(hotWrap, {
    data: data, //数据
    colWidths: 120, //单元格宽度
    fixedRowsTop: 1, //固定第一行
    fixedColumnsLeft: 2, //固定左两列
    className: 'htCenter htMiddle', //内容居中
    width: '750px',
    manualColumnResize: true, // 是否允许让列的宽度自适应
    rowHeaders: true,
    autoWrapRow: true,
    autoWrapCol: true,
    // cells: setAddtionalColumnCells, //渲染单元格
    // afterScrollHorizontally,
    licenseKey: 'non-commercial-and-evaluation',
    afterGetRowHeader: drawCheckboxInRowHeaders,
    afterGetColHeader: alignHeaders,
    beforeRenderer: addClassesToRows,
    persistentState: true,
    afterCellMetaReset: function () {},
    // 需要隐藏的列数据
    hiddenColumns: {
      // specify columns hidden by default
      columns: [0],
    },
    dragToScroll: true,
  })
}

const setCopyHotTable = (data: any, []) => {
  const hotWrap = proxy.$refs['tableRef2']!
  // 获取容器
  // 展示修改行的内容
  hotTable = new Handsontable(hotWrap, {
    data: data, //数据
    colWidths: 120, //单元格宽度
    fixedRowsTop: 1, //固定第一行
    fixedColumnsLeft: 2, //固定左两列
    className: 'htCenter htMiddle', //内容居中
    manualColumnResize: true, // 是否允许让列的宽度自适应
    rowHeaders: true,
    // cells: setAddtionalColumnCells, //渲染单元格
    licenseKey: 'non-commercial-and-evaluation',
    afterGetRowHeader: drawCheckboxInRowHeaders,
    afterGetColHeader: alignHeaders,
    beforeRenderer: addClassesToRows,
    persistentState: true,
    afterCellMetaReset: function () {},
    // 需要隐藏的列数据
    hiddenColumns: {
      // specify columns hidden by default
      columns: [0],
    },
    width: '750px',
  })
}

const saveData = () => {
  const data = hotTable.getData()
  hotTable.loadData(data)
  setCopyHotTable(data, [])
}

const SELECTED_CLASS = 'selected'
const ODD_ROW_CLASS = 'odd'
function addClassesToRows(TD, row, column, prop, value, cellProperties) {
  // Adding classes to `TR` just while rendering first visible `TD` element
  if (column !== 0) {
    return
  }

  const parentElement = TD.parentElement

  if (parentElement === null) {
    return
  }

  // Add class to selected rows
  if (cellProperties.instance.getDataAtRowProp(row, '0')) {
    Handsontable.dom.addClass(parentElement, SELECTED_CLASS)
  } else {
    Handsontable.dom.removeClass(parentElement, SELECTED_CLASS)
  }

  // Add class to odd TRs
  if (row % 2 === 0) {
    Handsontable.dom.addClass(parentElement, ODD_ROW_CLASS)
  } else {
    Handsontable.dom.removeClass(parentElement, ODD_ROW_CLASS)
  }
}

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
  ])
  if (row % 2 === 0) {
    td.style.backgroundColor = '#67C23A'
    td.style.color = '#fff'
  } else {
    td.style.backgroundColor = '#f56c6c'
    td.style.color = '#000'
  }
}
let Tabledata: any = ref([])

const handleAllRowSelect = (value: boolean) => {
  let allRow: any = hotTable.getRowHeader()
  const optionData = allRow.map((item: any) => {
    return [item - 1, '0', true]
  })

  hotTable.setDataAtRowProp(optionData)
}

const handleAllAdditionalRowSelect = (value: boolean) => {
  let allRow: any = hotTable.getRowHeader()
  const optionData = allRow.map((item: any) => {
    return [item - 1, '0', false]
  })
  hotTable.setDataAtRowProp(optionData)
}

const setAddtionalColumnCells = () => {}

function drawCheckboxInRowHeaders(row: any, TH: any) {
  const input = document.createElement('input')

  input.type = 'checkbox'

  if (row >= 0 && this.getDataAtRowProp(row, '0')) {
    input.checked = true
  }

  Handsontable.dom.empty(TH)

  TH.appendChild(input)
}
const headerAlignments: any = new Map([
  ['9', 'htCenter'],
  ['10', 'htRight'],
  ['12', 'htCenter'],
])
function alignHeaders(column: any, TH: any) {
  if (column < 0) {
    return
  }

  if (TH.firstChild) {
    const alignmentClass = this.isRtl() ? 'htRight' : 'htLeft'

    if (headerAlignments.has(column.toString())) {
      Handsontable.dom.removeClass(TH.firstChild, alignmentClass)
      Handsontable.dom.addClass(
        TH.firstChild,
        headerAlignments.get(column.toString())
      )
    } else {
      Handsontable.dom.addClass(TH.firstChild, alignmentClass)
    }
  }
}

onMounted(() => {
  Tabledata.value = [
    [
      false,
      '行号',
      'ID',
      '测试1',
      '测试2',
      '测试3',
      '测试4',
      '测试1',
      '测试2',
      '测试3',
      '测试4',
      '测试1',
      '测试2',
      '测试3',
      '测试4',
    ],
    [
      false,
      1,
      1,
      1,
      1,
      1,
      2,
      '测试1',
      '测试2',
      '测试3',
      '测试4',
      '测试1',
      '测试2',
      '测试3',
      '测试4',
    ],
    [
      false,
      1,
      1,
      1,
      1,
      1,
      2,
      '测试1',
      '测试2',
      '测试3',
      '测试4',
      '测试1',
      '测试2',
      '测试3',
      '测试4',
    ],
    [
      false,
      1,
      1,
      1,
      1,
      1,
      1,
      '测试1',
      '测试2',
      '测试3',
      '测试4',
      '测试1',
      '测试2',
      '测试3',
      '测试4',
    ],
    [
      false,
      1,
      1,
      1,
      1,
      1,
      1,
      '测试1',
      '测试2',
      '测试3',
      '测试4',
      '测试1',
      '测试2',
      '测试3',
      '测试4',
    ],
    [
      false,
      1,
      1,
      1,
      1,
      1,
      1,
      '测试1',
      '测试2',
      '测试3',
      '测试4',
      '测试1',
      '测试2',
      '测试3',
      '测试4',
    ],
  ]
  registerAllModules()
  setHotTable(Tabledata.value, [])
  // proxy.$refs['tableRef']!.hotInstance.refreshDimensions()
  nextTick(() => {
    hotTable.refreshDimensions()
  })

  axios.post('/api2/test2').then((res) => {})
})

const openDialog = () => {
  outerVisible.value = true
}
</script>

<style lang="scss" scoped>
.handsontable {
  width: 50%;
  overflow-x: hidden;
  height: 300px;
}
</style>
