const { localBranchNames, commitHash } = require("./constants");
const { cherryPickCommitToLocalBranch } = require("./utils");

localBranchNames.every((branch) =>
  cherryPickCommitToLocalBranch(branch, commitHash)
);
