


declare namespace DataModel {
  interface PeopleData {
    id: number;
    name: string;
    sex:number;//0 男 1 女
    companion: string | number | string[] | number[];
    chilren: PeopleData[];
  }
}