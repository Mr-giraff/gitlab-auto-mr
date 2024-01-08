const { localBranchNames, remoteBranchNames } = require("./constants");
const {
  getRemoteLatestCommit,
  createBranchFromCommit,
  deleteLocalBranch,
} = require("./utils");

function afterCreate({ passed, generatedLocalBranches }) {
  if (passed) {
    // 打印生成的本地分支数组
    console.log("生成的本地分支数组:", generatedLocalBranches);
  } else {
    // 回滚
    generatedLocalBranches.forEach(deleteLocalBranch);
  }
}

// 远程目标分支的最新 commit
function getRemoteBranchLatestCommits() {
  const commits = [];

  const passed = remoteBranchNames.every((branch) => {
    const commit = getRemoteLatestCommit(branch);
    commits.push(commit);
    return commit;
  });

  return {
    commits,
    passed,
  };
}

function createLocalBranchByCommit(branches, commits) {
  // 存储创建成功的本地分支
  const generatedLocalBranches = [];

  // 判断是否每个本地分支都创建成功
  const passed = branches.every((branch, index) => {
    const commit = commits[index];

    if (commit && createBranchFromCommit(branch, commit)) {
      generatedLocalBranches.push(branch);
      return true;
    }
    return false;
  });

  return {
    passed,
    generatedLocalBranches,
  };
}

function createBranch() {
  const { passed, commits } = getRemoteBranchLatestCommits();
  if (!passed) return;
  afterCreate(createLocalBranchByCommit(localBranchNames, commits));
}

createBranch()