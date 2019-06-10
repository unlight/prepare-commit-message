import * as findUp from 'find-up';
import { readFileSync } from 'fs';

type CommitMessageArguments = {
    stdinArguments?: string[];
    huskyGitParams?: string;
};

const COMMIT_EDITMSG = '.git/COMMIT_EDITMSG';

export function commitMessage(commitMessageArguments: CommitMessageArguments) {
    const {
        stdinArguments = process.argv,
        huskyGitParams = process.env.HUSKY_GIT_PARAMS,
    } = commitMessageArguments;
    let result = '';
    let messageFile: string | undefined;
    const index = stdinArguments.findIndex(value => COMMIT_EDITMSG === value);
    if (index !== undefined && stdinArguments[index + 1] === 'message') {
        messageFile = findUp.sync(COMMIT_EDITMSG, { type: 'file' });
    } else if (huskyGitParams === '.git/COMMIT_EDITMSG message') {
        messageFile = findUp.sync(COMMIT_EDITMSG, { type: 'file' });
    }
    if (messageFile !== undefined) {
        result = readFileSync(messageFile, { encoding: 'utf8' });
    }
    return result;
}
