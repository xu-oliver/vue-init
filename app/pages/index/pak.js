// 自定义局部组件
var ComponentB = {
	data: function () {
		// let nowTime = moment(this.times).fromNow();
		// setInterval(this.getTimeOut,1000)
		return {
			// timeCount: nowTime,
			// toDo: false
		}
	},
	template: `<button v-on:click="getMoment()">点击</button>`,
	methods: {
		getMoment:function(){
			// this.$parent.post[0].id = 3
			this.$emit('go-click','a')
		},
		getTimeOut: function(data){
			console.log(data)
		}
	}
};

export default ComponentB