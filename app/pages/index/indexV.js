import moment from 'moment';
// 自定义局部组件
var ComponentA = {
	props: ['message','id','title','times','end'],
	data: function () {
		let nowTime = moment(this.times).fromNow();
		setInterval(this.getTimeOut,1000)
		return {
			timeCount: nowTime,
			toDo: false
		}
	},
	template: `<div><h3 v-if="toDo">{{ timeCount }}</h3><h3 class="dis" v-else>a</h3></div>`,
	methods: {
		getMoment:function(data){
			let now = new Date();
			let ms = data.getTime() - now.getTime();
			let s = ms/1000;
			let m = s/60;
			let h = parseInt(m/60);
			m = parseInt(m - h * 60);
			s = parseInt(s - h * 60 * 60 - m * 60);
			if(h >= 0 && m >= 0 && s >= 0){
				h = h + '';
				m = m + '';
				s = s + '';
				if(h.length == 1){
					h = '0' + h;
				}
				if(m.length == 1){
					m = '0' + m;
				}
				if(s.length == 1){
					s = '0' + s;
				}
				return h + ':' + m + ':' + s
			}else{
				return false
			}
		},
		getTimeOut: function(){
			let data = new Date(this.times);
			let nowTime = this.getMoment(data);
			if(nowTime){
				this.timeCount = nowTime;
				this.toDo = true;
			}else{
				// 判断是否超时并记录下次倒计时
				let thatData = new Date(this.end);
				let thatNowTime = this.getMoment(thatData);
				if(thatNowTime){
					this.toDo = false;
				}else{
					this.toDo = true;
					this.timeCount = thatNowTime;
				}
			}
		}
	}
};

export default ComponentA