## 签名

sha1(input+tunnelSignatureKey)


## 错误码

code 0 正常


## 获取信道地址

POST /api/get/wsurl

请求参数

字段|类型|备注
---|---|---
token|string|业务方 token
url|string|业务方 url
signature|string|签名：sha1(token+url+tunnelSignatureKey)

响应参数

字段|备注
---|---
code|响应码
data.tunnelId|信道
data.url|信道 websocket 连接地址


## 发送信息

POST /api/ws/push

请求参数

字段|类型|备注
---|---|---
tunnelIds|array|要发送的所有信道
directive|json|指令信息，如：{"type":"send","msg":{"a":456}}
signature|string|签名，暂未使用

响应参数

字段|备注
---|---
code|响应码
msg|响应提示

备注：
type 当前支持：send、close


## 建立 socket 连接

请求地址：获取信道地址返回的 data.url

请求参数

字段|类型|备注
---|---|---
token|string|业务方 token
tunnelId|string|获取信道地址返回的 data.tunnelId
signature|string|sha1(token+tunnelId+tunnelSignatureKey)

备注，建立连接时，当签名校验失败，连接会被立即关闭