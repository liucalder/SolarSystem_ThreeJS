import { useLoader, useThree, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect } from 'react'
import SolarSystem from './SolarSystem.jsx'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

extend({ OrbitControls })

export default function Experience() {
  const { camera, gl, scene } = useThree()
  const texture = useLoader(THREE.TextureLoader, '/pictures/space.jpg')

  useEffect(() => {
    scene.background = texture
  }, [scene, texture])

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <SolarSystem />
    </>
  )
}
