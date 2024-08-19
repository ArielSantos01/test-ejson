const axios = require('axios');
const fs = require('fs');
const targz = require('targz');
const cp = require('child_process');

async function downloadEjsonBin() {
    let version = '1.4.1';
    const testURL = `https://github.com/Shopify/ejson/releases/tag/v${version}`;

    

    const ejsonBinURL = `https://github.com/Shopify/ejson/releases/download/v${version}/ejson_${version}_linux_amd64.tar.gz`;

    await download(
      ejsonBinURL,
      () => decompress(version),
      () => {
        console.log("esta todo mal");
      },
    );
  }

  function decompress(version) {
    console.log("aqui se descomprime");
    targz.decompress(
      { src: "./binary/ejson.tar.gz", dest: "./binary/" },
      function () {
        fs.chmodSync("./binary/ejson", 0o755);
      },
    );
  }


  async function download(url, finishCAll, errorCall) {
    console.log("aquiiii");
    const response = await axios.get(url, { responseType: "stream" });
    console.log("aqui si")
    const fileStream = fs.createWriteStream("./binary/ejson.tar.gz");
    console.log("aqui no")
    response.data.pipe(fileStream);
    fileStream.on("finish", finishCAll);
    fileStream.on("error", errorCall);
  }


downloadEjsonBin();
