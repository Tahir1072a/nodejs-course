const fs = require("fs");

// Senkron (synchronous) programlama

// İlk parametresinde okunacak dosyanın path'ini alır. İkincisinde ise okunacak metnin karakter standart türünü girmemizi bekler.
// Eğer ikinci parametre girilmez ise bir hata ortaya çıkar (buffer).
const text = fs.readFileSync("./txt/someText.txt", "utf-8");
console.log(text);

const textOut = `Text başarılı bir şekilde test edilmiştir ❤️. İşte teste tabi olan metin: ${text}`;
// Bu da basitçe yazma işlemidir. İkinci parametre olarak dosyaya yazılacak metni alır.
fs.writeFileSync("./txt/someText2", textOut);

// Asenkron (asynchronous) bir şekilde dosya okuma işlemleri
// Burada kod asenkron bir şekilde çalışır. readFile fonksiyonu arka planda işleme alınır ve işlem bitince çağrılacak bir callback fonksiyonu atanır.
// Kod bekleme yapmaz seri şekilde akmaya devam eder.
fs.readFile("./txt/someText.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
});
console.log("File reading...");

// Birbirine bağlı asenkron işlemler callback hell dediğimiz bir soruna dönüşebilir.
fs.readFile("./txt/File_1.txt", "utf-8", (err1, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err2, data2) => {
    fs.readFile(`./txt/${data2}.txt`, "utf-8", (err3, data3) => {
      console.log(data3);
    });
  });
});
