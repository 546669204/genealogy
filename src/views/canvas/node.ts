class DataNode {
  public data:DataModel.PeopleData|undefined
  public x:number
  public y:number
  public level:number
  public parent:DataNode|undefined
  public chilren:DataNode[]
  public width:number
  public height:number
  public foreign:boolean
  public companion:DataNode[]
  public area:number[]|undefined

  constructor(data?:DataModel.PeopleData,parent?:DataNode){
    this.parent = parent;
    this.data = data;
    this.level = parent?(parent.level + 1):0;

    this.chilren = [];
    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.height = 50;

    this.foreign = false;

    this.companion = [];
    this.area = undefined;
    
  }
  insertNext(node:DataNode){
    if(!this.parent){return}
    var s = -1;
    for (let i = 0; i < this.parent.chilren.length; i++) {
      if (this.parent.chilren[i] == this){
        s = i;
        break;
      }
    }
    this.parent.chilren.splice(s+1,0,node);
  }
}

export default DataNode;