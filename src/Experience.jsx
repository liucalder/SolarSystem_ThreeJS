import { useThree, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect } from 'react'
import SolarSystem from './SolarSystem.jsx'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Particles from './Particles.jsx'

extend({ OrbitControls })

export default function Experience() {
  const { camera, gl, scene } = useThree()

  useEffect(() => {
    scene.background = new THREE.Color('#2c2d2d') // lighter black
  }, [scene])

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <SolarSystem />
      <Particles color={0xffcc00} />
    </>
  )
}
