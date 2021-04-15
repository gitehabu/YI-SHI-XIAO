/*
招商银行信用卡微信公众号：“领积分 - 🎁签到领积分” 获取 Cookie

[Script]
cron "* 9 * * *" debug=1,script-path=https://raw.githubusercontent.com/cyqlegend/Breaker/master/script/cmb/cmbchina.js,script-update-interval=0
http-request ^https:\/\/weclub\.ccc\.cmbchina.com\/SCRMCustomActivityFront\/checkin\/request\/get-home-data\.json\?activityCode=checkin debug=1,script-path=https://raw.githubusercontent.com/cyqlegend/Breaker/master/script/cmb/cmbchina.js,script-update-interval=0
https:\/\/weclub\.ccc\.cmbchina.com\/SCRMCustomActivityFront\/checkin\/request\/get-home-data\.json\?activityCode=checkin max-size=0,script-path=https://raw.githubusercontent.com/cyqlegend/Breaker/master/script/cmb/cmbchina.js,script-update-interval=0

[mitm]
hostname = weclub.ccc.cmbchina.com
*/

const checkinURL = 'https://weclub.ccc.cmbchina.com/SCRMCustomActivityFront/checkin/request/checkin.json';
const cookieKey = 'iNotificatioin_cmbchina_cookieKey';
const userAgentKey = 'iNotificatioin_cmbchina_userAgentKey';

let isGetCookie = typeof $request !== 'undefined';

if (isGetCookie) {
    // 获取 Cookie
    if ($request.headers['Cookie']) {
        var cookie = $request.headers['Cookie'];
        var userAgent = $request.headers['User-Agent'];
        $persistentStore.write(cookie, cookieKey);
        //$prefs.setValueForKey(cookie, cookieKey);
        $persistentStore.write(userAgent, userAgentKey);
        //$prefs.setValueForKey(userAgent, userAgentKey);
        $notification.post("成功获取招商银行信用卡 cookie 🎉", "", "");
    } else {
        $notification.post("获取招商银行信用卡 cookie 失败😭", "", "");
    }
    $done({});
} else {
    // 签到
    var request = {
        url: checkinURL,
        headers: {
            'Cookie': $persistentStore.read(cookieKey),
            'User-Agent': $persistentStore.read(userAgentKey),
            'Content-type' : 'application/json; charset=utf-8'
        },
        body: JSON.stringify({'activityCode' : 'checkin'})
    };

    $httpClient.post(request, function(error, response, data){
        if (error) {
            $notification.post("招商银行信用卡签到，请求失败", "", error);
        } else {
            const result = JSON.parse(data);
            if (result.respCode == 1000) {
                $notification.post("招商银行信用卡", "", "签到成功，获得 " + result.data.awardValue + " 积分🎁");
            } else if (result.respCode == 1452) {
                $notification.post("招商银行信用卡", "", "签到失败，请获取 cookie");
            } else if (result.respCode == 'custom_8500') {
                $notification.post("招商银行信用卡", "", "签到失败，" + result.respMsg);
            } else {
                $notification.post("招商银行信用卡", "", "签到失败，请查看日志");
                console.log(result);
            }
        }
    });
}
