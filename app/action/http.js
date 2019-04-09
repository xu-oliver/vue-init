import axios from 'axios';
import md5 from 'md5';
import Utils from '../utils/utils';
import configApi from '../config/config';

axios.defaults.baseURL = configApi.apiPath
axios.defaults.headers = {
    'Content-Type': 'application/json'
};
axios.defaults.timeout = 25000;
axios.interceptors
    .request
    .use(configer => {
        let parameters = JSON.stringify(configer.data); 
        //统一网关
        let requestId = Math.random("8");
        let appId = 'APPKHFJJ78897FH';
        let tokenId = Utils.request('oauth_token') || localStorage.getItem('oauthToken') || 'null';
        let timestamp = new Date().getTime();
        let signature = md5(`requestId=${requestId}&appId=${appId}&timestamp=${timestamp}&reqType=app&tokenId=null&parameters=${parameters}`)
        if(configer.method != 'OPTION'){
            configer.headers['requestId'] = `${requestId}`;
            configer.headers['tokenId'] = 'null';
            configer.headers['appId'] = `${appId}`;
            configer.headers['timestamp'] = `${timestamp}`;
            configer.headers['reqType'] = 'app';          //代表h5活动，其他请与后台约定
            configer.headers['signMethod'] = 'md5';
            configer.headers['signature'] = `${signature}`;
        }
        return configer;
    })

axios.interceptors
    .response
    .use(response => {
        if (response.data && response.data.status === '200' ) {
            return response.data;
        } else {
            if (response.data && response.data.status == '400') {
                // location.href = './404.html?error=1';
                console.log('接口访问成功！状态为400');
            } else if (response.data && response.data.status == '500') {
                console.log('接口访问成功！状态为500');
                // location.href = './404.html?error=2';
            }
            return Promise.reject(response.data);
        }
    }, error => {
        console.log('接口访问失败！');
        // location.href = './404.html?error=2';
    })

export default {
    get(url, data) {
        return axios({ method: 'get', url, params: data })
    },
    post(url, data) {
        return axios({ method: 'post', url, data })
    }
}
