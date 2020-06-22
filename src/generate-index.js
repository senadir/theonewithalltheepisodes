const elasticlunr = require('elasticlunr');
const episodes = require('./episodes.json');
const fs = require('fs');
var idx = elasticlunr(function () {
  this.setRef('link')
  this.addField('title')
  this.addField('plot')
	this.saveDocument(false);
  episodes.forEach(function (episode) {
    this.addDoc(episode)
  }, this)
});
console.log(idx.search('pizza'))
fs.writeFileSync('./src/index.json', JSON.stringify(idx.toJSON(),
))