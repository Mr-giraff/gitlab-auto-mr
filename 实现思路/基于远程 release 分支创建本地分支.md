# 基于远程分支创建一个本地分支：git checkout -b my_local_branch origin/remote_branch

该方式会跟远程建立跟踪，pass。比如基于 master 创建 hotfix/jira-issues-id，本意是想创建一个 origin/hotfix/jira-issues-id ，方便执行 MR，但默认会推送到 master

# 基于远程 R 版的 commit id 创建本地分支（最终方案）

1. 找到远程 commit：git ls-remote origin feature-A
2. 基于 commit 创建分支：git checkout -b feature-B <commit编号>
3. 推送到远程：git push -u origin feature-B


# 拉取远程 R 版到本地，基于本地分支创建
 
1. 建立本地分支
   1. 切换到 feature-A：git checkout feature-A
   2. 保证本地最新：git pull
   3. 创建并切换到 feature-B：git checkout -b feature-B
2. 推送到远程：git push -u origin feature-B