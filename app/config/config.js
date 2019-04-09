import dev from './config-dev';
import sit from './config-sit';
import formal from './config-prd';
let baseUrl = {};
const obj = {
   loginNative : 'nexuscommon://gotoLogin?params={param1:"", param2:""}',//app登录
   nativeShareUrl : 'nexusshare://share?params='//app分项
};
const env = _ENV_;
const setVisit = window.location.origin;

if(env === 'build'){// prd
    baseUrl = Object.assign(obj, formal);
}else if(env === 'build-test'){// sit
    baseUrl = Object.assign(obj, sit);
}else{// dev
    baseUrl = Object.assign(obj, dev);
}

export default baseUrl;