// ���� ����
var map = L.map('map').setView([36.5, 127.5], 7); // �ʱ� �߾� ��ġ

// OpenStreetMap Ÿ��
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// ���� ������
var regions = [
    {
        name: "����",
        coords: [37.5665, 126.9780],
        zoomLevel: 10,
        preview: "images/seoul.jpg",
        diary: "���� ������ ����. ���� ÷��.",
        photo: "images/seoul1.jpg"
    },
    {
        name: "�λ�",
        coords: [35.1796, 129.0756],
        zoomLevel: 10,
        preview: "images/busan.jpg",
        diary: "�λ��� �� ���� ����.",
        photo: "images/busan.jpg"
    }
];

// ��Ŀ ����
var markers = [];
regions.forEach(region => {
    var marker = L.marker(region.coords).addTo(map);
    marker.bindPopup(`
    <h3>${region.name}</h3>
    <img src="${region.preview}" width="150"><br>
    <button onclick="showDiary('${region.name}')">�ϱ� ����</button>
  `);
    marker.regionData = region;
    markers.push(marker);
});

// Ư�� �� ���� �̻󿡼��� ��Ŀ ǥ��
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

// �ϱ� ����
function showDiary(regionName) {
    var region = regions.find(r => r.name === regionName);
    if (region) {
        alert(`${region.name} �ϱ�:\n${region.diary}`);
    }
}
