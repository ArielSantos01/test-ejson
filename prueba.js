const axios = require('axios');
const fs = require('fs');

async function main() {

    const url =
    "https://github.com/Shopify/ejson/releases/download/v1.4.1/ejson_1.4.1_linux_amd64.tar.gz";
    const response = await axios.get(url, { responseType: "stream" });
    try{
        
        console.log(response);
    } catch {
        console.log("NO SE PUDO DESCARGAR EL ARCHIVO");
    }
    console.log("SI ESTO SE MUESTRA ES PORQUE SI");
    const fileStream = fs.createWriteStream("./binary/pruebita");
      response.data.pipe(fileStream);
      fileStream.on("finish", resolve);
      fileStream.on("error", reject);
    //console.log(response);
};

main();


