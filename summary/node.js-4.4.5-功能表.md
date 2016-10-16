create time at 2016.6.6 16:19

1、断言 -- assertion
前期可以不过分深究

2、buffer 
速度快于string,里面包含了buffer的创建、读取、添加等各种操作，完善

3、c/c++ 扩展，自己编写

4、Child Process 子进程
同步与异步创建子进程
stdin, stdout and stderr 将父子进程间的数据通过pipe连通起来
只能使用 child_process.fork() 能实现父子进程间的ipc通信

5、cluster 集群
用于快速创建子进程，利用多核cpu
2种分发请求方式：1、主进程监听端口，把接收到的连接请求采用轮询调度方式分发给worker进程；
		 2、主进程监听端口，把接收到的连接请求直接分发给它喜欢的worker进程；
注意：不要使用类似session的 in-memory data ，因为nodejs之间的workers不共享状态
      worker pool 需要自己管理，系统不会主动管理，要清楚每个worker的用处。

6、命令行

7、console

8、crypto  加密等算法  未学

9、debugger 调试

10、dns 解析服务 粗略学习了

11、domain可以暂时忽略，以后会有代替的

12、errors未学

13、events事件 
类emitter

14、File System
多多使用异步，同步会阻塞进程，直到处理完成

15、Globals 全局变量

16、HTTP

17、HTTPS

18、modules 如何加载

19、NET 网络 net.server  net.socket

20、os 调用一些低层的os模块，返回os信息

21、path 路径解析

22、process

23、punycode 编码

24、querystring 字符串与json转换，序列化

25、Readline 读取一行，实现对应接口，指定输入输出流

26、REPL 读取-执行-输出-循环，被用作调试、测试或仅仅尝试某些东西

27、stream 流  以后需要仔细学习

28、StringDecoder 字符串解码器

29、timer

30、Tls/ssl 证书，可以创建签证服务器

31、tty 与net.Socket关联的输入输出流，终端

32、UDP / Datagram udp数据报  创建udp服务器

33、URL  URL 解析

34、util  实用工具，小工具

35、V8 返回V8信息，添加新的命令行

36、vm 编译执行js

37、zlib 各种压缩，内存调优





























