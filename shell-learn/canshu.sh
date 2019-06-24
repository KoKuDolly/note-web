#!/bin/bash

# echo "Shell 传递参数实例！";
# echo "第一个参数为：$1";

# echo "参数个数为：$#";
# echo "传递的参数作为一个字符串显示：$*";

echo "$#"
echo "$*"
echo "$$"
echo "$!"
echo "$@"
echo "$-"
echo "$?"

for i in "$*"; do
  echo $in "$*"
  done

for i in "$@";do
  echo $i
  done

# echo $- $# $* $$ $! $@ $?