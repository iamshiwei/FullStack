const querystring = require('querystring');
console.log(querystring.parse("a=12&b=34&c=shiwei"));  // { a: '12', b: '34', c: 'shiwei' }
console.log(querystring.stringify({"a": 12, "b": "ssas", c: true}));  // a=12&b=ssas&c=true
