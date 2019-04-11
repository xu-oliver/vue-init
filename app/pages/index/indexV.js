import moment from 'moment';
import ComponentC from './three'
// 自定义局部组件
var ComponentA = {
	props: ['data-message','data-id','data-title','data-times','data-end'],
	data: function () {
		// let nowTime = moment(this.times).fromNow();
		// setInterval(this.getTimeOut,1000)
		return {
			id:this._props.dataId
			// timeCount: nowTime,
			// toDo: false
		}
	},
	//  v-on:click="getMoment()"
	template: `<div>a<component-c v-on:give-item="getTimeOut" v-bind:data-id="this._props.dataId"></component-c></div>`,
	methods: {
		getMoment:function(){
			console.log(this.id)
			console.log(this._props.dataId)
		},
		getTimeOut: function(data){
			console.log(data)
		}
	},
	components: {
		'component-c': ComponentC
	}
};

export default ComponentA