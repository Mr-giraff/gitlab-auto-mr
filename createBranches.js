const { branches, jiraName } = require("./constants");
const {
  getLocalBranchName,
  getRemoteReleaseBranchName,
  getRemoteLatestCommit,
  createBranchFromCommit,
} = require("./utils");

// 存储本地分支名的数组
const localBranches = branches.map((branch) => {
  const localBranchName = getLocalBranchName(branch, jiraName);
  const remoteReleaseBranchName = getRemoteReleaseBranchName(branch);
  const commit = getRemoteLatestCommit(remoteReleaseBranchName);
  
  createBranchFromCommit(localBranchName, commit);
  
  return localBranchName;
});

// 打印生成的本地分支数组
console.log("生成的本地分支数组:", localBranches);
