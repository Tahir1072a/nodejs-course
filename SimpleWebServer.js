const http = require("http");

// Bir server oluşturmak için kullanabileceğimiz basit bir fonkisyon. Parametre olarak bir request ve response alır.
/*  -- req nesnesi, gelen HTTP isteği hakkında bilgi içerir (örneğin, HTTP başlıkları ve istek yolu).
    -- res nesnesi, HTTP cevabını oluşturmak için kullanılır. */
const server = http.createServer((req, res) => {
  console.log(req);
  res.end("Hello from the server.");
});

// Bu fonksiyo ile oluşturduğumuz küçük server'ımız 8000 portunda ve 127.0.0.1 hostunu dinlemeye yani request almaya başlar.
// Bu sürekli loop içinde bunu yapacaktır. Yani programı çalıştırdığımızda kendiliğinden sonlanmayacaktır.
// İkinci parametre olarak hostu belirtmez isek otomatik oalrak local hostta çalışacaktır..
server.listen(8000, "127.0.0.1", () =>
  console.log("Listening to request on port 8000"),
);
