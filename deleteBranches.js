const { localBranchNames } = require("./constants");
const { deleteLocalBranch, deleteRemoteBranch } = require("./utils");

localBranchNames.map(deleteLocalBranch);
localBranchNames.map(deleteRemoteBranch);
