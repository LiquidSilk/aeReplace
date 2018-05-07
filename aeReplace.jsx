//var myComp = app.project.activeItem;  
//~ var item = app.project.item(4);
//~ var theTextLayer = item.layers[1];
//~ theTextLayer.property("Source Text").setValue("T反反复复");

 
 
//~ var json = '{\
//~                         "outComp":"out", \
//~                         "text": \
//~                          [ \
//~                             {"comp":"comp1", "text":"bafafbb"},\
//~                             {"comp":"comp2", "text":"aabba"},\
//~                          ], \
//~                          "image": \
//~                          [ \
//~                             {"comp":"image", "path":"D:/图片/Starcraft2/自由之翼 (10).png"}, \
//~                             {"comp":"image2", "path":"C:/Users/Administrator/Desktop/微信图片.jpg"}, \
//~                          ] \
//~                     }';

//~   alert( json);
//~  var obj = eval("(" + json + ")");

 var obj = json;
 
function getCompItemWithName(name)
{
    var myComp;
    for (var i = 1; i <= app.project.numItems; i ++) {
        if ((app.project.item(i) instanceof CompItem) && (app.project.item(i).name === name)) {
            myComp = app.project.item(i);
            return myComp;
        }
    }
 }


function modifyText(compName, text)
{
    var comp = getCompItemWithName (compName);
    var theTextLayer = comp.layers[1];
    theTextLayer.property("Source Text").setValue(text);
}


function modifyImage(compName, imagePath)
{
    var item = app.project.importFile(new ImportOptions(File(imagePath)));
    var comp = getCompItemWithName (compName);
    var layer = comp.layers[1];
    layer.replaceSource(item, true);
}

var projPath = obj.projPath;
var myProject = File(projPath);
app.open(myProject);
var proj = app.project;
app.beginUndoGroup("modify name");

for(var i = 0; i < obj.text.length; i++)
{
//~ modifyText("comp1", "名89字是1六个字 ");
    modifyText(obj.text[i].comp, obj.text[i].text);
}
for(var j = 0; j < obj.image.length; j++)
{
   // modifyImage("image", "D:\\图片\\Starcraft2\\自由之翼 (15).png");
   var comp = obj.image[j].comp;
   var path = obj.image[j].path;
    modifyImage(comp, path);
}

for(var j = 0; j < obj.music.length; j++)
{
   var comp = obj.music[j].comp;
   var path = obj.music[j].path;
    modifyImage(comp, path);
}

//水印
if (obj.waterMark != 1)
{
    modifyText("waterMark", "");
}
    
app.endUndoGroup();

//~ //导出
var comp = getCompItemWithName (obj.outComp);
var rQ = app.project.renderQueue; 
var renderItem = rQ.items.add(comp);

//设置分辨率
var resolution = obj.resolution;
var resolutionString = "Quarter";
if(resolution == "1")
{
    var resolutionString = "Quarter";
}
else if(resolution == "2")
{
    var resolutionString = "Half";
}
else if(resolution == "3")
{
    var resolutionString = "Full";
}
var renderSettings = {
    "Resolution":resolutionString,
};
settings = renderItem.setSettings(renderSettings);

//设置输出目录
var outModule = app.project.renderQueue.item(1).outputModule(1);
//~ var file_name = "123"; // Name contains special character, such as space?
//~ var new_path = "D:\\aeProj";
//~ var separator = "\\";
var outPath = obj.outPath;
var outModuleData = {
"Output File Info":
    {
    "Full Flat Path":outPath
    }
};
outModule.setSettings(outModuleData);


renderItem.outputModules[1].applyTemplate("mp4");
rQ.render();
renderItem.remove();
//~ app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES)
