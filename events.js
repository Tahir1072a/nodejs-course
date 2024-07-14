// Javascriptte observer pattern dediğimiz bir olay yapısı vardır. Burada bir olay olduğunda program olayın gerçekleştiğine dair bir
// işlem/ses yayar. Bizde bu şekilde olayları eventListener ile dinleyip ilgili olay gerçekleştiğinde çalışacak fonksiyonları ayarlayabiliriz.

// Olay yayıcı
const EventEmitter = require("events");
const http = require("http");

// Gerçek hayatta bu şekilde bir yapıda kullanılır.
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There was a new Sale!");
});
//  Bu şekilde bir olay için birden fazla dinleyici kurabiliriz.
myEmitter.on("newSale", () => {
  console.log("Costumer name: Tahir");
});

myEmitter.on("newSale", (stock) => {
  console.log(`Thew are now ${stock} items left in stock`);
});

// Bu şekilde dinleyiciye gönderecek bir argüman da parametre olarak geçebiliriz.
myEmitter.emit("newSale", 9);

// Küçük bir web server oluşturma, eventleri daha iyi anlamak için.
const server = http.createServer();
server.on("request", (req, res) => {
  console.log("Request received.");
  res.end("Request received.");
});

server.on("close", () => {
  console.log("Server Close");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for request");
});
