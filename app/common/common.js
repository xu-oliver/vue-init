import { Base64 } from 'js-base64';
import wx from 'weixin-js-sdk'
import config from '../config/config'
import {sharekey} from '../action/server'
import Utils from '../utils/utils'
import exportFun from '../utils/export'

export function toDian(val){
    return val.replace(/-/g,'.');
}
//处理请求数据
export function decideData(data){
    if(data.bizData != null){
        return data.bizData;
    }else{
        if(data.bizData == null){
            location.href="404.html?error=1"
            return;
        }else if(data.respCode == '500'){
            console.log('500');
            // location.href="404.html?error=2"
            return;
        }else if(data.respCode == 'F012'){
            console.log('f012');
            // location.href="404.html?error=3"
            return;
        }else{
            location.href="404.html?error=3"
            return;
        }
    } 
}
//生成随机数
export function random(num){
    let chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let res = "";
    for(var i = 0; i < num ; i ++) {
        var id = Math.ceil(Math.random()*35);
        res += chars[id];
    }
    return res;
}
//通用H5跳转
export const h5To = (pageId,pageValue) => {
    let page = Base64.encode('{"pageId":"'+pageId+'","pageValue":"'+pageValue+'"}');
    location.href=`nexuscommon://gotopage?params=${page}}`
}
// 微信授权
// export const authorization = (redirect_uri)=>{
//     location.href=`${config.apiPath}${api.authorization}?redirect_uri=${redirect_uri}&channel=stamp`; 
// }
//app分享
export const sharePage = (data) => {
    var platVal = ["WeiXin","WeiXinFriends"];
    // let giveY = location.href.includes('give.html');
    // if(giveY){
    //     platVal.push("PhoneNo");
    // }
    const obj = {
        platformType:platVal,// 分享类型
        title:data.title,
        shareDesc:data.shareDesc,
        thumImage:data.thumImage,
        shareUrl:config.shareUrl + data.shareName,
        shareStatus: 1,
    }
    const base64 = Base64.encode(JSON.stringify(obj));
    var url=`${config.nativeShareUrl}${base64}`;
    Utils.sendShenZeio('BRP_Share_click',{
        'BRP_share_channel':'微信'
    });
    location.href=url;
}
//微信分享
export function shareWechat(shareData){
    let data = {
        bizContent:{url:encodeURIComponent(location.href)}
    }
    sharekey(data).then(({data}) => {
        let authorData = JSON.parse(data).bizData;
        wx.config({
            debug: false,
            appId: authorData.appId,
            timestamp: authorData.timestamp,
            nonceStr: authorData.nonceStr,
            signature: authorData.signature,
            jsApiList: [
                'checkJsApi',
                'onMenuShareAppMessage',
                'onMenuShareTimeline',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow'
            ]
        });
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后
        // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行
        // 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.ready(function(){
            if(!location.href.includes('sendTo.html')){
                wx.hideMenuItems({
                    menuList: [
                        //'menuItem:share:timeline',
                        'menuItem:share:qq',
                        'menuItem:share:QZone',
                        'menuItem:share:weiboApp',
                        'menuItem:openWithQQBrowser',
                        'menuItem:openWithSafari',
                        'menuItem:copyUrl'
                        //'menuItem:share:timeline'
                    ]
                });
                var shareUrl = '';
                for(var i in config){
                    if(i == 'shareUrl'){
                        shareUrl = config[i];
                        break
                    }
                }
                wx.onMenuShareAppMessage({
                    title: shareData.title,     // 分享标题
                    desc: shareData.desc,       // 分享描述
                    imgUrl: shareData.imgUrl,   // 分享图标
                    link: shareUrl+shareData.link,       // 分享链接
                    success: function () { 
                        // 弹窗"分享成功"
                        Utils.sendShenZeio('BRP_Share_click',{
                            'BRP_share_channel':'微信朋友'
                        });
                        Utils.sendShenZeio('BRP_SharewithFriends_click',{
                            'BRP_share_cate':'分享成功'
                        });
                        // 隐藏半透明图
                    }
                });
                // 朋友按钮
                wx.onMenuShareTimeline({
                    title: shareData.title,     // 分享标题
                    desc: shareData.desc,       // 分享描述
                    imgUrl: shareData.imgUrl,   // 分享图标
                    link: shareUrl+shareData.link,       // 分享链接
                    // type: 'link',    // 分享类型,music、video或link，不填默认为link
                    // dataUrl: '',     // 如果type是music或video，则要提供数据链接，默认为空
                    success:() => { 
                        // 弹窗"分享成功"
                        Utils.sendShenZeio('BRP_Share_click',{
                            'BRP_share_channel':'微信朋友圈'
                        });
                        Utils.sendShenZeio('BRP_SharewithFriends_click',{
                            'BRP_share_cate':'分享成功'
                        });
                        // 隐藏半透明图
                    }
                });
            }else{
                wx.hideAllNonBaseMenuItem()
            }
        });
    });
}
//微信定位
export function shareWechatCity(shareData){
    let data = {
        bizContent:{url:encodeURIComponent(location.href)}
    }
    sharekey(data).then(({data}) => {
        let authorData = JSON.parse(data).bizData;
        var shareUrl = '';
        for(var i in config){
            if(i == 'shareUrl'){
                shareUrl = config[i];
                break
            }
        }
        wx.config({
            debug: false,
            appId: authorData.appId,
            timestamp: authorData.timestamp,
            nonceStr: authorData.nonceStr,
            signature: authorData.signature,
            jsApiList: [
                'getLocation'
            ]
        });
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后
        // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行
        // 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.ready(function(){
            // 微信地址定位
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    console.log('success:')
                    console.log(res)
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                    // 访问经纬度转城市接口
                    var map = new BMap.Map("allmap");        
                    var point = new BMap.Point(latitude,longitude);
                    // 创建地理编码实例      
                    var myGeo = new BMap.Geocoder();      
                    // 根据坐标得到地址描述    
                    var geolocation = new BMap.Geolocation();
                    // 地址定位函数
                    var url = shareUrl + shareData.link;
                    exportFun.goCity(geolocation, url)
                },
                complete: function(res) {
                    console.log('complete:')
                    console.log(res)
                    if(res.errMsg != 'getLocation:ok'){
                        // location.href = shareUrl + shareData.link;
                    }
                }
            });
            
        });
    });
}

//获取域名
export function getUrlMain(){
    var domain = document.domain;
    return "https://"+domain;
}
// 获取url参数
export function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    // var r = window.location.search.substr(1).match(reg); 
    var r = location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
}
//验证手机号
export function isMobile(mobileNum){
    let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    return reg.test(mobileNum);
}
// 千分位
export function formatNumberRgx(num) {  
    var parts = num.toString().split(".");  
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
    return parts.join(".");  
} 

export function checkNum(input) {
    var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
    if (!re.test(input)) {
        return false;
    }else{
        return true;
    }
}

// 对象深拷贝
export function cloneObj(obj) {  
    var newObj = {};  
    if (obj instanceof Array) {  
        newObj = [];  
    }  
    for (var key in obj) {  
        var val = obj[key];  
        //newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。  
        newObj[key] = typeof val === 'object' ? cloneObj(val): val;  
    }  
    return newObj;  
}

// 手机号合法性检测
/* export function checkMobilePhone11(mobilePhone) {
    var varMobilePhone = $.trim(mobilePhone);
    var mobilePhone2 = parseInt(varMobilePhone, 10);
    var bool = false;
    var regexStr = /^1[2,3,4,5,6,7,8,9]\d{9}$/;
    if (mobilePhone2.toString().length == 11
            && eval(regexStr).test(mobilePhone2)) {
        bool = true;
    }
    return bool;
} */

//根据对象属性排序
export function compare(property){
  return function(a,b){
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
  }
}