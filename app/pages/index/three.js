import moment from 'moment';
// 自定义局部组件
var ComponentC = {
    props: ['data-id'],
	data: function () {
		// let nowTime = moment(this.times).fromNow();
		// setInterval(this.getTimeOut,1000)
		return {
            // id:this._props.dataId
			// timeCount: nowTime,
			// toDo: false
		}
	},
	template: `<button v-on:click="getMoment()">{{ this._props.dataId }}</button>`,
	methods: {
		getMoment:function(){
			// console.log('ComponentC')
			this.$emit('give-item','11111')
		},
		getTimeOut: function(){
		}
	}
};

export default ComponentC