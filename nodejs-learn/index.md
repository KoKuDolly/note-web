<!--
 * @Descripttion: 
 * @version: 
 * @Author: jiajun.qin
 * @Date: 2020-04-18 15:47:23
 * @LastEditors: jiajun.qin
 * @LastEditTime: 2020-04-18 17:27:13
 -->

# nodejs 知识点

## assert 断言

## async_hooks 异步钩子  试验

## Buffer 缓冲器

读取或操作二进制数据流

TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互

现在可以使用 TypedArray， Buffer 类以更优化和更适合 Node.js 的方式实现了 Uint8Array API。

## child_process 子进程

child_process 模块提供了衍生子进程的能力

stdin、 stdout 和 stderr 的管道

## cluster 集群

单个 Node.js 实例运行在单个线程中。 为了充分利用多核系统，有时需要启用一组 Node.js 进程去处理负载任务

工作进程由 child_process.fork() 方法创建，因此它们可以使用 IPC 和父进程通信，从而使各进程交替处理连接服务。

## console 控制台

## crypto 加密

OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装

## debugger 调试器

## dgram 数据报

UDP 数据包 socket 的实现

## dns 域名服务器

## domain 域 废弃

## Error 错误

## events 事件触发器

所有能触发事件的对象都是 EventEmitter 类的实例

```node
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('触发事件');
});
myEmitter.emit('event');
```

## fs 文件系统

模仿标准 POSIX 函数的方式与文件系统进行交互

## global 全局变量

## http

接口永远不会缓冲整个请求或响应，所以用户能够流式传输数据。

## http2

## https

TLS/SSL 的 HTTP 协议

## inspector 调试器 试验

## module 模块

## net 网络

用于创建基于流的 TCP 或 IPC 的服务器（net.createServer()）与客户端（net.createConnection()）

Windows 上支持命名管道 IPC，在其他操作系统上支持 Unix 域套接字

## os 操作系统

## path 路径

Windows 与 POSIX 的对比

## perf_hooks 性能钩子

## process 进程

## querystring 查询字符串

## readline 逐行读取

## repl 交互式解释器

## stream 流

流可以是可读的、可写的、或者可读可写的。 所有的流都是 EventEmitter 的实例

尽管理解流的工作方式很重要，但是 stream 模块主要用于开发者创建新类型的流实例。 对于以消费流对象为主的开发者，极少需要直接使用 stream 模块。

## string_decoder 字符串解码器

## timer 定时器

## tls 安全传输层

tls 模块是对安全传输层（TLS）及安全套接层（SSL）协议的实现，建立在OpenSSL的基础上。 按如下方式引用此模块:

TLS/SSL 概念

## trace_events 跟踪事件 试验

## tty 终端

## url

## util 实用工具

util 模块用于支持 Node.js 内部 API 的需求。 大部分实用工具也可用于应用程序与模块开发者

## v8 v8引擎

## vm 虚拟机

## worker_threads 工作线程

## zlib 压缩

zlib 模块提供通过Gzip、Deflate/Inflate、和 Brotli 实现的压缩功能

压缩和解压都是围绕 Node.js 的 Streams API 构建的
