/**
 * 全局配置文件
 */
/* eslint global-require: 0 */

const pkg = require('../package');

const env = process.env.NODE_ENV || 'development';

const config = {
  name: pkg.name, // 应用名称
  version: pkg.version, // 版本
  bindingHost: '0.0.0.0', // 绑定IPv4
  host:'127.0.0.1',// tunnel服务域名
  port: process.env.PORT || 3000, // 端口
  tunnelSignatureKey: 'x89dk@138xk$x%19',// 信道签名
};


module.exports = config;
