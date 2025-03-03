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
  .demandCommand(1)
  .parse();
