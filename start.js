const api = require("./viewer/api");

//search by process arg or gold
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askForGESearch = () => rl.question('Search GE: ', async itemQuery => {
  process.stdout.write("Searching....");
  const possibleItems = api.search(itemQuery);

  if(possibleItems.length === 0) return console.log('No ');

  const itemData = await api.lookupItem(possibleItems[0].id);
  
  printResults(possibleItems, itemData);
  askForGESearch();
});

askForGESearch();

function printResults(searchResults, selectedItemData){

  const { item } = selectedItemData;
  searchResults[0].name = item.name = '\033[1m' +item.name+ '\x1b[0m';
  const resultDetails = `
>    \x1b[33m${item.current.price}gp\x1b[0m per ${item.name}
>    ${item.day30.trend} trend of ${item.day30.change} over the last 30 days`;
  console.log(
`


  [ Search Results ]
----------------------
${searchResults.slice(0, 6).map((res, i) => ((i === 0? `   -> ${res.name}` : `    - ${res.name}`) + '\n')).join('')}`
+ 
`${searchResults.length > 7? `\n... ${searchResults.length - 7} more results\n\n` : ''}`
+
resultDetails
    );
}