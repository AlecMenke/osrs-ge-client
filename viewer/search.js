const helper = require('./helper'),
  catelog = require('./catelog');

module.exports = {
  //too slow. not worth using
  deepSearch(dictionary, nameList, scrubbedQuery) {

    scrubbedQuery = scrubbedQuery.toLowerCase();
    console.log('scrubbedQuery: ', scrubbedQuery);

    if(dictionary[scrubbedQuery] != null)
      return [dictionary[scrubbedQuery]];

    var closestMatch = {score: 999999, name: []};
    for(var i = 0; i < nameList.length; i++) {
      const nameListEntry = nameList[i];
      const comparisonScore = helper.levenshteinDistance(scrubbedQuery, nameListEntry);

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

    if(dictionary[scrubbedQuery] != null){
      console.log('matched!', dictionary[scrubbedQuery]);
      return [{name: dictionary[scrubbedQuery].original, id: dictionary[scrubbedQuery].id}];
    }

    return nameList.filter(nameListEntry => scrubbedQuery.split(' ').map(word => nameListEntry.indexOf(word) !== -1).reduce((state, hasWord) => state && hasWord, true)).map(x => ({name: dictionary[x].original, id: dictionary[x].id}));
  },
  //basically just copied and pasted the above func. Will abstract later.
  nearMatch(dictionary, nameList, query){

    const scrubbedQuery = catelog.scrub(query);
    return nameList.filter(nameListEntry => scrubbedQuery.split(' ').map(word => nameListEntry.indexOf(word) !== -1).reduce((state, hasWord) => state || hasWord, false)).map(x => ({name: dictionary[x].original, id: dictionary[x].id}));
  }
}
