import * as THREE from 'three'
import gsap from "gsap"

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const group = new THREE.Group()
scene.add(group)
group.position.y = 1

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "cyan" })
)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(0.4, 0.4, 0.4),
  new THREE.MeshBasicMaterial({ color: "purple" })
) 

group.add(cube1)
group.add(cube2)
// Position:
// mesh.position.x = 0.6
// mesh.position.y = -0.6
// mesh.position.z = 1.2
cube1.position.set(1.5, -0.5, 0)

// Scale:
cube1.scale.x = 0.3
cube1.scale.y = 0.7

// Axes Helper:
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Rotation
cube1.rotation.reorder("YXZ")
cube1.rotation.y = Math.PI / 3
cube1.rotation.x = Math.PI / 1.3

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.y = 1
camera.position.x = 1
scene.add(camera)

camera.lookAt(cube1.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// ANIMATIONS
const clock = new THREE.Clock()

const tick = () => {
  // const elapsedTime = clock.getElapsedTime()
  // // cube1.rotation.y = elapsedTime * Math.PI
  // cube1.position.x = Math.sin(elapsedTime)
  // cube1.position.z = Math.cos(elapsedTime * Math.PI)
  
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()

gsap.to(cube2.position, {duration: 1, delay: 1, x: 2})
gsap.to(cube2.position, {duration: 1, delay: 2, x: 0})