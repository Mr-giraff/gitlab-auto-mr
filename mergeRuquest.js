const {
  branches,
  jiraName,
  commitHash,
  mr_default_options,
} = require("./constants");
const {
  createMergeRequestOptions,
  createMergeRequest,
} = require("./utils");

branches.map((branch) => {
  const options = {
    ...mr_default_options,
    ...createMergeRequestOptions(branch, jiraName, commitHash),
  };
  createMergeRequest(options);
});
