// 首先引入Mock
const Mock = require('mockjs');

// 设置拦截ajax请求的相应时间
Mock.setup({
    timeout: '200-600'
});

let configArray = [];

// 使用webpack的require.context()遍历所有mock文件
const files = require.context('../mock', true, /\.js$/);
files.keys().forEach((key) => {
    configArray.push({
        path: key.replace('.js', '').replace('./', '/'),
        data: files(key)()
    });
});

// 注册所有的mock服务
configArray.forEach((item) => {
    Mock.mock(new RegExp('^' + item.path), 'get', item.data);
});
