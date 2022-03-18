<template>
  <div id="container"></div>
</template>

<script lang="ts">
import * as THREE from "three";

import { Component, Vue } from "vue-property-decorator";
import { BoxHelper } from "three";

@Component({
  data() {
    return {};
  }

})
export default class HelloWorld extends Vue {
  mounted() {
    this.initCanvas();
  }

  initCanvas() {
    //基础数据，节点和边。其中边数据描述了连接的两个节点编号
    let nodes = [{ name: "桂林" }, { name: "广州" },
      { name: "厦门" }, { name: "杭州" },
      { name: "上海" }, { name: "青岛" },
      { name: "天津" }];

    let edges = [{ source: 0, target: 1 }, { source: 0, target: 2 },
      { source: 0, target: 3 }, { source: 1, target: 4 },
      { source: 1, target: 5 }, { source: 1, target: 6 }];

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    const doc = document.getElementById("container") as HTMLHtmlElement;
    doc.appendChild(renderer.domElement);
    // document.body.appendChild(renderer.domElement);

    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    let scene = new THREE.Scene();
    // let value: object = {
    //   body: null,
    // };
    let value: any = {};
    //创建三维球体
    let sphere_geometry = new THREE.SphereGeometry(10, 32, 32);
    let sphere_material = new THREE.MeshPhongMaterial();
    let sphere: any = new THREE.Mesh(sphere_geometry, sphere_material);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    scene.add(sphere);
    //这一行可以暂时忽略
    // dragObjects.push(sphere);
    //在原始数据上增加一个body字段指向球体
    value.body = sphere;
    //球体对象上增加data字段指向原始数据
    sphere.data = value;
    const points: any[] = [];
    let material = new THREE.LineBasicMaterial({ vertexColors: true, linewidth: 50, color: "red" });

    let geometry = new THREE.BufferGeometry();
    edges.forEach((value => {

      console.log(value, nodes[value.source], sphere);
      //此处直接绑定节点的位置
      // geometry.vertices.push(nodes[value.source].body.position);
      // geometry.vertices.push(nodes[value.target].body.position);
      // [nodes[value.source].body.position, nodes[value.target].body.position];
      points.push([value.source, value.target, 50]);
      //线条的颜色是渐变的
      // geometry.colors.push(new THREE.Color(color(value.source.index)), new THREE.Color(color(value.target.index)));

      // value.body = line;
    }));
    const arr: any[] = [];
    points.forEach(d => {
      const [x, y, z] = d;
      arr.push(x, y, z);
    });
    const vertices = new Float32Array(arr);
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 20));

    let line = new THREE.Line(geometry, material);
    line.castShadow = true;
    line.receiveShadow = true;
    scene.add(line);
    renderer.render(scene, camera);

  }
}
</script>

<style scoped>

</style>
