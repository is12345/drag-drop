'use babel';

import {View} from 'atom-space-pen-views'
import TempPositon from './drag-drop-model'
import CurPositon from './drag-drop-model'

var temppositons={};
var curpositons={};
var modelcount=0;
//var copyparam = new ConfigStruct();
var curmodel;
const basename='base';

getCss = function(o,key){
  return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
};

doDragDrop = function(Model){
  temppos = temppositons[curmodel];
  curpos = curpositons[curmodel];
  if(getCss(Model, "left") !== "auto"){
    curpos.left = getCss(Model, "left");
  }
  if(getCss(Model, "top") !== "auto"){
    curpos.top = getCss(Model, "top");
  }
  Model.onmousedown = function(event){
    curmodel = Model.id;
    temppos.flag = true;
    if(!event){
      event = window.event;
    }
  }
  temppos.currentX = event.clientX;
  temppos.currentY = event.clientY;
};

document.onmouseup = function(){
  if(curmodel){
    temppos = temppositons[curmodel];
    curpos = curpositons[curmodel];
    temppos.flag = false;
    model = document.getElementById(curmodel);
    if(getCss(model, "left") !== "auto"){
      curpos.left = getCss(model, "left");
    }
    if(getCss(model, "top") !== "auto"){
      curpos.top = getCss(model, "top");
    }
  }
};

document.onmousemove = function(event){
  if(curmodel){
    model = document.getElementById(curmodel);
    temppos = temppositons[curmodel];
    curpos = curpositons[curmodel];
    var e = event ? event: window.event;
    if(temppos.flag){
      var nowX = e.clientX;
      var nowY = e.clientY;
      var disX = nowX - temppos.currentX;
      var disY = nowY - temppos.currentY;
      model.style.left = parseInt(curpos.left) + disX + "px";
      model.style.top = parseInt(curpos.top) + disY + "px";
    }
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
      this.div({
        class:'rect'
      });
    })
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
        temppos = new TempPositon();
        curpos = new CurPositon();
        curpos.left = 0;
        curpos.top = 0;
        temppos.flag = true;
        temppos.currentX = event.clientX;
        temppos.currentY = event.clientY;
        sourceNode.parentNode.appendChild(clonedNode);
        curmodel = curmodelname;
        temppositons[curmodel] = temppos;
        curpositons[curmodel]=curpos;
        doDragDrop(clonedNode);
      };
    }
  };

  GetJasonData(){
    return JSON.stringify(curpositons);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
  }

  getTitle = function(){
    return "Drag-Drop";
  };
}
