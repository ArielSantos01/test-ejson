const fs = require('fs');
const axios = require('axios');
const { rejects } = require('assert');

async function getUser() {
    try {
      const response = await axios.get('/user?ID=12345')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  }
/*
try {
    const fileStream = fs.createWriteStream("/otro/archivo.txt");
    fileStream.on('error', (err) => {
        console.error('Error writing to the file:', err);
      });
      // Realizar operaciones con el stream
  fileStream.write('Some data');
  fileStream.end();
} catch (err){
    console.error("NO SE PUDO DESCARGAR EL ARCHIVO", err);
}
*/

getUser();