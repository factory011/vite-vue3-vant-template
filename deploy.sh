#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Add changes to git.
git add -A

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master

# 使用read命令达到类似bat中的pause命令效果
echo 按任意键继续
read -n 1
echo 继续运行