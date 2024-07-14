import { defineStore } from 'pinia';
import { reqHospitalDetail, reqHospitalDeparment } from '@/api/hospital';
import type {
  HosPitalDetail,
  DeparmentResponseData,
  DeparmentArr,
} from '@/api/hospital/type';

interface DetailState {
  hospitalInfo: HosPitalDetail;
  deparmentArr: DeparmentArr;
}
export const useDetailStore = defineStore('detail', {
  state: (): DetailState => {
    return {
      // 将默认的空对象断言为HosPitalDetail
      hospitalInfo: {} as HosPitalDetail,
      // 存储医院科室的数据
      deparmentArr: [],
    };
  },
  actions: {
    // 获取医院详情数据
    async getHospitalInfo(hoscode: string) {
      let res: any = await reqHospitalDetail(hoscode);
      if (res.code === 200) {
        this.hospitalInfo = res.data;
      }
    },
    // 获取医院部门数据
    async getHopitalDeparment(hoscode: string) {
      let res: DeparmentResponseData = await reqHospitalDeparment(hoscode);
      if (res.code === 200) {
        this.deparmentArr = res.data;
      }
    },
  },
  getters: {},
});
