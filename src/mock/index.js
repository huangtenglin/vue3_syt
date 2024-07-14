import mock from 'mockjs'
import Mock from 'mockjs'
import { Random } from 'mockjs'
const login = () => {
  return mock.mock({
    code: 200,
    message: '登录成功',
    data: {
      token: '1234567860',
    },
  })
}

const getUserInfo = () => {
  return mock.mock({
    code: 200,
    message: '获取用户信息成功',
    data: {
      name: '张三',
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      roles: ['admin'],
      'list|1-10': [
        {
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          'id|+1': 1,
          username: '@cname',
          title: '@ctitle(8)',
          sentence: '@csentence(50)',
        },
      ],
    },
  })
}

Mock.mock('/api2/test2', 'post', getUserInfo)
