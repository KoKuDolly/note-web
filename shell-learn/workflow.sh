#! /bin/sh

# for str in 'This' 'is' 'a' string
# do
#     printf "$str\n"
# done

# a=0
# until [ ! $a -lt 10 ]
# do
#   echo $a
#   # a=`expr $a + 1` # 这个表达式中的运算符之间必须保留空格
#   a=$[a+1]   # 赋值运算符是不能有空格的，其他的随便
# done

# case

# echo '输入 1 到 4 之间的数字：'
# echo '你输入的数字为：'
# read aNum
# case $aNum in
#   1) echo '你选择了 1';;
#   2) echo '你选择了 2';;
#   3) echo '你选择了 3';;
#   4) echo '你选择了 4';;
#   *) echo '你选择了 *';;
# esac

# while :
# do
#   echo -n '输入 1 到 5 之间的数字：'
#   read aNum
#   case $aNum in
#     1|2|3|4|5) echo "你输入的数字为 ${aNum}!";;
#     *) echo "你输入的数字不是 1 到 5 之间的！游戏结束"
#     break;;
#   esac
# done

# while :
# do
#   echo -n '输入 1 到 5 之间的数字：'
#   read aNum
#   case $aNum in
#     1|2|3|4|5) echo "你输入的数字为 ${aNum}!";;
#     *) echo "你输入的数字不是 1 到 5 之间的！"
#       continue
#       echo "游戏结束"
#     ;;
#   esac
# done

# for((i=1;i<=5;i++));do
#     echo "这是第 $i 次调用";
# done;

for((i=1;i<=5;));do
    echo "这是第 $i 次调用";
    # let "i++"
    # i=$[i+1]
    i=`expr $i + 1`
done;