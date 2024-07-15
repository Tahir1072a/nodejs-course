const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  // Birden fazla istek geldiğin veyahut dosyalar büyüdüğünde bu şekilde tüm veriyi belleğe alıp işlemeye çalışmak oldukça zaman alacaktır.
  // fs.readFile("test-file.txt", "utf-8", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // Solution 2, Streams - Bu gerçekten bize bir akış sağlar ancak buradaki sorun geri basınç dediğimiz bir olaydır.
  // Sorun : Dosyayı okuduğumuz hızdan daha yavaş bir şekilde server'a iletilir. Bu yüzden bir sıkışma olabilir.
  // const readable = fs.createReadStream("test-file.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found!");
  // });

  // Solution 3, Pipe operator
  const readable = fs.createReadStream("test-file.txt");
  // pipe fonksiyonu herşeyi dahili olarak ele alır.
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server listening...");
});
