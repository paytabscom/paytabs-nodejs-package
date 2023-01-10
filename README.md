Nodejs Package For PayTabs PT2

Description
-----------
This Package provides integration with the PayTabs payment gateway.

CONTENTS OF THIS FILE
---------------------
* Introduction
* Requirements
* Installation

INTRODUCTION
------------
This Package integrates PayTabs online payments into
the Nodejs Project.

REQUIREMENTS
------------
This module requires 
    - axios
    - qs

INSTALLATION
------------
* Install Via NPM:
    - npm install @paytabscom/paytabs-nodejs@2.0.9
    
* Github Repo Link:
    - https://github.com/paytabscom/paytabs-nodejs-package


EXAMPLES
------------

*Init The Package:

    const paytabs = require('paytabs_pt2');
    paytabs.setConfig(<profile_id>,<server_key>,<region>);

*Create Pay Page:

    paytabs.createPaymentPage([<payment_methods>],['sale','ecom'],[<cart_id>,<cart_currency>,<cart_amount>,<cart_description>],
    [<customer_name>,<customer_email>,<customer_phone>,<customer_address>,<customer_city>,<customer_state>,<customer_country>,<customer_Zip>,<customer_ip>],
    [<shipping_name>,<shipping_email>,<shipping_phone>,<shipping_address>,<shipping_city>,<shipping_state>,<shipping_country>,<shipping_Zip>,<shipping_ip>],
    [<callback>,<return_url>],
    <paypage_lang>,callback
    )


    function createPayPage(result)
    {
    console.log(result);
    }

    -Parameters Example
    paytabs.createPaymentPage(['all'],['sale','ecom'],['cart_22222','EGP','100','test'],
      ['walaa Elsaeed','email@domain.com','0522222222','address street','Egypt','egypt','EG','12345','1.1.1.1'],
      ['walaa Elsaeed','email@domain.com','0522222222','address street','Egypt','egypt','EG','12345','1.1.1.1'],
      ['https://webhook.site/730acce0-e54e-4522-8a45-f9b8e44624b6','https://site.paytabs.com/en/'],
      'en',createPayPage
      )

    - if you want to use framed paypage you should pass parameter framed = true .
     paytabs.createPaymentPage(['all'],['sale','ecom'],['cart_22222','EGP','100','test'],
      ['walaa Elsaeed','email@domain.com','0522222222','address street','Egypt','egypt','EG','12345','1.1.1.1'],
      ['walaa Elsaeed','email@domain.com','0522222222','address street','Egypt','egypt','EG','12345','1.1.1.1'],
      ['https://webhook.site/730acce0-e54e-4522-8a45-f9b8e44624b6','https://site.paytabs.com/en/'],
      'en',createPayPage,True
      )

*Validate Payment:

    paytabs.validatePayment(<transRef>,<callback>);


    function verifyPayment(result)
    {
        if (result['response_code:'] === 400)
        {
            console.log('false');
        }
        else
        {
            console.log('true');
        }
    }

    -Parameters Example
    paytabs.validatePayment('TST2109000130191',verifyPayment);


*Refund:

    paytabs.queryTransaction([<transRef>,'refund','ecom'],[<cart_id>,<cart_currency>,<cart_amount>,<cart_description>],callback);

    
    function refunTrans(result){
    if (result['response_code:'] === 400)
        {
            console.log('Unable to process your request, please make sure of your TransRef');
        }
        else
        {
            console.log(result);
        }
    }

    -Parameters Example
    paytabs.queryTransaction(['TST2108800126691','refund','ecom'],['cart_22222','EGP','100','test'],refunTrans);


* important notes:

  -Make sure that your website currency is as same as your currency in payTabs profile.
  -Make sure that you send the region as the syntax below:
  
  Send ARE if your region is United Arab Emirates.
  Send SAU if your region is Saudi Arabia.
  Send OMN if your region is Oman.
  Send JOR if your region is Jordan
  Send EGY if your region is Egypt
  Send GLOBAL if your region is Global
