const hmacsha1 = require('hmacsha1');
const superagent = require('superagent');
const config = require('./config.json');


function send(url, host, secretId, secretKey) {
    return new Promise((resolve, reject) => {
        let newDate = new Date();
        let timeStr = newDate.toGMTString();
        let signStr = "date: " + timeStr + "\n" + "source: " + "source";
        let sig = hmacsha1(secretKey, signStr);
        //console.log(sig);
        let authen = "hmac id=\"" + secretId + "\", algorithm=\"hmac-sha1\", headers=\"date source\", signature=\"" + sig + "\"";
        //console.log(authen);
        superagent
            .post(url)
            .set('Host', host)
            .set('Accept', 'text/html, */*; q=0.01')
            .set('Source', 'source')
            .set('Date', timeStr)
            .set('Authorization', authen)
            .set("X-Requested-With", "XMLHttpRequest")
            .set("Accept-Encoding", "gzip, deflate, sdch")
            //.query({"src":"123"})
            .then((res) => {
                resolve(res)
            }).catch(function (err) {
                reject(err);
            });
    })

}

send(config.url, config.host, config.SecretId, config.SecretKey)
    .then(res => {
        console.log(res)
    }).catch(err => {
        console.error(err);
    })