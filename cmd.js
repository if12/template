const { hasGit } = require('./utils/index');

const makeGitInitCmds = ({ config, variable }) => {
  const { group, project } = variable;
  const { DOMAIN } = config;

  return ['git init', `git remote add origin git@${DOMAIN}:${group}/${project}.git`];
};

const normalCmds = ['mv __gitignore .gitignore'];

const createCmds = meta => {
  let cmds = [];
  if (hasGit()) {
    // 如果开发目录有.git的话就不重新初始化了
    cmds = normalCmds;
  } else {
    const gitInitCmds = makeGitInitCmds(meta);
    cmds = gitInitCmds.concat(normalCmds);
  }
  return cmds;
};

module.exports = createCmds;
