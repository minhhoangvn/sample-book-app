var xtend = require('xtend');

//merged two .doc's for two middlewares
module.exports = function (doc1In, doc2In) {
	if(!doc1In){
		return doc2In || {};
	}
	if(!doc2In){
		return doc1In || {};
	}
	var doc1 = JSON.parse(JSON.stringify(doc1In)); //clone
	var doc2 = JSON.parse(JSON.stringify(doc2In));
	var doc, description;
	if (doc1.description && doc2.description){
		if(doc1.description.indexOf(doc2.description)!==-1){
			description = doc1.description;
		} else if(doc2.description.indexOf(doc1.description)!==-1){
			description = doc2.description;
		} else {
			description = doc2.description + '\n' + doc1.description;
		}
	} else {
		description = doc1.description || doc2.description;
	}
	doc = xtend(doc1, doc2);
	if(description){
		doc.description = description;
	}
	return doc;
};