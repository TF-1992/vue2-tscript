<template>
  <div id="contentBox" class="content-box">
    <!--    <canvas id="canvasBox" style="width: 100%; height: 100%" />-->
    <!--    <canvas id="myCanvas" style="width: 100%; height: 100%" />-->
  </div>
</template>

<script lang="ts">
import * as THREE from "three";
import { Component, Prop, Vue } from "vue-property-decorator";
import { MeshNormalMaterial, WebGLGeometries } from "three";
import { Geometry } from "three/examples/jsm/deprecated/Geometry";

@Component({
  data() {
    return {
      // canvasWidth: 800,
      // canvasHeight:600
    };
  }
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  mounted() {
    // this.initCanvas();
    // this.initCanvasTwo();
    // this.initCanvasThree();
    this.initThree();
  }

  initCanvas() {
    //获取canvas元素
    const canvas = document.getElementById("canvasBox") as HTMLCanvasElement;

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    //获取绘制二维上下文
    // const ctx = canvas.getContext("2d") as CanvasRenderingContext2D ;
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "#f1f1f1"; //设置填充色为红色
    // ctx.fillRect(0, 0, canvas.width, canvas.height); //使用填充色填充为矩形
    //顶点着色器程序
    const VSHADER_SOURCE =
      "void main() {" +
      //设置坐标
      "gl_Position = vec4(0.10, 0.20, 0.920, 1.0); " +
      //设置尺寸
      "gl_PointSize = 10.0; " +
      "} ";
    //片元着色器
    const FSHADER_SOURCE =
      "void main() {" +
      //设置颜色
      "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);" +
      "}";
    //获取canvas元素
    //获取绘制二维上下文
    // const gl = canvas.getContext('webgl');
    const gl = canvas.getContext("webgl", { antialias: false, stencil: true });
    if (!gl) {
      console.log("Failed");
      return;
    }
    var vertices = new Float32Array([
      0.0, 0.5,
      -0.5, -0.5,
      0.5, -0.5
    ]);
    var n = 3;

    //编译着色器
    /**
     * 1. 调用gl.createShader().创建一个新的着色器。
     * 2. 调用gl.shaderSource().将源代码发送到着色器。
     * 3. 一旦着色器获取到源代码，就使用gl.compileShader().进行编译。
     */
    const vertShader = gl.createShader(gl.VERTEX_SHADER) as WebGLVertexArrayObject;
    gl.shaderSource(vertShader, VSHADER_SOURCE);
    gl.compileShader(vertShader);
    const fragShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
    gl.shaderSource(fragShader, FSHADER_SOURCE);
    gl.compileShader(fragShader);
    //合并程序
    const shaderProgram = gl.createProgram() as WebGLProgram;
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    //绘制一个点
    gl.drawArrays(gl.POINTS, 0, 11);

  }

  initCanvasTwo() {
    /*================Creating a canvas=================*/
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    const gl = canvas.getContext("webgl") as WebGLRenderingContext;
    // const gl = canvas.getContext("experimental-webgl") as WebGLRenderingContext;

    /*==========Defining and storing the geometry=======*/

    const vertices = [
      -0.5, 0.5, 0.0,
      0.0, 0.5, 0.0,
      -0.25, 0.25, 0.0
    ];

    // Create an empty buffer object to store the vertex buffer
    const vertex_buffer = gl.createBuffer();

    //Bind appropriate array buffer to it
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

    // Pass the vertex data to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Unbind the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    /*=========================Shaders========================*/

    // vertex shader source code
    const vertCode =
      "attribute vec3 coordinates;" +

      "void main(void) {" +
      " gl_Position = vec4(coordinates, 1.0);" +
      "gl_TutorialsSize = 10.0;" +
      "}";

    // Create a vertex shader object
    const vertShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;

    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);

    // Compile the vertex shader
    gl.compileShader(vertShader);

    // fragment shader source code
    const fragCode =
      "void main(void) {" +
      " gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);" +
      "}";

    // Create fragment shader object
    const fragShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;

    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);

    // Compile the fragmentt shader
    gl.compileShader(fragShader);

    // Create a shader program object to store
    // the combined shader program
    const shaderProgram = gl.createProgram() as WebGLProgram;

    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);

    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);

    // Link both programs
    gl.linkProgram(shaderProgram);

    // Use the combined shader program object
    gl.useProgram(shaderProgram);

    /*======== Associating shaders to buffer objects ========*/

    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

    // Get the attribute location
    // const coord = gl.getAttribLocation(shaderProgram, "coordinates") as WebGLContextAttributes;

    // Tutorials an attribute to the currently bound VBO
    // gl.vertexAttribTutorialser(coord, 3, gl.FLOAT, false, 0, 0);

    // Enable the attribute
    // gl.enableVertexAttribArray(coord);

    /*============= Drawing the primitive ===============*/

    // Clear the canvas
    gl.clearColor(0.5, 0.5, 0.5, 0.9);

    // Enable the depth test
    gl.enable(gl.DEPTH_TEST);

    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Set the view port
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Draw the triangle
    gl.drawArrays(gl.POINTS, 0, 3);//原文出自【易百教程】，商业转载请联系作者获得授权，非商业请保留原文链接：https://www.yiibai.com/webgl/webgl_drawing_points.html

  }

  initCanvasThree() {
    const canvas = document.getElementById("canvasBox") as HTMLCanvasElement;

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    const gl = canvas.getContext("webgl") as WebGLRenderingContext;
    /*清空画板上的颜色，并初始化颜色*/
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //设定canvas初始化时候的深度
    gl.clearDepth(1.0);
    //清空画面上的颜色
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //顶点着色器和片段着色器生成
    const v_shader = create_shader("vs");
    const f_shader = create_shader("fs");
    // 程序对象的生成和连接
    const program = create_program(v_shader, f_shader) as WebGLProgram;
    //获取a_Position变量的存储位置
    const a_Position = gl.getAttribLocation(program, "a_Position");

    function create_program(v_shader: WebGLShader | undefined, f_shader: WebGLShader | undefined) {
      var program = gl.createProgram() as WebGLProgram;

      // gl.attachShader(program, v_shader);
      // gl.attachShader(program, f_shader);

      gl.linkProgram(program);
      gl.useProgram(program);
      return program;
    }

    function create_shader(id: string) {
      //用来保存着色器的变量
      let shader;

      //根据id从HTML中获取指定的script标签
      const scriptElement = document.getElementById(id) as HTMLScriptElement;

      //如果指定的script标签不存在，则返回
      if (!scriptElement) {
        undefined;
        return;
      }

      // 判断script标签的type属性
      switch (scriptElement.type) {
        // 顶点着色器的时候
      case "x-shader/x-vertex":
        shader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;//生成顶点着色器
        break;

        // 片段着色器的时候
      case "x-shader/x-fragment":
        shader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;//生成片元着色器
        break;
      default :
        return;
      }

      //将标签中的代码分配给生成的着色器
      gl.shaderSource(shader, scriptElement.text);

      //编译着色器
      gl.compileShader(shader);

      //判断一下着色器是否编译成功
      if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        undefined;

        // 编译成功，则返回着色器
        return shader;
      } else {
        undefined;

        // 编译失败，弹出错误消息
        alert(gl.getShaderInfoLog(shader));
      }
    }
  }

  initThree() {
    const threeObj = {
      camera: null,
      scene: new THREE.Scene(), // 创建场景对象Scene
      renderer: null,
      mesh: null,
      controls: null
    };
    threeObj.scene = new THREE.Scene();
    // console.log(threeObj.scene);
    // 创建容器
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x999999, 1.0);
    const doc = document.getElementById("contentBox") as HTMLHtmlElement;
    doc.appendChild(renderer.domElement);
    // document.body.appendChild(renderer.domElement);
    // 创建相机 PerspectiveCamera：透视摄像机  OrthographicCamera：正交摄像机
    // let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    // // 设置相机位置
    // camera.position.set(0, 0, 100);
    // // 设置相机方向(指向的场景对象)
    // camera.lookAt(0, 0, 0);
    let width = document.body.offsetWidth;
    let height = document.body.offsetHeight;
    // let camera = new THREE.PerspectiveCamera(45, width / height, 1, 500);
    let camera = new THREE.OrthographicCamera(width / -10, width / 10, height / 10, height / -10, 1, 1000);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 1, 0);

    // 创建一个新的场景对象 放置物体、灯光和摄像机
    let scene = new THREE.Scene();
    const color = "#ff0000";
    const colorP = "#0f6fde";
    const colorC = "#16e242";
    // 生成 连线
    // 设置连线颜色
    let material = new THREE.LineBasicMaterial({ color: "#0f6fde" });
    //
    const geometry = new THREE.BufferGeometry();
    const arr: any[] = [];
    const points = [
      [-10.0, -10.0, 0.0],
      [10.0, -10.0, 0.0],
      [10.0, 10.0, 0.0],
      [10.0, 10.0, 0.0],
      [-10.0, 10.0, 0.0],
      [-10.0, -10.0, 0.0]
      // [0,0,0],
      // [10,0,0],
      // [10,10,0],
      // [10,-10,0]
      // [-10, 0, 0],
      // [0, 10, 0],
      // [10, 0, 0],
      // [10, 10, 0],
      // [0, 10, 0],
    ];
    // points.forEach(d => {
    //   const [x, y, z] = d;
    //   // const x = Math.random()*20;
    //   // const y = Math.random()*20;
    //   // const z = 0;
    //   arr.push(x, y, z);
    // });
    const PointsDataStart = []
    // const PointsDataEnd = []
    const NUM = 10000
    for (let i = 0; i < NUM; i++) {
      const x = Math.random() * -200;
      const y = Math.random() * 200;
      const z = 0;
      arr.push(x, y, z);
      PointsDataStart.push(new THREE.Vector3(x, y, 0))
      // PointsDataEnd.push(new THREE.Vector3(Math.random() * 100, Math.random() * 100, 0))
    }
    const vertices = new Float32Array(arr);
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    let line = new THREE.Line(geometry, material);
    // scene.add(line);

    // // 创建一个线段对象Line3
    // let line3 = new THREE.Line3();
    // // 线段起点坐标
    // line3.start = new THREE.Vector3(-10, 0, 0);
    // // 线段终点坐标
    // line3.end = new THREE.Vector3(10, 10, 0);
    console.log(new Date().getTime())
    const dataS = new Date().getTime()
    for (let i = 0; i < NUM; i++) {
      material = new THREE.LineBasicMaterial({ color: this.randomRgbaColor() });
      const points1: any[] = [];
      let num = Math.floor(Math.random() * NUM)
      const start = PointsDataStart[i];
      let end = PointsDataStart[num];
      points1.push(start);
      points1.push(end);
      const geometry1 = new THREE.BufferGeometry().setFromPoints(points1);
      const line1 = new THREE.Line(geometry1, material);
      scene.add(line1);
      const points2: any[] = [];
      points2.push(start);
      num = Math.floor(Math.random() * NUM / 2)
      end = PointsDataStart[num];
      points2.push(end);
      const geometry2 = new THREE.BufferGeometry().setFromPoints(points2);
      const line2 = new THREE.Line(geometry2, material);
      scene.add(line2);
      if(i === NUM - 1){
        console.log(new Date().getTime()- dataS)
      }
    }

    // SphereGeometry  球形三维
    // let sphere_geometry = new THREE.BoxGeometry(2, 2, 2, 1, 1, 1);
    // let sphere_material = new THREE.MeshPhongMaterial();
    let sphere_material = new THREE.PointsMaterial({
      color: colorC,
      size: 10
    });
    // let sphere: any = new THREE.Mesh(sphere_geometry, sphere_material);
    let sphere: any = new THREE.Points(geometry, sphere_material);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    scene.add(sphere);
    // const vertices1 = new Float32Array([10,0,10,-10]);
    // const materialPoint = new THREE.PointsMaterial({ color: colorP });
    // geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices1, 3 ) );
    // let sphere: any = new THREE.Mesh(geometry, materialPoint);
    // scene.add(sphere);
    // let materialC = new THREE.LineBasicMaterial({ color: colorC });
    // const circle = new THREE.Mesh(new THREE.CircleGeometry(1.25, 18, Math.PI / 3, Math.PI / 3 * 6), materialC);
    // scene.add(circle);
    renderer.render(scene, camera);
  }

  randomRgbaColor() { //随机生成RGBA颜色
    var r = Math.floor(Math.random() * 256); //随机生成256以内r值
    var g = Math.floor(Math.random() * 256); //随机生成256以内g值
    var b = Math.floor(Math.random() * 256); //随机生成256以内b值
    // var alpha = Math.random(); //随机生成1以内a值
    var alpha = 1; //随机生成1以内a值
    return `rgba(${r},${g},${b},${alpha})`; //返回rgba(r,g,b,a)格式颜色
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.content-box {
  background: #eee;
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
}
</style>
