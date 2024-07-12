const http = require("http");
const url = require("url");
const fs = require("fs");
// 3. taraf modüller
const slugify = require("slugify");
// Kenid modüllerimiz.
const replaceTemplate = require("./modules/replaceTemplate");
// Html sayfalarımız.
//  Bu yöntem ile htlm dosyasını okuyp onu bir stringe çevirebilir. Yukarıdaki metotda replace metodu ilede benzersiz isimlerle oluşturduğumuz alanları string.replace
// metodu ile istediğimiz değerleri verebiliriz.
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

// Burdada senkron bir şekilde dosya okuma işlemi yapmak bizi yavaşlatmaz çünkü bu kod zaten program çalıştığında sadece bir kez çalışacaktır.
const devData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const devDataObj = JSON.parse(devData);

const slugs = devDataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

// Bir server oluşturmak için kullanabileceğimiz basit bir fonkisyon. Parametre olarak bir request ve response alır.
/*  -- req nesnesi, gelen HTTP isteği hakkında bilgi içerir (örneğin, HTTP başlıkları ve istek yolu).
    -- res nesnesi, HTTP cevabını oluşturmak için kullanılır. */
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = devDataObj.map((el) => replaceTemplate(tempCard, el)).join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });

    const product = devDataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname === "/api") {
    // Aşağıdaki kod bazı açıklamalar içeirdiği için kalmasını istediö. Ancak yeni yazılan kod daha performanslı olacağı için bunu kullanacağız.
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(devData);

    // // Bildiğimiz üzere bu fonksiyon dosya okuma işlemi yapar. __dirname her zaman çalışan dosyanın bulunduğu dizini gösterir. ./ ise göreceli yoldur ve
    // // her zaman komutun çalıştığı dizini gösterir.
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   if (err) res.end(err.message);
    //   // Json dosyaları sadece stringtir. JSON.parse metodu bu string veriyi javascript objesine dönüştürür.
    //   const productData = JSON.parse(data);
    //   // TODO: Kurs dakika 10'dan itibaren devam edecektir.
    //   res.writeHead(200, {
    //     "Content-type": "application/json",
    //   });
    //   res.end(data);
    // });
    // // Sadece string gönderebilir.
    // // res.end("Api");
  } else {
    // Burada ikinci parametre oalrak header'da gönderebiliriz.
    // Header: Döndüğümüz yanıt ile iligli bir bilgi parçasıdır.
    //  Bu şekilde kod statusleri ve headerlar her zaman yanıt içeriğinden, responsedan önce yazılmalıdır.
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Well done, do you think this page exists or something? There is no page like this, jerk!!!</h1>");
  }
});

// Bu fonksiyo ile oluşturduğumuz küçük server'ımız 8000 portunda ve 127.0.0.1 hostunu dinlemeye yani request almaya başlar.
// Bu sürekli loop içinde bunu yapacaktır. Yani programı çalıştırdığımızda kendiliğinden sonlanmayacaktır.
// İkinci parametre olarak hostu belirtmez isek otomatik oalrak local hostta çalışacaktır..
server.listen(8000, "127.0.0.1", () => console.log("Listening to request on port 8000"));

// Routing kavramı : Routing (Yönlendirme) farklı urller için farklı eylemler gerçekleşmesini sağlayan temel ayardır.
