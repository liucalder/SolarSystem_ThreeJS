import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

extend({ OrbitControls })

export default function SolarSystem() {
  const planet1Ref = useRef()
  const planet2Ref = useRef()
  const angleRef = useRef(0)

  const [speed, setSpeed] = useState(0.5)

  useEffect(() => {
    const gui = new GUI()
    gui.add({ speed }, 'speed', 0.01, 5000000).step(0.01).name('Orbit Speed').onChange(setSpeed)
  }, [])

  useFrame((state, delta) => {
    angleRef.current += delta * speed

    if (planet1Ref.current) {
      const a = 3
      const b = 2
      const t = angleRef.current
      planet1Ref.current.position.x = a * Math.cos(t)
      planet1Ref.current.position.z = b * Math.sin(t)
    }

    if (planet2Ref.current) {
      const a = 6
      const b = 4
      const t = angleRef.current * 0.6
      planet2Ref.current.position.x = a * Math.cos(t)
      planet2Ref.current.position.z = b * Math.sin(t)
    }
  })

  return (
    <>
      // sun
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial emissive={'#ffaa00'} emissiveIntensity={2} color={'#ffcc33'} />
      </mesh>

      // planet 1
      <mesh ref={planet1Ref}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={'#3399ff'} />
      </mesh>

      // planet 2
      <mesh ref={planet2Ref}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={'#66ff66'} />
      </mesh>

      /* lights */
      <pointLight position={[0, 0, 0]} intensity={2} distance={20} />
      <ambientLight intensity={0.2} />
    </>
  )
}
