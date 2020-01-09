<!--
 * @Descripttion: 
 * @version: 
 * @Author: jiajun.qin
 * @Date: 2019-10-29 16:05:57
 * @LastEditors  : jiajun.qin
 * @LastEditTime : 2020-01-09 13:38:57
 -->

# git

## 修改已经 commit的信息

[参考链接](https://cloud.tencent.com/developer/article/1335804)

代码

```sh
git log --oneline # 查看历史提交
git rebase -i 历史提交hash值（要在修改的commit历史记录值之前就ok）

# 选择 reword 简写 r 来重新编辑需要编辑的 commit 历史

# 然后 vim 保存退出，自动进入修改过程，进入 vim 编辑器，对响应信息进行编辑，然后再保存退出，结束

# 已经push的，推送的时候加 --force
```

## 同仓库，不同分支的部署

```sh
npm run build

cd ./dist

git init
git add ./-A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
```
