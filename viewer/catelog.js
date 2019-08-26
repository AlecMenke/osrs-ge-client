const helper = require('./helper');

module.exports = {
  scrub(textToScrub) {

    return textToScrub.toLowerCase().replace(/[^\w\s+\(\)!?]/g, '')
  },
  createItemCatelog(itemData){
    return itemData.reduce((update, {id, name}) => {
      const scrubbedName = this.scrub(name);

      update['itemCatelog'][scrubbedName] = {id, original: name};
      update['names'].push(scrubbedName);

      helper.assert(update['abcCatelog'], name[0], Array).push(name);
        
      return update;
      }, {itemCatelog: {}, itemCatelogLower: {}, names: [], abcCatelog: {}});
  },

  
}