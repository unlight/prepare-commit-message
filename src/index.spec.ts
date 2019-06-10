/* eslint-disable @typescript-eslint/tslint/config */
import { commitMessage } from '.';
import { readFileSync } from 'fs';
import { sync as findUpSync } from 'find-up';

jest.mock('fs');
jest.mock('find-up');

(findUpSync as jest.Mock).mockImplementation(() => '/usr/projects/.git/COMMIT_EDITMSG');
(readFileSync as jest.Mock).mockImplementation(() => 'commit_message');

it('smoke', () => {
    expect(commitMessage).toBeTruthy();
});

it('get message from .git/COMMIT_EDITMSG message', () => {
    const stdinArguments = ['node', 'file', '.git/COMMIT_EDITMSG', 'message'];
    expect(commitMessage({ stdinArguments })).toEqual('commit_message');
});

it('get message from .git/COMMIT_EDITMSG', () => {
    const stdinArguments = ['node', 'file', '.git/COMMIT_EDITMSG'];
    expect(commitMessage({ stdinArguments })).toEqual('');
});

it('get from husky git params', () => {
    const huskyGitParams = '.git/COMMIT_EDITMSG message';
    expect(commitMessage({ huskyGitParams })).toEqual('commit_message');
});

it.todo('get message amend .git/COMMIT_EDITMSG commit HEAD');
