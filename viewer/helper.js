function wrapParams(func, ...args){

  return function(){ return func.apply(this, [...args, ...arguments]) }
}

function assert(obj, key, type){

  if(!(obj[key] instanceof type) || obj == null)
    return obj[key] = new type();
  else
    return obj[key];
}
//too slow. Not really used
function levenshteinDistance (s, t) {
  if (s.length === 0) return t.length;
  if (t.length === 0) return s.length;
  return Math.min(
          levenshteinDistance(s.substr(1), t) + 1,
          levenshteinDistance(t.substr(1), s) + 1,
          levenshteinDistance(s.substr(1), t.substr(1)) + (s[0] !== t[0] ? 1 : 0)
  );
}

module.exports = { wrapParams, assert, levenshteinDistance };