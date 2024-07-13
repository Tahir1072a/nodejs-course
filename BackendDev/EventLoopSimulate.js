const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

// 0 saniye sonra fire (ateşlenecek, gerçekleştirilecek, çağrılacak) olacak fonksiyon çağrısı.
// Burada çalışacak kodda belirli bir sıra yoktur. Çünkü event-loop'a girmez. Girmesi için bir callback içinde çağrılması gerekir.
setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));
fs.readFile("test-file.txt", "utf-8", () => {
  console.log("I/O finished");
  console.log("--------------------");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  // Burada immediate'in daha önce çalışmasının sebebi evetLoop, iş kuyruğu boşken pool/IO phase'de bekliyor olması. Yani immediate I/O aşamasından sonra olduğu
  // ilk olarak o çalışacaktır.
  setImmediate(() => console.log("Immediate 2 finished"));

  // Immediate'den önce çalışacaktır. I/o phase'inden sonra. Çünkü bu 4 ana aşamadan farklı olarak her aşama sonu çağrılan nextTick aşamasıdır. (phase)
  process.nextTick(() => console.log("Process.nexTick"));

  // Ağır işlemler event-loop içinde gerçekleşmez. Sanal çekirdeklerde gerçekleşir.
  // Temel olarak node.js 4 sanal thread kullanır. Bu sayıyı arttırabiliriz. 4 sanal thread birden bu fonksiyonları işleme koyacaktır.
  // İlk 4'ü neredeyse aynı zamanda olacaktır. Ancak 5.cisi 1. thread boşaldıktan sonra oraya geçecek ve o şekilde çalışacaktır.
  // Eğer thread arttırma işlemi yaparsak bu sefer 5'i de neredeyse aynı sürelerde işlenecektir.
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "Password encrypted"),
  );
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "Password encrypted"),
  );
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "Password encrypted"),
  );
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "Password encrypted"),
  );
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "Password encrypted"),
  );
});
// İlk çalışacak kod. Çünkü herhangi bir callback içermiyor.
console.log("Hello from the top level code");
