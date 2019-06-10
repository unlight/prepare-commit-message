#!/usr/bin/env node
import { commitMessage } from '.';

export async function main(): Promise<number | string> {
    const message = commitMessage({
        stdinArguments: process.argv,
        huskyGitParams: process.env.HUSKY_GIT_PARAMS,
    });
    if (!message) {
        throw new Error('Cannot get message');
    }
    return message;
}

if (!module.parent) {
    main()
        .then((message: any) => {
            process.stdout.write(message);
        })
        .catch((error: Error) => {
            console.error(error.message); // eslint-disable-line no-console
            process.exit(1);
        });
}
