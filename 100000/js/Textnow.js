/*
Textnow去广告

[MITM]
hostname = api.textnow.me

[Script]
Textnow.js = type=http-response,pattern=^https?:\/\/api\.textnow\.me\/api2.0\/users\/.*,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Textnow.js,script-update-interval=0
*/

var obj = JSON.parse($response.body); 
obj['show_ads'] = false;
obj['premium_calling'] = true;
$done({body: JSON.stringify(obj)});
