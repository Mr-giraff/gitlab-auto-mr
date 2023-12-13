const { getLocalBranchName } = require("./utils");

// 替换为你的远程分支数组和 Jira 名称
const branches = [
    // "master",
  "R5.4.0",
  // 'R4.9.0.4',
  // 'R4.9.0.3',
  // 'R4.9.0',
];
const jiraName = "DATASIMBA-6666";
const commitHash = "a5b91ca6f9d7297d1e239abd7e462af0fa4d9697"; // 替换为目标 commit 的哈希值，cherry-pick
const mr_default_options = {
  assignees: ["tianzejun", "hongzhanghua", "yijing"], // 要分配合并请求的用户的用户名
};

const localBranchNames = branches.map((branch) =>
  getLocalBranchName(branch, jiraName)
);

module.exports = {
  localBranchNames,
  branches,
  jiraName,
  commitHash,
  mr_default_options,
};
