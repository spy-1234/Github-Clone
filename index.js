const yargs = require("yargs")
const { hideBin } = require("yargs/helpers")


const { initRepo } = require("./controllers/init")
const { addRepo } = require("./controllers/add")
const { commitRepo } = require("./controllers/commit")
const { pushRepo } = require("./controllers/push")
const { pullRepo } = require("./controllers/pull")
const { revertRepo } = require("./controllers/revert")


yargs(hideBin(process.argv))
.command('init', "Initialize a new repository", {}, initRepo )
.command('add <file>', "Add a file to the repository", (yargs) => {
    yargs.positional("file", {
        describe: " File added to the staging area",
        type: "string",
    })
}, addRepo)
.command('commit <message>', "commit the staged files", (yargs) => {
    yargs.positional("message", {
        describe : "commit message",
        type: "string",
    })
}, commitRepo)
.command("push", "Push the commits to S3", {}, pushRepo)
.command("pull", "Pull the commits from S3", {}, pullRepo)
.command(
    "revert <commitID>",
    "Revert to a specific commit",
    (yargs) => {
        yargs.positional("commitID", {
            describe: "commit ID to revert to",
            type: "string",
        }, revertRepo)
    }
)
.demandCommand(1, "You need at least one command before moving on")
.help().argv