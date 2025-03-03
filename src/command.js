import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { getAllHopes, newHope } from "./hopes.js";
import { ListHopes } from "./utils/helper.js";
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
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const note = await newHope(argv.hope, tags);
      console.log(note);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "Tags for the hope",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async () => {
      const hopes = await getAllHopes();
      ListHopes(hopes);
    }
  )
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
        describe: "Id of the hope your want to delete",
      });
    },
    (argv) => {}
  )
  .command(
    "web [port]",
    "Start a web server",
    (yargs) => {
      return yargs.positional("port", {
        type: "number",
        describe: "The port to start server on",
        default: 5000,
      });
    },
    (argv) => {}
  )
  .command(
    "clean",
    "Clear all hopes",
    (yargs) => {},
    (argv) => {}
  )
  .demandCommand(1)
  .parse();
