/// <reference path="../index.d.ts" />
import DataNode from "./node";

class Canvas {
  private elem: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D|null;
  private root: DataNode;
  private publicWidth: number;
  private listData:DataNode[]
  constructor(elem: HTMLCanvasElement, data: DataModel.PeopleData[]) {
    this.elem = elem;
    this.root = new DataNode();
    this.publicWidth = 50;
    this.ctx = this.elem.getContext("2d");
    this.listData = [];
    this.buildTree(data);
  }
  buildTree(data: DataModel.PeopleData[]) {
    this.buildTreeObject(data, this.root);

    this.buildTreeLink(this.root);
    console.log(this);

    this.root.x = 500;
    this.root.y = 0;
    this.calcPath(this.root);

    this.calcDistance(this.root);

    this.draw();
  }
  calcPath(node: DataNode) {
    var left = (node.x+this.publicWidth/2) - (Math.floor(node.chilren.length * 2 - 1) * this.publicWidth) / 2;
    for (let i = 0; i < node.chilren.length; i++) {
      const v = node.chilren[i];
      v.y = node.y + this.publicWidth * 2;
      v.x = left + i * this.publicWidth * 2;
    }
    if(node.chilren.length>0){
      node.area = [node.chilren[0].x,node.chilren[node.chilren.length-1].x+this.publicWidth]
    }

    Object.keys(node.chilren).forEach((v: any) => {
      this.calcPath(node.chilren[v]);
    });
  }
  calcDistance(node: DataNode){
    var minold = 0;
    var maxold = 0;
    Object.values(node.chilren).filter((v)=>{return v.area != undefined}).forEach((v: any,i:number,a:DataNode[]) => {
      console.log(v,i,a)
      
      if(i+1>=a.length || !a[i].area || !a[i+1].area)return ;
      if(a[i].area[1]+this.publicWidth > a[i+1].area[0]){
        a[i+1].x += Math.abs(a[i].area[1]+this.publicWidth - a[i+1].area[0])
        this.calcPath(a[i+1])
      }
    });


    Object.keys(node.chilren).forEach((v: any) => {
      this.calcDistance(node.chilren[v]);
    });
  }
  draw() {
    if(!this.ctx)return;
    Object.keys(this.root.chilren).forEach((v: any) => {
      this.drawNode(this.root.chilren[v]);
    });
 
  }
  drawNode(node: DataNode) {
    if(!this.ctx)return;
    this.ctx.rect(node.x,node.y,node.width,node.height);
    this.ctx.stroke();
    this.ctx.textAlign = "center"
    node.data&&this.ctx.fillText(node.data.name,node.x+25,node.y+25,this.publicWidth)
    node.data&&this.ctx.fillText(node.data.sex==0?"(男)":"(女)",node.x+25,node.y+35,this.publicWidth)




    if(node.companion.length>0){
      Object.values(node.companion).forEach((v)=>{
        if(!this.ctx)return;
        this.ctx.beginPath();
        this.ctx.moveTo(node.x+this.publicWidth/2,node.y+this.publicWidth);
        this.ctx.lineTo(node.x+this.publicWidth/2,node.y+this.publicWidth*3/2);
        this.ctx.lineTo(v.x+this.publicWidth/2,node.y+this.publicWidth*3/2);
        this.ctx.lineTo(v.x+this.publicWidth/2,v.y+this.publicWidth);
        this.ctx.stroke();
      })

    }

    if(!node.foreign && node.parent && node.parent != this.root){
      this.ctx.beginPath();
      this.ctx.moveTo(node.parent.x+this.publicWidth/2,node.parent.y+this.publicWidth);
      this.ctx.lineTo(node.parent.x+this.publicWidth/2,node.parent.y+this.publicWidth*3/2);
      this.ctx.lineTo(node.x+this.publicWidth/2,node.y-this.publicWidth*1/2);
      this.ctx.lineTo(node.x+this.publicWidth/2,node.y);
      this.ctx.stroke();
    };


    Object.keys(node.chilren).forEach((v: any) => {
      this.drawNode(node.chilren[v]); 
    });

    
  }
  buildTreeObject(data: DataModel.PeopleData[], parent: DataNode) {
    Object.keys(data).forEach((v: any) => {
      let node = new DataNode(data[v], parent);
      if (node.data && node.data.chilren.length > 0) {
        this.buildTreeObject(node.data.chilren, node);
      }
      parent.chilren.push(node);
      this.listData.push(node);
    });
  }
  buildTreeLink(node:DataNode){
    
    Object.keys(node.chilren).forEach((v: any) => {
      this.buildTreeLink(node.chilren[v])
    });
    if(!node.data)return
    var womenId = node.data.id;
    if(typeof node.data.companion == "string"){
      var nodeCompanion = new DataNode({name:node.data.companion,sex:1,companion:womenId,id:0,chilren:[]}, node.parent);
      node.insertNext(nodeCompanion)
      node.companion.push(nodeCompanion);
    }
    if(typeof node.data.companion == "number"){
      var nodeCompanion = this.listData.filter((v3)=>{return v3.data && node.data && v3.data.id == node.data.companion})[0];
      node.companion.push(nodeCompanion);
    }
    if(typeof node.data.companion == "object" && node.data.companion instanceof Array){
      Object.values(node.data.companion).forEach((v2)=>{
        if(typeof v2 == "string"){
          var nodeCompanion = new DataNode({name:v2,sex:1,companion:womenId,id:0,chilren:[]}, node.parent);
          nodeCompanion.foreign = true;
          node.insertNext(nodeCompanion)
          node.companion.push(nodeCompanion);
          return
        }
        if(typeof v2 == "number"){
          var nodeCompanion = this.listData.filter((v3)=>{return v3.data && v3.data.id == v2})[0];
          node.companion.push(nodeCompanion);
          return
        }
      })
    }

   
  }
}

export default Canvas;
