## http

请求报文：3部分

请求行、首部行、实体行（数据data）

```

	GET /dir/index.html HTTP/1.1
	HOST: www.some.edu
	Connection: close
	User-agent: Mozilla/5.0
	Accept-language: fr

```

响应报文: 3部分

状态行、首部行、实体行

```

	HTTP/1.1 200 ok
	Connection: close
	Date: Tue, 09 Aug 2011 15:44:44 GMT
	Server: Apache/2.2.3 (centos)
	Last-Modified:　Tue, 09 Aug 2011 15:22:44 GMT
	Content-Length: 6821
	Content-type: text/html
	
	(data)
```

## ip

ipv4

**首部**（20或24字节）：版本号(4)＋首部长度(4)＋服务类型＋数据报长度(16)

剩余：**寿命**、**上层协议**、**首部校验和**、**源IP**、**目的IP**、**数据**、标识、标志、片偏移
