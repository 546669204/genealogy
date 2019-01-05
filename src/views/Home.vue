<template>
  <div class="home">
    <canvas width="960" height="960"></canvas>
    123123
  </div>
</template>

<script lang="ts">
/// <reference path="./index.d.ts" />
import { Component, Vue, Model } from "vue-property-decorator";
import c from "./canvas/main";

var data: DataModel.PeopleData[] = [
  {
    id: 1,
    name: "王大",
    sex: 0,
    companion: ["小红"],
    chilren: [
      {
        id: 2,
        name: "王小大",
        sex: 0,
        companion: [],
        chilren: []
      },
      {
        id: 3,
        name: "王小二",
        sex: 0,
        companion: ["小黄"],
        chilren: [
          {
            id: 5,
            name: "王黄大",
            sex: 0,
            companion: [6],
            chilren: [
              {
                id: 7,
                name: "王黄小",
                sex: 0,
                companion: [6],
                chilren: [
                  {
                    id: 9,
                    name: "王黄大",
                    sex: 0,
                    companion: [],
                    chilren: []
                  }
                ]
              },
              {
                id: 8,
                name: "王黄笑",
                sex: 0,
                companion: [],
                chilren: []
              }
            ]
          },
          {
            id: 6,
            name: "王黄二",
            sex: 1,
            companion: [5],
            chilren: []
          }
        ]
      },
      {
        id: 4,
        name: "王小三",
        sex: 0,
        companion: ["翠花"],
        chilren: [
          {
            id: 10,
            name: "王黄大",
            sex: 0,
            companion: [],
            chilren: []
          },
          {
            id: 11,
            name: "王黄大",
            sex: 0,
            companion: [],
            chilren: []
          },
          {
            id: 12,
            name: "王黄大",
            sex: 0,
            companion: [],
            chilren: []
          }
        ]
      }
    ]
  }
];
@Component
export default class Home extends Vue {
  constructor(props: any) {
    super(props);
  }
  mounted() {
    var canvas = document.querySelector("canvas") || ({} as HTMLCanvasElement);
    // var context = canvas.getContext("2d");
    // var width = canvas.width;
    // var height = canvas.height;
    console.log("run");
    new c(canvas, data);
  }
}
</script>
