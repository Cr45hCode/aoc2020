import fs from 'fs';
import https from 'https';

const INPUTDIR = './inputs';

export default class Reader {
  static fetchDayInputFromServer(day) {
    return new Promise(async (resolve, reject) => {
      if (typeof day !== 'number' || day < 1 || day > 25) {
        reject('Invalid day: ' + day);
      }

      const config = await this.getConfigAsJsonFromFile();
      if (!config.sessionId) {
        reject('You need a valid session ID for the reader to fetch your input.');
      }

      https.get({
        host: `adventofcode.com`,
        path: `/2020/day/${day}/input`,
        headers: {'Cookie': 'session=' + config.sessionId},
      }, (res) => {
        const { statusCode } = res;
        if (statusCode !== 200) {
          reject('An error occurred when trying to fetch input from the server. Status code: ' + statusCode);
        };
        res.setEncoding('utf8');
        let dataString = '';
        res.on('data', (chunk) => { dataString += chunk; });
        res.on('end', () => {
          resolve(dataString);
        });
      }).on('error', (netError) => {
        reject(netError);
      });
    });
  }

  static getConfigAsJsonFromFile() {
    return new Promise((resolve, reject) => {
      fs.readFile('./config.json', 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (parseError) {
          reject(parseError)
        }
      });
    });
  }

  static fetchDayInputFromFile(day) {
    return new Promise((resolve, reject) => {
      if (typeof day !== 'number' || day < 1 || day > 25) {
        reject('Invalid day: ' + day);
      }
      fs.readFile(`${INPUTDIR}/${day < 10 ? '0'+day : day}.txt`, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  static getInputArrayForDay(day) {
    return new Promise(async (resolve, reject) => {
      if (typeof day !== 'number' || day < 1 || day > 25) {
        reject('Invalid day: ' + day);
      }

      let inputString;

      try {
        inputString = await Reader.fetchDayInputFromFile(day);
        resolve(inputString.split(/\r?\n/g));
      } catch (fileError) {
        if (fileError.code === 'ENOENT') {
          try {
            inputString = await Reader.fetchDayInputFromServer(day);
            if (!fs.existsSync(INPUTDIR)){
              fs.mkdirSync(INPUTDIR);
            }
            fs.writeFile(`${INPUTDIR}/${day < 10 ? '0'+day : day}.txt`, inputString, 'utf8', (err) => {
              if (err) {
                console.log('Could not safe input data: ', err);
              } else {
                console.log('Input data was saved to disk');
              }
            });
            resolve(inputString.split(/\r?\n/g));
          } catch (netError) {
            reject(netError);
          }
        }
        reject(fileError);
      }
    });
  }
}
