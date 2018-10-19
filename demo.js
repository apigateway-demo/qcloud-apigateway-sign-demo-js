
/*
used...
<script src="js/vue.js"></script>
<script src="js/axios.js"></script>
<script src="js/qs.js"></script>
<script src="js/crypto-js/crypto-js.js"></script>
*/
var nowDate = new Date(); 

var dateTime = nowDate.toGMTString();
//dateTime = "Mon, 19 Mar 2018 12:00:44 GMT"
var SecretId = 'rajhuang';
var SecretKey = 'xwabext90x';
var source = 'yousali';
source = 'source';
var auth = "hmac id=\"" + SecretId + "\", algorithm=\"hmac-sha1\", headers=\"x-date source\", signature=\"";
var signStr = "x-date: " + dateTime + "\n" + "source: " + source;
console.log(signStr)
var sign = CryptoJS.HmacSHA1(signStr, SecretKey)
console.log(sign.toString())
sign = CryptoJS.enc.Base64.stringify(sign)
sign = auth + sign + "\""
console.log(sign)
console.log(dateTime)

var instance = axios.create({
    baseURL: 'http://service-2c8xx15w-1251317796.ap-guangzhou.apigateway.myqcloud.com/release/api/shoplist',
    timeout: 5000,
    headers: {
                "Source":source,
                "X-Date":dateTime,
                "Authorization":sign
    },
    withCredentials: true
});

instance.get()
.then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });;