const { localBranchNames } = require("./constants");
const { pushBranchToRemote } = require("./utils");

localBranchNames.map(pushBranchToRemote);
