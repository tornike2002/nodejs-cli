import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .command(
    "new <hope>",
    "Create new hope",
    (yargs) => {
      return yargs.positional("hope", {
        type: "string",
        describe: "Hope to create",
      });
    },
    (argv) => {
      console.log(argv);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "Tags for the hope",
  })
  .command("all", "Get all hopes", (yargs) => {
    return yargs.positional(
      "all",
      () => {},
      (argv) => {}
    );
  })
  .command(
    "find <filter>",
    "find your hope",
    (yargs) => {
      return yargs.positional("filter", {
        type: "string",
        describe: "Filter to find hopes",
      });
    },
    (argv) => {
      console.log(argv);
    }
  )
  .command(
    "delete <id>",
    "Delete hopes by id",
    (yargs) => {
      return yargs.positional("delete", {
        type: "id",
        describe: "Id of the hope your want to delete"
      })
    },
    (argv) => {}
  )
  .demandCommand(1)
  .parse();
