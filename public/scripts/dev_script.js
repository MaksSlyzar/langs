let draw = SVG().addTo("#drawing").size(3000, 3000);
const lines = [];

$(function() {
    
	$.getJSON('data', function(data){
        obj = [];
		data.forEach(element => {
            obj = element;
            console.log(obj.name);
            lines.push({data_elements: {}, source:"", id:""});
            Draw(obj, lines[0]);
            div = $("#space").append(`<div class="obj" style="top: ${element.y}px; left: ${element.x}px; background: url(${element.img_url}); background-size: contain; background-repeat: no-repeat;  width: ${obj.width}px;height: ${obj.height}px;"></div>`);
            
        });
	});

	$('#space').draggable();
});

function Draw(obj, _lines){
    obj.data.forEach(element => {
        console.log(element.description);
        element.x += obj.x;
        element.y += obj.y;
        element.width = obj.width / 1.5;
        element.height = obj.height / 1.5;

        if (element.style == "full"){
            div = $("#space").append(`<div id="${element.id}" class="obj" style="top: ${element.y}px; left: ${element.x}px; background: url(${element.img_url}); background-size: contain; background-repeat: no-repeat; width: 200px;height: 70px;">
                <div class="name">${element.name}</div>
                <div class="description">${element.description}</div>
            </div>`);
        }else
            div = $("#space").append(`<div class="obj" id="${element.id}" style="top: ${element.y}px; left: ${element.x}px; background: url(${element.img_url}); background-size: contain; background-repeat: no-repeat; width: ${element.width}px;height: ${element.height}px;">
                <div class="name">${element.name}</div>
                <div class="description">${element.description}</div>
            </div>`);
        lines_source = "";
        lines_source += obj.source;
        lines_source += obj.id;
        _lines.data_elements[element.id] = {
                source: lines_source,
                data_elements: {},
                rect: draw.line(obj.x + obj.width / 2, obj.y + obj.width / 2, element.x + obj.width / 2, element.y + obj.width / 2).stroke({ width: 1 })};
        _lines.data_elements[element.id].rect.stroke({ color: '#000000', width: 2, linecap: 'round' });
        //console.log(JSON.stringify(_lines.data_elements[element.id]));
        //var data_str = JSON.stringify(_lines.data_elements[element.id]);
        //$(".obj").attr("data-hero",data-str);
        $("#space .obj").draggable({
            drag: function(){
                function update(){
                    update();
                }
                //console.log(object.x(), object.y(), object.width(), object.height());
            }
        });
        if (element.data.length == 0)
            return 0;
        else
            Draw(element, _lines.data_elements[element.id]);
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