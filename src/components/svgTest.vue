<template>
  <div id="viewBox" style="width: 100%;height: 100vh">
    <div style="position: absolute;left: 10px;top: 10px;z-index: 10" >
      <button @click="initSvg()">创建点</button>
      <button @click="clickCreateLine()">创建连线</button>
    </div>
    <svg id="svgBox" style="width: 100%;height: 100%" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "svgTest",
  data() {
    return {};
  }
})
export default class App extends Vue {
  SVGNS = "http://www.w3.org/2000/svg";
  SVG: any = null;
  pointArr: any[] = [];
  mounted() {
    this.SVG = document.getElementById("svgBox") as HTMLElement;
    this.initSvg();
  }

  initSvg() {
    const NUM = 1000;
    this.pointArr = []
    let width = document.body.offsetWidth;
    let height = document.body.offsetHeight;
    for (let i = 0; i < NUM; i++) {
      const x = Math.floor(Math.random() * (width - 5));
      const y = Math.floor(Math.random() * (height - 5));
      this.createPoint(x, y, "2", "2");
      this.pointArr.push({ x, y });
    }
  }

  clickCreateLine() {
    const len = this.pointArr.length - 1;
    this.pointArr.forEach((item) => {
      const NUM = Math.floor(Math.random() * len);
      const x1 = item.x;
      const y1 = item.y;
      const x2 = this.pointArr[NUM].x;
      const y2 = this.pointArr[NUM].y;
      const x3 = this.pointArr[NUM - 1].x;
      const y3 = this.pointArr[NUM - 1].y;
      this.createLine(x1, y1, x2, y2);
      this.createLine(x1, y1, x3, y3);
    });
  }

  /**
   * 创建点
   * x: x轴位置
   * y: y轴位置
   * width：宽
   * height：高
   * style：fill：背景；stroke：边框；stroke-width：宽度等
   */
  createPoint(x: any, y: any, width = "10", height = "10", style = "fill:#0a35e2") {
    // 创建一个SVG元素指定大小和坐标
    let chart = this.createElementNS("rect");	// 创建在svgns命名空间里的svg元素
    // 设置节点的属性
    chart.setAttribute("x", x);
    chart.setAttribute("y", y);
    chart.setAttribute("width", width);
    chart.setAttribute("height", height);
    chart.setAttribute("style", style);
    // 设置视口大小
    chart.setAttribute("viewBox", "10 10 100% 100%");
    this.SVG.appendChild(chart);
  }

  /**
   * 创建点与点之间的连线
   * x1、y1 起点位置
   * x2、y2 终点位置
   * style：stroke：边框；stroke-width：宽度等
   */
  createLine(x1: any, y1: any, x2: any, y2: any, style = "stroke:rgb(255,0,0);stroke-width:1") {
    let chart = this.createElementNS("line");
    // 设置节点的属性
    chart.setAttribute("x1", x1);
    chart.setAttribute("y1", y1);
    chart.setAttribute("x2", x2);
    chart.setAttribute("y2", y2);
    chart.setAttribute("style", style);
    this.SVG.appendChild(chart);
  }

  /***
   * 创建图形
   * type: 图形类别
   */
  createElementNS(type: string) {
    return document.createElementNS(this.SVGNS, type);
  }
}
</script>

<style lang="scss" scoped>

</style>
