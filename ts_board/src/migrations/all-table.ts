import { exec, execFile } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { stderr, stdout } from "process";

console.log("migration-all-table");
    exec('./node_modules/.bin/ts-node "./src/migrations/1.create-table-user.ts"', (err, stdout, stderr) => {
        if(err) {
            console.error(err);
            return;
        }
        if(stdout) console.log(`${stdout}`);
        if(stderr) console.error(stderr);
    });
    exec('./node_modules/.bin/ts-node "./src/migrations/2.create-table-board.ts"', (err, stdout, stderr) => {
        if(err) {
            console.error(err);
            return;
        }
        if(stdout) console.log(`${stdout}`);
        if(stderr) console.error(stderr);
    });

    execFile('./node_modules/.bin/ts-node',['./src/migration/1.create-table-user.ts'], (err, stdout, stderr) => {
        if(err){
            console.error(err);
            return;
        }
        if(stdout) console.log(`${stdout}`);
        if(stderr) console.error(stderr);
    });

    execFile('./node_modules/.bin/ts-node',['./src/migration/2.create-table-board.ts'], (err, stdout, stderr) => {
        if(err){
            console.error(err);
            return;
        }
        if(stdout) console.log(`${stdout}`);
        if(stderr) console.error(stderr);
    });

