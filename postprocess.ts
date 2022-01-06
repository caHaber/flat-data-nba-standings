// Is this the cause of the failures ?
// import "https://deno.land/x/flat@0.0.10/mod.ts";
// import { readTextFile } from "https://deno.land/x/flat@0.0.11/mod.ts";

import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const filename = Deno.args[0]; // Same name as downloaded_filename `const filename = 'btc-price.json';`
const html = await Deno.readTextFile(filename);

const document: any = new DOMParser().parseFromString(html, "text/html");

const all_tables: any = [...document.querySelectorAll("table")];

const EAST_standings: any = download_table_as_csv("confs_standings_E");
const WEST_standings: any = download_table_as_csv("confs_standings_W");

console.log(EAST_standings, WEST_standings);

await Deno.writeTextFile("EAST_standings.csv", EAST_standings);

await Deno.writeTextFile("WEST_standings.csv", WEST_standings);

function download_table_as_csv(table_id: any, separator = ",") {
  // Select rows from table_id
  var rows = document.querySelectorAll("table#" + table_id + " tr");
  // Construct csv
  var csv = [];
  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");
    for (var j = 0; j < cols.length; j++) {
      // Clean innertext to remove multiple spaces and jumpline (break csv)
      var data = cols[j].innerText
        .replace(/(\r\n|\n|\r)/gm, "")
        .replace(/(\s\s)/gm, " ");
      // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
      data = data.replace(/"/g, '""');
      // Push escaped string
      row.push('"' + data + '"');
    }
    csv.push(row.join(separator));
  }
  var csv_string = csv.join("\n");
  return csv_string;
}
