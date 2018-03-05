# react-router history

问题描述：

`browserHistory`：项目中使用的browserHistory，发布后的访问url如下 `10.115.0.168:8080/plmPortal/dist/docList`，这里在内部跳转(不刷新浏览器)没有问题，但是用户手动刷新浏览器，就会出现404

解决办法： 

1. 服务器做配置，配置根目录(我不会，因为我是前端，以前也是搞php的，这里用的tomcat，搞不懂，没有时间去搞)
2. 换成 `hashHistory` 

我采用的第二种办法，换成 `hashHistory` ，这样访问url如下了 `10.115.0.168:8080/plmPortal/dist/#/docList`，随便用户刷新、前进、后退

## browserHistory

## hashHistory