// Is this the cause of the failures ?
// import "https://deno.land/x/flat@0.0.10/mod.ts";
import { removeFile } from "https://deno.land/x/flat/mod.ts";

import { table_to_csv } from "./table_csv.ts";

const filename = Deno.args[0]; // Same name as downloaded_filename `const filename = 'btc-price.json';`
const html = await Deno.readTextFile('NBA_2025.html');

const EAST_standings: any = table_to_csv("confs_standings_E", html);
const WEST_standings: any = table_to_csv("confs_standings_W", html);

console.log(EAST_standings, WEST_standings);

await Deno.writeTextFile("EAST_standings.csv", EAST_standings);
await Deno.writeTextFile("WEST_standings.csv", WEST_standings);
await removeFile(filename);
