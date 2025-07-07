import { useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect } from 'react'
import SolarSystem from './SolarSystem.jsx'

export default function Experience() {
  const { scene } = useThree()

  const texture = useLoader(THREE.TextureLoader, '/pictures/space.jpg')

  useEffect(() => {
    scene.background = texture
  }, [scene, texture])

  return (
    <>
      <SolarSystem />
    </>
  )
}
