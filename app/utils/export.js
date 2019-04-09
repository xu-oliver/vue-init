// 可调用方法
let exportFun = {
    locationSet : function(name, data){
        // name:缓存数据名称，data:缓存数据data
        if(data.constructor != String){
            data = JSON.stringify(data);
        }
        localStorage.setItem(name,data);
        return true
    },
    locationGet : function(name){
        // name:获取缓存数据名称，type:所需回调缓存数据类型
        let thisData = localStorage.getItem(name);
        let returnDate;
        if(!!thisData){
            if(thisData.constructor == String && thisData.indexOf('[') == -1 && thisData.indexOf('{') == -1){
                returnDate = thisData;
            }else{
                returnDate = JSON.parse(thisData);
            }
        }
        return returnDate
    },
    shareKey : 'DPi1JoPxDjn7xJR5', // uat
    // shareKey : 'BOjeKnwNtYMArQcZ' // 生产签名key
    // 地址定位函数
    goCity : function(geolocation, url){
        // 记录上级this
        var that = this;
        var geolocation = new BMap.Geolocation(); 
        var gc = new BMap.Geocoder(); 
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS && !!r.accuracy){
                var pt = r.point;    
                gc.getLocation(pt, function(rs){
                    var addComp = rs.addressComponents;  
                    if(!!addComp.province){
                        that.city = addComp.province;
                        that.locationSet('cityName',addComp.province);
                    }
                })
            }else {
                // 判断界面是否第二次加载定位
                var countLocation = localStorage.getItem('countLocation') || 1;
                if(countLocation < 2){
                    // alert('请在定位授权中点击确认按钮！')
                    countLocation++;
                    localStorage.setItem('countLocation',countLocation);
                    that.goCity(geolocation, url)
                }else if(countLocation == 2){
                    that.city = '全国';
                    that.locationSet('cityName','全国');
                }
            }        
        });
    },
    city : ''// 定位城市名称
}
export default exportFun;