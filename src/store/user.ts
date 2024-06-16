import { defineStore } from 'pinia';
import { reqCode, reqUserLogin } from '@/api/hospital';
import type { LoginData, UserLoginResponseData } from '@/api/hospital/type';
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/user';
interface UserInfo {
  name: string;
  token: string;
}

interface UserState {
  loginDialog: boolean;
  code: string;
  userInfo: UserInfo;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      loginDialog: false,
      code: '',
      userInfo: JSON.parse(GET_TOKEN() as string) || {},
    };
  },
  actions: {
    changeLoginDialog(type: boolean) {
      this.loginDialog = type;
    },
    // 获取验证码方法
    async getCode(phone: string) {
      // 返回一个promise对象是为了可以拿值
      let res = await reqCode(phone);
      if (res.code === 200) {
        this.code = res.data;
        //返回一个成功的Promise
        return 'ok';
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    //用户手机号码登录方法
    async userLogin(loginFormData: LoginData) {
      let res: UserLoginResponseData = await reqUserLogin(loginFormData);
      if (res.code === 200) {
        this.userInfo = res.data;
        SET_TOKEN(res.data);
        return 'ok';
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    // 退出登录方法
    logout() {
      // 清空仓库数据
      this.userInfo = { name: '', token: '' };
      // 清空本地存储数据
      REMOVE_TOKEN();
    },
    // 查询微信扫码的接口(看本地存储是否存储数据)
    queryState() {
      // 开启定时器每隔一段时间问：本地存储是拥有用户信息
      let timer = setInterval(() => {
        // 如果本次存储有数据：扫码成功
        if (GET_TOKEN()) {
          this.loginDialog = false;
          this.userInfo = JSON.parse(GET_TOKEN() as string);
          clearInterval(timer);
        }
      }, 1000);
    },
  },
  getters: {},
});
