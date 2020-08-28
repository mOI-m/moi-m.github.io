// Setting
const DURATION_LONG = 1000,
    DURATION_MEDIUM = 800,
    DURATION_REGULAR = 500,
    DURATION_SHORT = 300,
    DURATION_MICRO = 200,
    DURATION_SLIDE = 1300;

const RESPONSE_WIDTH = 768,
    MAP_WIDTH = 500;
    MAP_HEIGHT = 400;


// Map

var mapContainer = document.querySelector(".map"); //지도를 담을 영역의 DOM 레퍼런스

var options = { //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(35.82626220490655, 128.81856295258535), //지도의 중심좌표.
    level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(mapContainer, options); //지도 생성 및 객체 리턴

var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
    imageSize = new kakao.maps.Size(48, 48), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(24, 48)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
    markerPosition = new kakao.maps.LatLng(35.82626220490655, 128.81856295258535); // 마커가 표시될 위치입니다

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage // 마커이미지 설정
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

// 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
var content = '<div class="customoverlay">' +
    '  <a href="\thttps://map.kakao.com/link/map/90820395" target="_blank">' +
    '    <span class="title">Moi\'m</span>' +
    '  </a>' +
    '</div>';

// 커스텀 오버레이가 표시될 위치입니다
var position = new kakao.maps.LatLng(35.82626220490655, 128.81856295258535);

// 커스텀 오버레이를 생성합니다
var customOverlay = new kakao.maps.CustomOverlay({
    map: map,
    position: position,
    content: content,
    yAnchor: 1
});


// Navigation

const pickers = document.querySelectorAll('.nav__picker'),
    headers = document.querySelectorAll('.nav__header'),
    nav = document.querySelector('.nav'),
    sections = document.querySelectorAll('section'),
    back = document.querySelector('.back'),
    wave = document.querySelector('.nav__wave');

let state;

function handlePick(event){
    event.preventDefault();

    state = event.target.dataset.id;
    const target = document.querySelector(`.${event.target.dataset.id}`);

    sections.forEach( section => {

        if( section !== target){
            section.style.display = 'none';
        } else {
            section.style.display = 'block';
        }
    })

    if(target.className === 'contact'){
        map.relayout();

        // 이동할 위도 경도 위치를 생성합니다
        var moveLatLon = new kakao.maps.LatLng(35.82626220490655, 128.81856295258535);

        // 지도 중심을 이동 시킵니다
        map.setCenter(moveLatLon);
    }

    wave.classList.remove('down_100vh');

    setTimeout( function(){
            headers.forEach( header => {
                header.classList.add('up_150vh');
            })
        },
        DURATION_SHORT);


    setTimeout( function(){
            pickers.forEach( picker => {
                picker.classList.add('up_150vh');
            })
        },
        DURATION_REGULAR);

    setTimeout( function(){
            wave.classList.add('up_100vh');
            sections.forEach( section => {
                section.classList.add('up_100vh');
            })
        },
        DURATION_MEDIUM);

    back.classList.add('back--active');

    nav.style.zIndex = '-1';
}

function handleBack(event){
    event.preventDefault();
    const target = document.querySelector(`.${state}`);

    sections.forEach( section => {
        section.style.display = 'none';
    });

    nav.style.zIndex = '0';
    wave.classList.remove('up_100vh');

    setTimeout( function(){
            pickers.forEach( picker => {
                picker.classList.remove('up_150vh');
            })
    },
        DURATION_SHORT);

    setTimeout( function(){
            headers.forEach( header => {
                header.classList.remove('up_150vh');
            })
        },
        DURATION_REGULAR);


    setTimeout( function(){
            wave.classList.add('down_100vh');
            sections.forEach( section => {
                section.classList.remove('up_100vh');
            })
        },
        DURATION_MEDIUM);

    back.classList.remove('back--active');
}


// About > Rotation on Scrolling

const balls = document.querySelectorAll('.container>img');

function handleScrolling(event){
    event.preventDefault();
    balls.forEach( ball => {
    ball.style.transform = `rotate(${window.pageYOffset/6}deg)`;
    })
}


// init

function init(){
    window.addEventListener("scroll", handleScrolling);
    pickers.forEach( picker => {
        picker.addEventListener("click", handlePick);
    })
    back.addEventListener("click", handleBack);
}

init();