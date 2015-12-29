#ok-1

用于监控服务端不响应的错误    

1. cp config.js.example config.js
2. 根据情况填写 config.js
3. 在 服务器statusUrl 的 get 请求中返回 JSON { ok: 1}
4. 使用 crontab 每隔几秒钟跑一次 node index.js;如果遇到设置的服务器没有返回 { ok: 1} 则会给相关人员发送短信

##TODO

1. 记录服务器异常的起始时间和恢复时间
2. 生成 html 页面
3. 增加更多的异常处理
4. ...
