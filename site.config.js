const categories = require('./src/data/categories');
const creditcards = require('./src/data/credit-cards');

module.exports = {
    site: {
        title: 'Best Credit Cards for our customers | Home :: Superior Credit Cards',
        description: 'Best Credit Cards for our customers, credit card, credit cards, apply for credit card, best credit cards, credit card offers, compare credit cards, top credit cards, credit cards for bad credit, superior credit cards',
        categories,
        creditcards: creditcards.map((creditcard) => {
        	var cc = creditcard;
        	cc.url = cc.name.toLowerCase().replace(/[^\w\s!?]/g,'').replace(/ /g,'-');
        	return cc;
        }),
        featured: creditcards.filter((creditcard) => {
            return creditcard.featured;
        })
    }
};