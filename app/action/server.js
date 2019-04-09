import Http from './http'
import configApi from '../config/config';
// get 公共方法
export const ajaxGet = (url, options) => {
  return Http.get(url, options)
}
//微信分享
export const sharekey = (data) => {
  //weChatAuth/sharekey
  return Http.post(`weChatAuth/sharekey`,data);
}
// post 公共方法
export const ajaxPost = (url, options) => {
  return Http.post(url, options)
}
//拉起微信授权
export const authorization = (options) =>{
  return Http.post(`weChatAuth/authorization`,options);
}
// 拼手气红包界面样式接口
export const getRedPacket = (options) =>{
  return Http.post(`redPacket/getRedPacket`,options);
}
// 拼手气红包拆红包接口
export const getAward = (options) =>{
  return Http.post('redPacket/getAward',options)
}
// 拼手气红包分享接口
export const shareRedPacket = (options) =>{
  return Http.post('redPacket/shareRedPacket',options)
}
// 获取会员信息
export const queryMemberInfo = (options) =>{
  return Http.post(`bill/getMemberInfo`,options);
}