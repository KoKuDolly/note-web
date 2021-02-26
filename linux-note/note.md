# linux

## GNU Hurd

许多 UNIX 系统上也安装了 GNU 软件，因为 GNU 软件的质量比之前 UNIX 的软件还要好。GNU 工具还被广泛地移植到 Windows 和 Mac OS 上。

## GNU/Linux Linux

## 常用技巧

EADDRINUSE： 给定的地址已经被使用 ，端口被占用

sudo lsof -i :8088 // 查看端口使用情况
sudo kill -9 47862 // 杀死展示的 PID

### 查看软件安装目录

which softwareName

### ln 命令

链接文件 链接文件夹

```sh
# 将/source 文件夹 软链接到 /xx 中，访问 /xx 相当于访问的 /source
ln -s /xx /source
# 硬链接 但是目录不允许
ln /xx /source
# 硬连接 文件可以
ln xx.txt source.js

```

ln 的 -n 选项

### ls 命令

```sh
#  a all l list i inode
#  可以查看多个文件，不传查看全部
ls -ali a.txt b.txt [...c.txt...]
```
