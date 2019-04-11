import Vue from 'vue/dist/vue.js';
import css from './index.scss';
import moment from 'moment';
import ComponentA from './indexV'
import ComponentB from './pak'
import ComponentC from './three'

import {getRedPacket, authorization, getAward, shareRedPacket, queryMemberInfo} from '../../action/server';
import Utils from '../../utils/utils';
import exportFun from '../../utils/export';
import {getQueryString,decideData, sharePage, shareWechat, shareWechatCity} from '../../common/common';
import config from '../../config/config';
import md5 from 'md5';
import $ from 'jquery';
import { Base64 } from 'js-base64';



// 针对app的class操作
const index = new Vue({ 
    el: '.index',
    data: {
		post: [
			{id: 1 , title: 'id is 1!' , times: '2019-3-13 14:11:00' , end:'2019-3-13 14:28:00'},
			{id: 2 , title: 'id is 2!' , times: '2019-3-14 11:50:00' , end:'2019-3-14 14:15:00'}
		]
	},
	created: function(){
		
	},
	mounted: function(){
		
	},
	methods: {
		getAnswer: function(){
			this.consoleF()
		},
		consoleF: function(){
			console.log('go to consoleF axios!')
		},
		getTimeOut: function(data){
			console.log(data)
		}
	},
	watch: {
		post: function(){
			this.getAnswer()
		}
	},
	components: {
		'component-a': ComponentA,
		'component-b': ComponentB,
		'component-c': ComponentC
	}
});
