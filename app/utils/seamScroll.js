/*
 * @Author: Arvin 
 * @Date: 2018-08-10 15:02:36 
 * @Last Modified by: Arvin
 * @Last Modified time: 2018-09-01 23:00:54
 * 无缝滚动组件
 */

 class SeamScroll{
     /**
      *Creates an instance of SeamScroll.
      * @param {*} $ul
      * @param {number} [direction=1] 默认1为横向，0为纵向
      * @param {number} [step=1]
      * @memberof SeamScroll
      */
     
     constructor($ul, direction = 1, step = 3.5) { 
        if(!$ul){
            return; 
        }     
        this.$ul = $ul;
        this.$parentNode = this.$ul.parentNode;
        // 设置ul基础属性
        this.$ul.style.position = 'relative';
        this.$ul.style.left = 0;
        this.direction = direction;
        this.step = step;
        this.init();
     }

     init() {
        //  获取所有的ul
        const ulList = this.$parentNode.getElementsByTagName('ul');
        // 获取ul dom的所有li子节点
        const $liChild = this.$ul.getElementsByTagName('li');  
        // 初始化UL长度或高度
        let liLength = this.direction ? this.$parentNode.offsetWidth : this.$parentNode.offsetHeight;
        // 获得li子节点总长度
        for(let i = 0; i < $liChild.length; i++) {
            liLength += this.direction ? $liChild[i].offsetWidth : $liChild[i].offsetHeight; 
        }
        //  复制dom内容
        const html = this.$parentNode.innerHTML;
        this.$parentNode.innerHTML += html;
        // 设置父宽度
        this.$parentNode.style.width = liLength*3 + 'px';
        // 设置动画时间
        const time = $liChild.length * this.step;
        // 添加动画属性
        for(let u = 0; u < ulList.length; u++){
            if(ulList[u].style.animation){
                ulList[u].style.animation = `marqueeX ${time}s linear infinite`;
            }else{
                ulList[u].style.WebkitAnimation = `marqueeX ${time}s linear infinite`;
            }
        }
     }
 }


 export default SeamScroll;