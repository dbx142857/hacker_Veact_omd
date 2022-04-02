module.exports = {
    beforeDestroy() {
        this.$options.map.destroy()
        this.$options.markerLayer.destroy()
    },
    props: {
        value: {
            type: Object,
            default: function () {
                return {
                    lat: 39.984120,
                    lng: 116.307484,
                }
            }
        }
    },
    async mounted() {
        await Bue.s.loadJS('//map.qq.com/api/gljs?v=1.exp&key=ZGQBZ-SHZ3V-F7SPT-UFIUC-GJJMV-TEFWQ')
        var center = new TMap.LatLng(this.value.lat, this.value.lng)
        //定义map变量，调用 TMap.Map() 构造函数创建地图
        var map = new TMap.Map(this.$el, {
            center: center,//设置地图中心点坐标
            zoom: 15.2,   //设置地图缩放级别
            pitch: 43.5,  //设置俯仰角
            rotation: 45    //设置地图旋转角度
        });

        //初始化marker图层
        var markerLayer = new TMap.MultiMarker({
            id: 'marker-layer',
            map: map
        });
        //监听点击事件添加marker
        map.on("click", (evt) => {
            // let tmpObj = {
            //     ...evt.latLng
            // }
            // console.log('tmpObj--:', tmpObj)
            markerLayer.destroy();
            this.$options.markerLayer = markerLayer = new TMap.MultiMarker({
                id: 'marker-layer',
                map: map
            });
            // console.log('markerLayer---:', markerLayer)
            // console.log('evt.latLng--:', evt.latLng)
            markerLayer.add({
                position: evt.latLng
            });
            this.$emit('change', evt.latLng)
        });

        this.$options.map = map;
        this.$options.markerLayer = markerLayer;
    }
}