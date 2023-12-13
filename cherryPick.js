const { localBranchNames, commitHash } = require("./constants");
const { cherryPickCommitToLocalBranch } = require("./utils");

localBranchNames.map((branch) =>
  cherryPickCommitToLocalBranch(branch, commitHash)
);
