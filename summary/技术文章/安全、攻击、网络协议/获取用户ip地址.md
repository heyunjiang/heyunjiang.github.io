## 使用WEBRTC

```
var rtc = new RTCPeerConnection({iceServers:[]});
rtc.createDataChannel('', {reliable:false});
rtc.onicecandidate
rtc.createOffer
```

## 通过访问服务器，服务器返回ip地址

## 使用第三方服务

使用新浪、搜狐等

`<script type="text/javascript" src="http://counter.sina.com.cn/ip/" charset="gb2312"></script> `

`<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>  `