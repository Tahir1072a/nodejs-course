// Burada gördümüğümüz şey, aslında javascript dosyalarının her biri modüldür. Ve her bir modül bir sarmalayıcı fonksiyon ile sarılmıştır.
// Bu bize iki avantaj sağlar. Her .js dosyasında kullanabileceğimiz, --dirname , --filename, require, module, exports değişkenlerine erişim.
// 2.ci avantajı ise her bir modülün kendi kapsamı olması. Yani bu modülü başka bir modülden require edersek bu moduldeki değişken isimleri ile
// diğer modüldeki değişken isimleri birbirine karışmayacaktır.

console.log(arguments);
console.log(require("module").wrapper);

// Module.exports
const C = require("./TestModule1");
const calculator1 = new C();
console.log(calculator1.add(12, 4));

// Exports
const calc2 = require("./TestModule2");
const { add, multiply, divide } = require("./TestModule2");
console.log(calc2);
console.log(calc2.multiply(2, 5));
console.log(add(2, 5));

// caching
require("./TestModule3")();
require("./TestModule3")();
require("./TestModule3")();
