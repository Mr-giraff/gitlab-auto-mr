https://docs.gitlab.com/16.4/ee/user/project/merge_requests/creating_merge_requests.html#when-you-use-git-commands-locally

https://docs.gitlab.com/16.4/ee/user/project/push_options.html

https://guoxudong.io/post/gitlab-push-create-mr/

GitLab 的 merge_request 配置项用于在使用 git push 命令时控制合并请求（Merge Request）的行为。以下是一些常用
的 merge_request 配置项清单：

merge_request.create：创建一个合并请求
merge_request.target=<branch_name>：指定合并请求的目标分支
merge_request.title="<title>"：设置合并请求的标题
merge_request.description="<description>"：设置合并请求的描述
merge_request.assign="<user>"：将合并请求分配给指定的用户
merge_request.remove_source_branch=true：合并请求合并后删除源分支
merge_request.squash=true：将合并请求中的提交压缩为一个提交
merge_request.labels="<label1,label2>"：为合并请求添加标签
这只是一些常见的配置项示例，GitLab 还提供了更多配置项，你可以根据具体需求参考 GitLab 的官方文档进行配置。