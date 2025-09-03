// 지도 생성
var map = L.map('map').setView([36.5, 127.5], 7); // 초기 중앙 위치

// OpenStreetMap 타일
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 지역 데이터
var regions = [
    {
        name: "서울",
        coords: [37.5665, 126.9780],
        zoomLevel: 10,
        preview: "images/seoul.jpg",
        diary: "오늘 서울은 맑음. 사진 첨부.",
        photo: "images/seoul1.jpg"
    },
    {
        name: "부산",
        coords: [35.1796, 129.0756],
        zoomLevel: 10,
        preview: "images/busan.jpg",
        diary: "부산은 비가 조금 내림.",
        photo: "images/busan.jpg"
    }
];

// 마커 생성
var markers = [];
regions.forEach(region => {
    var marker = L.marker(region.coords).addTo(map);
    marker.bindPopup(`
    <h3>${region.name}</h3>
    <img src="${region.preview}" width="150"><br>
    <button onclick="showDiary('${region.name}')">일기 보기</button>
  `);
    marker.regionData = region;
    markers.push(marker);
});

// 특정 줌 레벨 이상에서만 마커 표시
map.on('zoomend', function () {
    var zoom = map.getZoom();
    markers.forEach(marker => {
        if (zoom >= marker.regionData.zoomLevel) {
            marker.addTo(map);
        } else {
            map.removeLayer(marker);
        }
    });
});

// 일기 보기
function showDiary(regionName) {
    var region = regions.find(r => r.name === regionName);
    if (region) {
        alert(`${region.name} 일기:\n${region.diary}`);
    }
}
