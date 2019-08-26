const apiUrl = 'http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=';

const request = require('request-promise'),
  helper = require('./helper'),
  catelogApi = require('./catelog')

const itemIndex = require('../data/itemIndex.json'),
  { itemCatelog, names } = catelogApi.createItemCatelog(itemIndex);

const searchApi = require('./search');
  searchLocalIdsFor = helper.wrapParams(searchApi.basicSearch, itemCatelog, names), 
  findNearestItems = helper.wrapParams(searchApi.nearMatch, itemCatelog, names);

const lookupItem = (itemId) => request({
  uri: apiUrl + itemId,
  json: true
  });

module.exports = { lookupItem, searchLocalIdsFor, findNearestItems}

