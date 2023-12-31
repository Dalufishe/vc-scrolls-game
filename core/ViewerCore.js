import * as THREE from "three";
import textureViridis from "./textures/cm_viridis.png";
import { FullScreenQuad } from "three/examples/jsm/postprocessing/Pass.js";
import { NRRDLoader } from "three/examples/jsm/loaders/NRRDLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { VolumeMaterial } from "./VolumeMaterial.js";
import firebase from "../utils/firebase";

export default class ViewerCore {
  constructor() {
    this.renderer = null;
    this.scene = null;
    this.camera = null;

    this.volumePass = null;
    this.volumeTex = null;
    this.volumeMeta = null;
    this.volumeTarget = null;
    this.nrrd = null;
    this.clip = null;

    this.render = this.render.bind(this);
    this.canvas = document.querySelector("#test");
    this.inverseBoundsMatrix = new THREE.Matrix4();
    this.cmtextures = {
      viridis: new THREE.TextureLoader().load(textureViridis.src),
    };
  }

  async init() {
    // renderer setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    });
    // this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    // document.body.appendChild(this.renderer.domElement)

    // scene setup
    this.scene = new THREE.Scene();

    // camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      50
    );
    this.camera.position.copy(new THREE.Vector3(0.4, -0.4, -1.0).multiplyScalar(1.5));
    this.camera.up.set(0, -1, 0);
    this.camera.far = 5;
    this.camera.updateProjectionMatrix();

    window.addEventListener(
      "resize",
      () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.render();
      },
      false
    );

    const controls = new OrbitControls(this.camera, this.canvas);
    // const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener("change", this.render);

    // volume pass to render the volume data
    this.volumePass = new FullScreenQuad(new VolumeMaterial());
    this.volumeMeta = await fetch("volume/meta.json").then((res) => res.json());
  }

  async updateID(id) {
    if (this.volumeTex) {
      this.volumeTex.dispose();
    }

    this.volumeTarget = this.volumeMeta.nrrd[id];
    this.clip = this.volumeTarget.clip;
    this.nrrd = this.volumeTarget.shape;

    const matrix = new THREE.Matrix4();
    const center = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    const scaling = new THREE.Vector3();
    const s = 1 / Math.max(this.nrrd.w, this.nrrd.h, this.nrrd.d);

    scaling.set(this.nrrd.w * s, this.nrrd.h * s, this.nrrd.d * s);
    matrix.compose(center, quat, scaling);
    this.inverseBoundsMatrix.copy(matrix).invert();

    // firebase-storage
    const storage = firebase
      .storage()
      .ref("scrolls/"+ this.volumeTarget.id + ".nrrd");

    const nrrdUrl = await storage.getDownloadURL();

    await new NRRDLoader().loadAsync(nrrdUrl).then((volume) => {
      this.volumeTex = new THREE.Data3DTexture(
        volume.data,
        volume.xLength,
        volume.yLength,
        volume.zLength
      );

      this.volumeTex.format = THREE.RedFormat;
      this.volumeTex.type = THREE.FloatType;
      this.volumeTex.minFilter = THREE.LinearFilter;
      this.volumeTex.magFilter = THREE.LinearFilter;
      this.volumeTex.unpackAlignment = 1;
      this.volumeTex.needsUpdate = true;

      const material = this.volumePass.material;
      material.uniforms.voldata.value = this.volumeTex;
      material.uniforms.size.value.set(
        volume.xLength,
        volume.yLength,
        volume.zLength
      );
    });

    this.render();
  }

  render() {
    if (!this.renderer) return;

    this.camera.updateMatrixWorld();

    const texture = this.cmtextures.viridis;
    if (texture) this.volumePass.material.uniforms.cmdata.value = texture;

    this.volumePass.material.uniforms.clim.value.set(0.5, 0.9);
    this.volumePass.material.uniforms.renderstyle.value = 0; // 0: MIP, 1: ISO
    this.volumePass.material.uniforms.renderthreshold.value = 0.15; // For ISO renderstyle
    this.volumePass.material.uniforms.projectionInverse.value.copy(
      this.camera.projectionMatrixInverse
    );
    this.volumePass.material.uniforms.sdfTransformInverse.value
      .copy(new THREE.Matrix4())
      .invert()
      .premultiply(this.inverseBoundsMatrix)
      .multiply(this.camera.matrixWorld);
    this.volumePass.render(this.renderer);
  }
}
