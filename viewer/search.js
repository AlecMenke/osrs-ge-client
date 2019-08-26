const helper = require('./helper'),
  catelog = require('./catelog');

module.exports = {
  //too slow. not worth using
  deepSearch(dictionary, nameList, query) {

    query = query.toLowerCase();
    console.log('query: ', query);

    if(dictionary[query] != null)
      return [dictionary[query]];

    var closestMatch = {score: 999999, name: []};
    for(var i = 0; i < nameList.length; i++) {
      const nameListEntry = nameList[i];
      const comparisonScore = helper.levenshteinDistance(query, nameListEntry);

      if(closestMatch.score > comparisonScore){
        console.log('[√] added entry ' + nameListEntry + ' - ' + comparisonScore);
        closestMatch = { score: comparisonScore, name: [nameListEntry] };
      } else if(closestMatch.score === comparisonScore){
        console.log('[#] similar entry ' + nameListEntry + ' - ' + comparisonScore);
        closestMatch.name.push(nameListEntry);
      } else console.log(i, '-', nameListEntry, '-', comparisonScore);

      if(i > 100) break;
      
      if(comparisonScore === 0) break;
    }

    console.log(closestMatch.name, dictionary);
    return closestMatch.name.map(matchedName => dictionary[matchedName]);


  },
  //a little less basic now
  basicSearch(dictionary, nameList, query){

    const scrubbedQuery = catelog.scrub(query);

    if(dictionary[query] != null){
      console.log('matched!', dictionary[query]);
      return [{name: dictionary[query].original, id: dictionary[query].id}];
    }

    return nameList.filter(nameListEntry => query.split(' ').map(word => nameListEntry.indexOf(word) !== -1).reduce((state, hasWord) => state && hasWord, true)).map(x => ({name: dictionary[x].original, id: dictionary[x].id}));
  }
}
