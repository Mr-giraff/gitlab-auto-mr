const { execSync } = require("child_process");

function getLocalBranchName(branchName, jiraNumber) {
  return `hotfix/${branchName}-${jiraNumber}`;
}

function getRemoteReleaseBranchName(branchName) {
  return branchName === "master" ? branchName : `release-${branchName}`;
}

function getRemoteLatestCommit(branchName) {
  try {
    // 执行 git ls-remote 命令获取远程分支的提交信息
    // 指定 refs/heads/ 前缀，避免 refs/for 污染
    const output = execSync(`git ls-remote origin refs/heads/${branchName}`)
      .toString()
      .trim();
    const commitHash = output.split("\t")[0];
    if(commitHash === '') { console.error(`获取远程 ${branchName} 最新 commit 编号失败: 请检查分支远程是否存在`); }
    return commitHash;
  } catch (error) {
    console.error(`获取远程 ${branchName} 最新 commit 编号失败:`, error);
    return null;
  }
}

function getCommitInfo(commitSHA) {
  try {
    // 使用 git show 命令获取 commit 的 message 和描述信息
    const commitInfo = execSync(`git show --format=%B -s ${commitSHA}`)
      .toString()
      .trim();

    // 分割 message 和描述信息
    const [message, description] = commitInfo.split("\n\n", 2);

    console.log("Commit Message:", message);
    console.log("Commit Description:", description);

    return [message, description];
  } catch (error) {
    console.error("获取 commit 信息失败:", error.message);
  }
}

function createBranchFromCommit(branchName, commitHash) {
  try {
    // 创建新分支并
    execSync(`git branch ${branchName} ${commitHash}`);
    console.log(`已成功创建新分支 ${branchName}`);
    return true;
  } catch (error) {
    console.error(`创建分支 ${branchName} 失败:`, error);
    return false;
  }
}

function pushBranchToRemote(branchName) {
  try {
    // 切换到目标本地分支
    execSync(`git checkout ${branchName}`);

    // 将本地分支推送到远程仓库并建立关联
    execSync(`git push -u origin ${branchName}`);
    console.log(`已成功将本地分支 ${branchName} 推送到远程仓库`);
  } catch (error) {
    console.error(`推送本地分支 ${branchName} 到远程仓库失败:`, error);
  }
}

function deleteLocalBranch(branchName) {
  try {
    // 检查当前分支是否为要删除的分支
    const currentBranch = execSync("git rev-parse --abbrev-ref HEAD")
      .toString()
      .trim();
    const isCurrentBranch = currentBranch === branchName;

    // 如果当前分支为要删除的分支，则切换到其他分支
    if (isCurrentBranch) {
      execSync("git checkout master");
    }

    // 删除本地分支
    execSync(`git branch -D ${branchName}`);
    console.log(`已成功删除本地分支 ${branchName}`);
  } catch (error) {
    console.error(`删除本地分支 ${branchName} 失败:`, error);
  }
}

function deleteRemoteBranch(branchName) {
  try {
    // 删除远程分支
    execSync(`git push origin --delete ${branchName}`);
    console.log(`已成功删除远程分支 ${branchName}`);
  } catch (error) {
    console.error(`删除远程分支 ${branchName} 失败:`, error);
  }
}

function cherryPickCommitToLocalBranch(branchName, commitHash) {
  try {
    // 切换到目标本地分支
    execSync(`git checkout ${branchName}`);

    // Cherry-pick commit
    execSync(`git cherry-pick ${commitHash}`);
    console.log(
      `已成功将 commit ${commitHash} cherry-pick 到本地分支 ${branchName}`
    );
    return true;
  } catch (error) {
    console.error(
      `将 commit ${commitHash} cherry-pick 到本地分支 ${branchName} 失败:`,
      error
    );
    return false;
  }
}

function createMergeRequestOptions(branch, jiraNumber, commitHash) {
  const [title, description = `Closes ${jiraNumber}`] =
    getCommitInfo(commitHash);
  return {
    source: getLocalBranchName(branch, jiraNumber),
    target: getRemoteReleaseBranchName(branch),
    title: title,
    description: `${description}`,
  };
}

function createMergeRequest(options) {
  try {
    // 切换到目标本地分支
    execSync(`git checkout ${options.source}`);

    // 构建命令
    let command = `git push origin ${options.source} -o merge_request.create -o merge_request.target=${options.target}`;

    if (options.title) {
      command += ` -o merge_request.title="${options.title}"`;
    }

    if (options.description) {
      command += ` -o merge_request.description="${options.description}"`;
    }

    if (options.assignees) {
      options.assignees.map((assignee) => {
        command += ` -o merge_request.assign="${assignee}"`;
      });
    }

    if (options.reviewers) {
      options.reviewers.map((reviewer) => {
        command += ` -o merge_request.reviewer="${reviewer}"`;
      });
    }

    // 推送分支并创建合并请求
    execSync(command);

    console.log("成功创建合并请求");
  } catch (error) {
    console.error("创建合并请求失败:", error);
  }
}

module.exports = {
  getLocalBranchName,
  getRemoteReleaseBranchName,
  getRemoteLatestCommit,
  createBranchFromCommit,
  pushBranchToRemote,
  deleteLocalBranch,
  deleteRemoteBranch,
  cherryPickCommitToLocalBranch,
  createMergeRequestOptions,
  createMergeRequest,
};
