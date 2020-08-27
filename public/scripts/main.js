let draw = SVG().addTo("#drawing").size(3000, 3000);
let zoom = 1;

$(function() {
    
	$.getJSON('data', function(data){
        obj = [];
		data.forEach(element => {
            obj = element;
            console.log(obj.name);
            Draw(obj);
            div = $("#space").append(`<div class="obj" style="top: ${element.y}px; left: ${element.x}px; background: url(${element.img_url}); background-size: contain; background-repeat: no-repeat;  width: ${obj.width}px;height: ${obj.height}px;"></div>`);
        });
	});

	$('#space').draggable();
});

function Draw(obj){
    obj.data.forEach(element => {
        console.log(element.name);
        element.x += obj.x;
        element.y += obj.y;
        element.width = obj.width / 1.5;
        element.height = obj.height / 1.5;
        if (element.style == "full"){
            div = $("#space").append(`<div class="obj" style="top: ${element.y}px; left: ${element.x}px; background: url(${element.img_url}); background-size: contain; background-repeat: no-repeat; width: 200px;height: 70px;"></div>`);
        
        }else
            div = $("#space").append(`<div class="obj" style="top: ${element.y}px; left: ${element.x}px; background: url(${element.img_url}); background-size: contain; background-repeat: no-repeat; width: ${element.width}px;height: ${element.height}px;"></div>`);
        var line = draw.line(obj.x + obj.width / 2, obj.y + obj.width / 2, element.x + obj.width / 2, element.y + obj.width / 2).stroke({ width: 1 });
        line.stroke({ color: '#000000', width: 2, linecap: 'round' });
        
        if (element.data.length == 0)
            return 0;
        else
            Draw(element);
    });
}

if (document.addEventListener) {
    if ('onwheel' in document) {
      // IE9+, FF17+, Ch31+
      document.addEventListener("wheel", onWheel);
    } else if ('onmousewheel' in document) {
      // устаревший вариант события
      document.addEventListener("mousewheel", onWheel);
    } else {
      // Firefox < 17
      document.addEventListener("MozMousePixelScroll", onWheel);
    }
  } else { // IE8-
    document.attachEvent("onmousewheel", onWheel);
}
  
function onWheel(e) {
    e = e || window.event;
  
    // wheelDelta не даёт возможность узнать количество пикселей
    var delta = e.deltaY || e.detail || e.wheelDelta;
    if (delta > 0)
        zoom -= 0.05;
    else
        if (zoom < 5)
            zoom += 0.05;
    
    $("#space").css({
        zoom: zoom,
    })
  
    //e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}

function zoomOutMobile() {
    var viewport = document.querySelector('meta[name="viewport"]');
  
    if ( viewport ) {
      viewport.content = "initial-scale=0.1";
      viewport.content = "width=1200";
    }
  }
  
zoomOutMobile();