# git 使用笔记

git branch -r -d origin/branch-name 删除与远程分支的别名跟踪

git push origin :branch-name 删除远程分支仓库

git push origin --delete branch-name 删除远程分支仓库

git push origin -d branch-name 删除远程分支仓库

git branch -m master master_copy 本地分支改名

git checkout -b master master_copy 基于master分支创建新分支

git checkout origin/branch-name 检出远程分支

git clone --depth=1 url 只拷贝最近一次commit的内容

git branch --unset-upstream  解绑与远程分支的跟踪

git push --set-upstream origin 远程分支名    建立push时与远程分支跟踪，发布本地分支到远程

git clone --depth=1 url    克隆最后一次提交的内容

## 远程分支跟踪

git pull <remote> <branch>

git branch --set-upstream-to=origin/<branch> xiazai_01

git push --set-upstream origin xiazai_01
