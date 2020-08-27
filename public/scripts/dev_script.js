let draw = SVG().addTo("#drawing").size(3000, 3000);


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
        div = $("#space").append(`<div class="obj" style="top: ${element.y}px; left: ${element.x}px; background: url(${element.img_url}); background-size: contain; background-repeat: no-repeat; width: ${element.width}px;height: ${element.height}px;"></div>`);
        var line = draw.line(obj.x + obj.height / 2, obj.y + element.width / 2, element.x + element.height / 2, element.y + 25).stroke({ width: 1 });
        line.stroke({ color: '#000000', width: 5, linecap: 'round' });
        if (element.data.length == 0)
            return 0;
        else
            Draw(element);
    });
}

function zoomOutMobile() {
    var viewport = document.querySelector('meta[name="viewport"]');
  
    if ( viewport ) {
      viewport.content = "initial-scale=0.1";
      viewport.content = "width=1200";
    }
  }
  
  zoomOutMobile();