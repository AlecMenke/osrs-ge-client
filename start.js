const api = require("./viewer/api");

//search by process arg or gold
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askForGESearch = () =>
  rl.question("Search GE: ", async itemQuery => {
    //rerun if empty
    if (itemQuery.trim().length === 0) return askForGESearch();
    process.stdout.write("Searching.... ");
    const possibleItems = api.search(itemQuery);

    if (possibleItems.length === 0) {
      console.log("( \x1b[31mno results found\x1b[0m )");
    } else {
      const itemData = await api.lookupItem(possibleItems[0].id);
      printResults(possibleItems, itemData);
    }

    askForGESearch();
  });
console.log("\n".repeat(20));
askForGESearch();

function printResults(searchResults, selectedItemData) {
  const { item } = selectedItemData;

  const trendColor = {
    neutral: "\x1b[37m",
    positive: "\x1b[32m",
    negative: "\x1b[31m"
  };

  searchResults[0].name = item.name = "\033[1m" + item.name + "\x1b[0m";

  const resultDetails = `
>    \x1b[33m${item.current.price}gp\x1b[0m per ${item.name}
>    ${item.day30.trend} trend of ${trendColor[item.day30.trend]}${
    item.day30.change
  }\x1b[0m over the last 30 days`;
  console.log(
    `


  [ Search Results ]
----------------------
${searchResults
  .slice(0, 6)
  .map((res, i) => (i === 0 ? `   -> ${res.name}` : `    - ${res.name}`) + "\n")
  .join("")}` +
      `${
        searchResults.length > 7
          ? `\n... ${searchResults.length - 7} more results\n\n`
          : "\n"
      }` +
      resultDetails
  );
}
