<template>
  <div class="container mt-4">
    <h2 class="text-center text-secondary pb-2">Contact us</h2>
    <img src="https://img.alicdn.com/imgextra/i3/2207468236631/O1CN01bQ1MI21yr2uH7l7Sc_!!2207468236631.jpg" alt="">
    <h1>Established in 2020</h1>
    <p style="text align: center"> We are established in 2020,which sells the fancy Goods for Dogs</p>
    <p style="text align: center"> High Quality,Health and Food Safety is our first priority </p>
    <p style="text align: center"> Accomadation for short term is also Available </p>
    <p style="text align: center"> Feel Free to contact us ! </p>
    <div class="map-container border rounded">
      <ul class="nav justify-content-center border-bottom">
        <!--營運地區 nav-->
      </ul>
      <!--地圖呈現在此-->
      <div class="google-map" id="map">
      </div>
      <div class="location">
        <h3>
      Location
        </h3>
     <div class="address">
      New York, NY 10012, US
     </div>
     <div class="address">
       Call Toll-Free: 1-800-672-4399
        <small>(Available 10am-10pm ET, 7 days a week.)</small>
     </div>
     <div class="address">
      Email: info@gmail.com
     </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Restaurants',
  data () {
    return {
      map: null,
      // 預設經緯度在信義區附近
      lat: 24.950098,
      lng: 121.510986
    }
  },
  mounted () {
    this.initMap()
    this.setMarker()
  },
  methods: {
    // 建立地圖
    initMap () {
      const google = window.google
      // 透過 Map 物件建構子建立新地圖 map 物件實例，並將地圖呈現在 id 為 map 的元素中
      this.map = new google.maps.Map(document.getElementById('map'), {
        // 設定地圖的中心點經緯度位置
        center: { lat: this.lat, lng: this.lng },
        // 設定地圖縮放比例 0-20
        zoom: 15,
        // 限制使用者能縮放地圖的最大比例
        maxZoom: 20,
        // 限制使用者能縮放地圖的最小比例
        minZoom: 3,
        // 設定是否呈現右下角街景小人
        streetViewControl: false,
        // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
        mapTypeControl: false
      })
    },
    // 建立地標
    setMarker () {
      const google = window.google
      // 建立一個新地標
      const marker = new google.maps.Marker({
        // 設定地標的座標
        position: { lat: this.lat, lng: this.lng },
        // 設定地標要放在哪一個地圖
        map: this.map
      })
      // 透過 InfoWindow 物件建構子建立新訊息視窗
      const infowindow = new google.maps.InfoWindow({
        // 設定想要顯示的內容
        content: `
          <div id="content">
            <p id="firstHeading" class="firstHeading">Border Collie Paradise</p>
          </div>
        `,
        // 設定訊息視窗最大寬度
        maxWidth: 200
      })
      // 在地標上監聽點擊事件
      marker.addListener('click', () => {
        // 指定在哪個地圖和地標上開啟訊息視窗
        infowindow.open(this.map, marker)
      })
    }
  }
}
</script>

<style scoped>
.google-map {
  width: 50%;
  height: 400px;
}
.map-container {
  display: flex;
  margin-top: 50px;
}
.location {
  width: 50%;
  height: 400px;
  background:#828282;
  color: #fff;
}
h3 {
  font-weight: 300;
}
.address {
  padding-top: 10px;
}
img {
  border-style: none;
  vertical-align: top;
  max-width: 100%;
  height: auto;
  margin-bottom: 30px;
}
p {
  font-family: Comic Sans MS;
  margin-bottom: 20px;
}
</style>
