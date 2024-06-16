import Hospital_Top from '@/components/Hospital_Top/index.vue';
import Hospital_Bottom from '@/components/Hospital_Bottom/index.vue';
import Login from '@/components/Login/index.vue';

// 注册全局icon组件
//左侧菜单需要用到的图标
import {
  Document,
  Menu as IconMenu,
  Setting,
  InfoFilled,
  Search,
  HomeFilled,
} from '@element-plus/icons-vue';

const globalComponents: any = { Hospital_Top, Hospital_Bottom, Login };

const iconComponents: any = {
  Document,
  IconMenu,
  Setting,
  InfoFilled,
  Search,
  HomeFilled,
};

export default {
  install(app: any) {
    // 注册全局组件
    Object.keys(globalComponents).forEach((key) => {
      app.component(key, globalComponents[key]);
    });
    // 注册ICON组件
    Object.keys(iconComponents).forEach((key) => {
      app.component(key, iconComponents[key]);
    });
  },
};
