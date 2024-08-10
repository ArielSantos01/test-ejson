const axios = require('axios');
const fs = require('fs');
const targz = require('targz');


async function downloadBinaryFile() {
    let version = '1.4.1';
    const testURL = `https://github.com/Shopify/ejson/releases/tag/v${version}`;

    try {
        await axios.get(testURL);
      } catch (error) {
        version = await getLatestEjsonVersion();
    }

    const ejsonBinURL = `https://github.com/Shopify/ejson/releases/download/v${version}/ejson_${version}_linux_amd64.tar.gz`;
    const outputPath = `./binary/ejson_${version}`;
    const response = await axios(ejsonBinURL, { responseType: "stream" });

    await new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(outputPath);
        response.data.pipe(fileStream);
        fileStream.on("finish", resolve);
        fileStream.on("error", reject);
    });

    await new Promise((resolve, reject) => {
        targz.decompress({ 
            src: outputPath, 
            dest: './binary' 
        }, function(err){
            if(err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });

    const filePath = "./binary/ejson";
    fs.chmodSync(filePath, 0o755); 

}

// Ya quedo
async function getLatestEjsonVersion() {
    const url = "https://api.github.com/repos/Shopify/ejson/releases/latest";

    let res = await axios.get(url);
    let tagVersion = res.data.tag_name;

    console.log("Latest ejson version: ", tagVersion);
    return tagVersion.replace("v", "");
  }


downloadBinaryFile()
.then(() => {
    console.log('Binary file downloaded successfully!');
})
.catch((err) => {
    console.error('Failed to download binary file:', err);
});
