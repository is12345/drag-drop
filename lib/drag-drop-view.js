'use babel';

import {View} from 'atom-space-pen-views'
import TempPositon from './drag-drop-model'
import CurPositon from './drag-drop-model'

var lastSelect={};
var temppositons={};
var curpositons={};
var modelcount=0;
var curmodel;
const basename='base';
const minsize = 30;

var onUpBtnDown = function (e) {
  alert("up down");
};
var onDownBtnDown = function (e) {
  alert("down down");
};
var onUpLeftBtnDown = function (e) {
  alert("up left down");
};
var onUpRightBtnDown = function (e) {
  alert("up right down");
};
var onDownLeftBtnDown = function (e) {
  alert("down left down");
};
var onDownRightBtnDown = function (e) {
  alert("down right down");
};
var onCenterLeftBtnDown = function (e) {
  alert("center left down");
};
var onCenterRightBtnDown = function (e) {
  alert("center right down");
};

getCss = function(o,key){
  return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
};

doDragDrop = function(Model,temppos){
  curpos = curpositons[curmodel];
  if(getCss(Model, "left") !== "auto"){
    curpos.left = getCss(Model, "left");
  }
  if(getCss(Model, "top") !== "auto"){
    curpos.top = getCss(Model, "top");
  }

  Model.onmousedown = function(event){
    curmodel = Model.id;
    setSelected(Model);
    if(!event){
      event = window.event;
    }
    if(temppos.ResizeFlag == "none"){
      temppos.flag = true;
    }
    temppos.currentX = event.clientX;
    temppos.currentY = event.clientY;
  };
  var Resizers = Model.getElementsByTagName("div");
  for(var i=0;i<Resizers.length;i++){
    switch (Resizers[i].className) {
      case "upBtn":
        Resizers[i].onmousedown = function(event){
          temppos.ResizeFlag = "up";
        };
        break;
      case "downBtn":
        Resizers[i].onmousedown = function(event){
          temppos.ResizeFlag = "down";
        };
        break;
      case "upleftBtn":
        Resizers[i].onmousedown = function(event){
          temppos.ResizeFlag = "upleft";
        };
        break;
      case "uprightBtn":
        Resizers[i].onmousedown = function(event){
          temppos.ResizeFlag = "upright";
        };
        break;
      case "downleftBtn":
        Resizers[i].onmousedown = function(event){
          temppos.ResizeFlag = "downleft";
        };
        break;
      case "downrightBtn":
        Resizers[i].onmousedown = function(event){
          temppos.ResizeFlag = "downright";
        };
        break;
      case "leftBtn":
        Resizers[i].onmousedown = function(event){
          temppos.ResizeFlag = "left";
        };
        break;
      case "rightBtn":
        Resizers[i].onmousedown = function(event){
          temppos.ResizeFlag = "right";
        };
        break;
      default:
        break;
    }
  }
};

document.onmouseup = function(){
  if(curmodel){
    temppos = temppositons[curmodel];
    curpos = curpositons[curmodel];
    temppos.flag = false;
    temppos.ResizeFlag = "none";
    model = document.getElementById(curmodel);
    if(getCss(model, "left") !== "auto"){
      curpos.left = getCss(model, "left");
    }
    if(getCss(model, "top") !== "auto"){
      curpos.top = getCss(model, "top");
    }
    if(getCss(model, "width") !== "auto"){
      curpos.width = getCss(model, "width");
    }
    if(getCss(model, "height") !== "auto"){
      curpos.height = getCss(model, "height");
    }
  }
};

document.onmousemove = function(event){
  if(curmodel){
    model = document.getElementById(curmodel);
    temppos = temppositons[curmodel];
    curpos = curpositons[curmodel];
    var e = event ? event: window.event;
    if(temppos.ResizeFlag == "none"){
      if(temppos.flag){
        var nowX = e.clientX;
        var nowY = e.clientY;
        var disX = nowX - temppos.currentX;
        var disY = nowY - temppos.currentY;
        model.style.left = parseInt(curpos.left) + disX + "px";
        model.style.top = parseInt(curpos.top) + disY + "px";
      }
    }
    else {
      switch (temppos.ResizeFlag) {
        case "up":
          var nowY = e.clientY;
          var disY = temppos.currentY-nowY;
          var curheight = parseInt(curpos.height) + disY;
          if(curheight>minsize){
            model.style.height = curheight + "px";
            model.style.top = parseInt(curpos.top) - disY + "px";
          }
          break;
        case "down":
          var nowY = e.clientY;
          var disY = nowY - temppos.currentY;
          var curheight = parseInt(curpos.height) + disY;
          if(curheight>minsize){
            model.style.height = curheight + "px";
          }
          break;
        case "downright":
          var nowX = e.clientX;
          var nowY = e.clientY;
          var disX = nowX - temppos.currentX;
          var disY = nowY - temppos.currentY;
          var curheight = parseInt(curpos.height) + disY;
          var curwidth = parseInt(curpos.width) + disX;
          if(curheight>minsize){
            model.style.height = curheight + "px";
          }
          if(curwidth>minsize){
            model.style.width = curwidth + "px";
          }
          break;
        case "upright":
          var nowX = e.clientX;
          var nowY = e.clientY;
          var disX = nowX - temppos.currentX;
          var disY = temppos.currentY-nowY;
          var curheight = parseInt(curpos.height) + disY;
          var curwidth = parseInt(curpos.width) + disX;
          if(curheight>minsize){
            model.style.height = curheight + "px";
            model.style.top = parseInt(curpos.top) - disY + "px";
          }
          if(curwidth>minsize){
            model.style.width = curwidth + "px";
          }
          break;
        case "right":
          var nowX = e.clientX;
          var disX = nowX - temppos.currentX;
          var curwidth = parseInt(curpos.width) + disX;
          if(curwidth>minsize){
            model.style.width = curwidth + "px";
          }
          break;
        case "left":
          var nowX = e.clientX;
          var disX = temppos.currentX - nowX;
          var curwidth = parseInt(curpos.width) + disX;
          if(curwidth>minsize){
            model.style.width = curwidth + "px";
            model.style.left = parseInt(curpos.left) - disX + "px";
          }
          break;
        case "upleft":
          var nowX = e.clientX;
          var nowY = e.clientY;
          var disX = temppos.currentX - nowX;
          var disY = temppos.currentY-nowY;
          var curheight = parseInt(curpos.height) + disY;
          var curwidth = parseInt(curpos.width) + disX;
          if(curheight>minsize){
            model.style.height = curheight + "px";
            model.style.top = parseInt(curpos.top) - disY + "px";
          }
          if(curwidth>minsize){
            model.style.width = curwidth + "px";
            model.style.left = parseInt(curpos.left) - disX + "px";
          }
          break;
        case "downleft":
          var nowX = e.clientX;
          var nowY = e.clientY;
          var disX = temppos.currentX - nowX;
          var disY = nowY - temppos.currentY;
          var curheight = parseInt(curpos.height) + disY;
          var curwidth = parseInt(curpos.width) + disX;
          if(curheight>minsize){
            model.style.height = curheight + "px";
          }
          if(curwidth>minsize){
            model.style.width = curwidth + "px";
            model.style.left = parseInt(curpos.left) - disX + "px";
          }
          break;
        default:
          break;
      }
    }
  }
};

setSelected = function(modle){
  for(var i=0;i<8;i++){
    if(lastSelect[i]){
      lastSelect[i].style.opacity=0;
    }
  }
  var Resizers = modle.getElementsByTagName("div");
  for(var i=0;i<Resizers.length;i++){
    Resizers[i].style.opacity=1;
    lastSelect[i] = Resizers[i];
  }
};

export default class DragDropView extends View{

  constructor(serializedState) {
    super();
  }

  static content() {
    this.div({
      class:'drag-drop',
      Id: basename
    }, () =>{
        this.div({class:'upBtn'});
        this.div({class:'downBtn'});
        this.div({class:'upleftBtn'});
        this.div({class:'uprightBtn'});
        this.div({class:'downleftBtn'});
        this.div({class:'downrightBtn'});
        this.div({class:'leftBtn'});
        this.div({class:'rightBtn'});
    });
  };

  invoke(){
    var oBar = document.getElementById(basename);
    if(oBar){
      oBar.onmousedown = function(event){
        sourceNode = document.getElementById(basename);
        var clonedNode = sourceNode.cloneNode(true);
        modelcount++;
        curmodelname = "model-"+modelcount;
        clonedNode.setAttribute("id", curmodelname);
        clonedNode.style.left = "0px";
        clonedNode.style.top = "0px";
        tempp = new TempPositon();
        curpos = new CurPositon();
        curpos.id = curmodelname;
        curpos.left = 0;
        curpos.top = 0;
        tempp.flag = true;
        tempp.ResizeFlag = "none";
        tempp.currentX = event.clientX;
        tempp.currentY = event.clientY;
        sourceNode.parentNode.appendChild(clonedNode);
        curmodel = curmodelname;
        temppositons[curmodel] = tempp;
        curpositons[curmodel]=curpos;
        doDragDrop(clonedNode,tempp);
        setSelected(clonedNode);
      };
    }
  };

  reloadElementDisplay(){
    if(modelcount>0){
      for(i=1;i<=modelcount;i++){
        oElement = document.getElementById("model-"+i);
        oElement.style.display = "block";
      }
    }
  };

  GetJasonData(){
    return JSON.stringify(curpositons);
  };

  // Returns an object that can be retrieved when package is activated
  serialize() {};

  // Tear down any state and detach
  destroy() {
  };

  getTitle = function(){
    return "Drag-Drop";
  };
}
