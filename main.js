/**
 * @description Paytabs rest api integration for nodejs
 * @author Walaa Elsaeed <walaa9131@gmail.com>
 */
//Used for http requests
const axios = require('axios');

//Use it to stringify formdata
const qs = require('qs');
const config = {merchantId:'',serverKey:'',region:''}

exports.setConfig = (merchantId,serverKey,region) => {
    config.merchantId = merchantId;
    config.serverKey = serverKey;
    config.region = region;
}

/**
 * @description Create the payment page
 * Please pass all required information based on Paytabs documentation and your requirements
 */

exports.createPaymentPage = (payment_code,transaction,cart,customer,shipping,urls,lang,callbackFunction,framed = false) => {
    payment_code = {'payment_methods': payment_code};
    transaction = {'tran_type': transaction[0],'tran_class' :transaction[1]};
    cart = {'cart_id':cart[0],'cart_currency':cart[1],'cart_amount': parseFloat(cart[2]),'cart_description':cart[3]};
    customer_details = {'name':customer[0],'email':customer[1],'phone':customer[2],
        'street1':customer[3],'city':customer[4],'state':customer[5],'country':customer[6],
        'zip':customer[7],'ip':customer[8]};
    shipping_details = {'name':shipping[0],'email':shipping[1],'phone':shipping[2],
        'street1':shipping[3],'city':shipping[4],'state':shipping[5],'country':shipping[6],
        'zip':shipping[7],'ip':shipping[8]};
    paypage_lang = lang;
    callback = urls[0];
    return_url = urls[1];
    data = {
        'profile_id':config.merchantId,
        'payment_methods':payment_code['payment_methods'],
        "tran_type": transaction['tran_type'],
        "tran_class": transaction['tran_class'],
        "cart_id": cart['cart_id'],
        "cart_currency": cart['cart_currency'],
        "cart_amount": cart['cart_amount'],
        "cart_description": cart['cart_description'],
        "paypage_lang": paypage_lang,
        "customer_details": customer_details,
        "shipping_details": shipping_details,
        "callback": callback,
        "return": return_url,
        "framed": framed,
        "user_defined": {
            "package": "node.js PT2 V2.0.0",
        }
    }
    url = _setEndPoint(config.region)+'payment/request';
    _sendPost(url,data,callbackFunction);
}


exports.validatePayment = (tranRef,callback)=>{
   data = {
       'profile_id':config.merchantId,
       'tran_ref':tranRef
   }
    url = _setEndPoint(config.region)+'payment/query';
  _sendPost(url,data,callback);
}

exports.queryTransaction = (transaction,cart,callback)=>{
    transaction = {'tran_ref':transaction[0],'tran_type': transaction[1],'tran_class' :transaction[2]};
    cart = {'cart_id':cart[0],'cart_currency':cart[1],'cart_amount': parseFloat(cart[2]),'cart_description':cart[3]};
    data = {
        'profile_id':config.merchantId,
        'tran_ref':transaction['tran_ref'],
        "tran_type": transaction['tran_type'],
        "tran_class": transaction['tran_class'],
        "cart_id": cart['cart_id'],
        "cart_currency": cart['cart_currency'],
        "cart_amount": cart['cart_amount'],
        "cart_description": cart['cart_description'],
    }
    url = _setEndPoint(config.region)+'payment/request';
    _sendPost(url,data,callback);
}




function _sendPost(url,objData,callback){

    var sendData = {
        method: 'post',
        url: url,
        headers: {
            'authorization': config.serverKey
        },
        data : objData
    };
    axios(sendData)
        .then((res) => {
            callback(res.data);
        }).catch((error) => {
        //This error will happen catch exceptions
        if(error.response)
        {
            result = error.response.data.message;
        }
        else
        {
            result = error.errno;
        }

        callback({ 'response_code:': 400, 'result': result });
    });


}

function _setEndPoint(region)
{
    const regions_urls = {ARE:'https://secure.paytabs.com/',SAU:'https://secure.paytabs.sa/',
        OMN:'https://secure-oman.paytabs.com/', JOR:'https://secure-jordan.paytabs.com/',
        EGY:'https://secure-egypt.paytabs.com/',GLOBAL:'https://secure-global.paytabs.com/'};

    for (const [key, value] of Object.entries(regions_urls))
    {
        if (key === region)
        {
            return value;
        }
    }
}
