<template>
  <div id="container"></div>
</template>
<script>
var png = require('../src/assets/1.png')
export default {
  props: ["position"],
  data() {
    return {
      markersArray: [],
    };
  },
  mounted() {
    this.TencentMap();
  },
  methods: {
    TencentMap() {
      var center = new qq.maps.LatLng(30.91339, 103.696);
      var map = new qq.maps.Map("container", {
        center: center, // 地图的中心地理坐标。
        zoom: 17, // 地地图缩放
      });
      // 清除marker函数
      function deleteMarker(markersArray) {
        if (markersArray) {
          for (var i in markersArray) {
            markersArray[i].setMap(null);
          }
          markersArray.length = 0;
        }
      }
      setInterval(() => {
        deleteMarker(this.markersArray);
        let marker = new qq.maps.Marker({
          icon: new qq.maps.MarkerImage(png),
          position: new qq.maps.LatLng(this.position.lat, this.position.lng),
          map: map,
        });
        this.markersArray.push(marker);
      }, 500);
    },
  },
};
</script>
<style>
#container {
  min-width: 500px;
  min-height: 710px;
}
</style>