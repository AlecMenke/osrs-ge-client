const helper = require('./helper');

module.exports = {
  createItemCatelog(itemData){
    return itemData.reduce((update, {id, name}) => {
      const lowercaseName = name.toLowerCase();

      update['itemCatelog'][lowercaseName] = {id, original: name};
      update['names'].push(lowercaseName);

      helper.assert(update['abcCatelog'], name[0], Array).push(name);
        
      return update;
      }, {itemCatelog: {}, itemCatelogLower: {}, names: [], abcCatelog: {}});
  },

  
}