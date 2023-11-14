import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
// import gsap from "gsap"

// CANVAS
const canvas = document.querySelector("canvas.webgl")

// SCENE
const scene = new THREE.Scene()

// OBJECT (geometry + material)
const geometry = new THREE.BufferGeometry()

const trianglesCount = 5000
const positionsArray = new Float32Array(trianglesCount * 3 * 3)

for(let i = 0; i < trianglesCount * 3 * 3; i++) {
  positionsArray[i] = Math.random()
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute("position", positionsAttribute)

const material = new THREE.MeshBasicMaterial({ 
  color: "purple",
  wireframe: true
})
const cube = new THREE.Mesh(geometry, material)

cube.rotation.reorder("XYZ")
scene.add(cube)

// CAMERA
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// RESIZE EVENT TO MAINTAIN RATIO AND PIXEL RATIO OF DEVICE:
window.addEventListener("resize", (event) => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera:
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer:
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
})

// DOUBLECLICK GOING FULLSCREEN (handling Safari browse):
window.addEventListener("dblclick", () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullScreenElement
  
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
})

// PERSPECTIVE CAMERA:
const camera = new THREE.PerspectiveCamera(
  /* vertical degrees fiel-of-view (fov) */ 45, 
  /* aspect ratio */ sizes.width / sizes.height, 
  /* near value */ 0.1, 
  /* far value */ 100
)
  
// ORTOGRAPHIC CAMERA:
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(
//   /* left */ -1 * aspectRatio,
//   /* top */ 1 * aspectRatio,
//   /* right */ 1,
//   /* bottom */ -1,
//   /* near value */ 0.1,
//   /* far value */ 100
// )

camera.position.z = 3
// camera.position.y = 2
// camera.position.x = 2

camera.lookAt(cube.position)

scene.add(camera)

// AXES HELPER:
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

// CURSOR:
const cursor = {
  x: 0,
  y: 0
}

// CONTROLS:
const controls = new OrbitControls(camera, canvas)
// controls.target.y = 1
// controls.update()
controls.enableDamping = true

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = - (event.clientY / sizes.height - 0.5)
})

// RENDER
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))

const clock = new THREE.Clock()

const animate = () => {
  // cube.rotation.y = clock.getElapsedTime()

  // Update camera:
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  // camera.position.y = cursor.y * 3
  // camera.lookAt(cube.position)

  controls.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)
}

animate()

// gsap.to(cube.rotation, {repeat: -1, duration: 5, ease: "linear", y: Math.PI})