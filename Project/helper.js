"use strict";

//  Adapted from Daniel Rohmer tutorial
//
// 		https://imagecomputing.net/damien.rohmer/teaching/2019_2020/semester_1/MPRI_2-39/practice/threejs/content/000_threejs_tutorial/index.html
//
// 		J. Madeira - April 2021

export const helper = {

    initEmptyScene: function (sceneElements) {

        sceneElements.sceneGraph = new THREE.Scene();

        const width = window.innerWidth;
        const height = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        sceneElements.camera = camera;
        camera.position.set(10, 20, 20);
        camera.lookAt(0, 0, 0);

        const ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 1.0); //mudar esta propriedade para ajustar a luz do dia!!
        sceneElements.sceneGraph.add(ambientLight);

        const spotLight = new THREE.SpotLight('rgb(255, 209, 43)', 0.8);
        spotLight.position.set(200, 8, 0);
        spotLight.target.position.x = 400; 
        spotLight.target.position.z = -400;

        sceneElements.sceneGraph.add(spotLight.target);
        sceneElements.sceneGraph.add(spotLight);

        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;

        spotLight.name = "car_light";

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        sceneElements.renderer = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor('rgb(134, 206, 240)', 1.0);
        renderer.setSize(width, height);

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        sceneElements.orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
        sceneElements.orbitControl.screenSpacePanning = true;
        sceneElements.orbitControl.maxPolarAngle = Math.PI / 2;

        const htmlElement = document.querySelector("#Tag3DScene");
        htmlElement.appendChild(renderer.domElement);

        sceneElements.AxesHelper = new THREE.AxesHelper(5);


    },

    render: function(sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
        sceneElements.orbitControl.target.copy(sceneElements.car.position);
    },
};