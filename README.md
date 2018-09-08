# qcloud-apigateway-sign-demo-js

## 注意事项

- 默认创建的API是需要鉴权，可以勾选免鉴权则请求该API时不需要发送鉴权
- 若API选择需要鉴权，则该API（所在的服务）需要发布、该发布环境需要绑定使用计划、而且该使用计划需要绑定API-KEY，然后使用对应的API-KEY来访问该API
- 含有中文和空格的query, body在请求时需要对值进行urlencode处理，编码为utf-8.
- 参数计算签名时，必须使用编码前的值进行签名，不能用urlencode后字符串的进行签名.所以请在签名之后再对query、body的值做urlencode。

## QCLOUD API GATEWAY客户端错误码
|错误代码|http状态码|语义|解决方案|
|--|---|---|---|
|Not Found Host|404	|请求中没有携带Host字段	|请求携带host字段，该字段值需要填服务器的域名，且为string类型|
|Get Host Fail|404|请求中携带的Host字段值并不是string类型|将Host字段值改为string类型|
|Could not support method|404|并不支持该请求方法类型|检查请求方法是否合法|
|There is no api match host[$host]|404|找不到请求服务器域名/地址|检查请求地址是否正确|
|There is no api match env_mapping[$env_mapping]|404|自定义域名后的env_mapping字段错误|检查绑定的自定义域名配置的env_mapping是否与自己填写的一致|
|There is no api match default env_mapping[$env_mapping]|404|默认域名后的env_mapping字段需要是test/prepub/release|默认域名后的env_mapping字段需要是test/prepub/release|
|There is no api match uri[$uri]|404|在该请求地址对应的服务下找不到对应uri匹配的API|请检查uri填写是否正确|
|There is no api match method[$method]|404|在该请求地址+uri对应的API并不支持该请求方法|请检查请求方法是否正确|
|"Not allow use HTTPS protocol或者Not allow use HTTP protocol"|404|该请求地址对应的服务并不支持对应HTTP协议类型|请检查请求协议类型是否正确|
|req is cross origin, api $uri need open cors flag on qcloud apigateway.|429|该请求是跨域请求，但对应的API并未打开跨域开关|请打开该API的跨域开关|
|HMAC signature cannot be verified, a validate authorization header is required|401|请求并未携带Authorization字段|请根据文档API鉴权一章构造Authorization字段，或者参照demo构造该字段|
|authorization headers is invalidate|403|请求Authorization字段格式不正确|请根据文档API鉴权一章构造Authorization字段，或者参照demo构造该字段|
|id or signature missing|403|请求Authorization字段无id或者signature字段|请根据文档API鉴权一章构造Authorization字段，或者参照demo构造该字段|
|HMAC signature cannot be verified, a valid $header header is required|403|请求Authorization字段中的headers字段在请求header中找不到对应字段	|请根据文档API鉴权一章构造Authorization字段，或者参照demo构造该字段|
|HMAC signature cannot be verified, a valid date header is required|403|请求Authorization必须需要使用date字段作为鉴权字段之一|请根据文档API鉴权一章构造Authorization字段，或者参照demo构造该字段|
|Found no validate usage plan|403|请求鉴权失败，API需要鉴权，但该API并没有绑定使用计划|关闭该API的鉴权或者给该API所在的发布环境绑定使用计划，给该使用计划绑定apikey|
|HMAC signature cannot be verified|403|请求鉴权失败，Authorization字段中携带的key id并未绑定该API所在的发布环境，或者key id非法，或者该key被禁用|请检查该APIkey是否可用,另外，检查该APIKEY是否绑定对应使用计划/发布环境|
|HMAC signature does not match|403|请求鉴权失败，计算出来的hmac值并不一致，请重新检查并计算。|计算的hmac值错误，请根据文档API鉴权一章构造Authorization字段，或者参照demo构造该字段|