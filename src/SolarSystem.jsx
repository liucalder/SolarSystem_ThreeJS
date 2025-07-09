import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import planetData from './PlanetData.js'
import GUI from 'lil-gui'

const orbitScale = 10       // 1 AU = 5 scene units
const sizeScale = 0.1      // 1 (1000km) = 0.1 scene units
const speedScale = 365     // 365 = 1 full orbit for Earth

export default function SolarSystem() {
  const angleRef = useRef(0)
  const [globalSpeed, setGlobalSpeed] = useState(0.1)

  const planetRefs = useRef({})

  useEffect(() => {
    const gui = new GUI()
    gui.add({ globalSpeed }, 'globalSpeed', 0.1, 10).step(0.1).name('Global Speed').onChange(setGlobalSpeed)
  }, [])

  useFrame((state, delta) => {
    angleRef.current += delta * globalSpeed

    Object.entries(planetData).forEach(([name, { orbitRadius, speedMultiplier }]) => {
      const ref = planetRefs.current[name]
      if (ref) {
        const t = (angleRef.current * speedScale) / speedMultiplier
        const radius = orbitRadius * orbitScale
        ref.position.x = radius * Math.cos(t)
        ref.position.z = radius * Math.sin(t)
      }
    })
  })

  return (
    <>
      {/* Sun */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial emissive={'#ffaa00'} emissiveIntensity={2} color={'#ffcc33'} />
      </mesh>

      {/* Planets map*/}
      {Object.entries(planetData).map(([name, { size, color }]) => (
        <mesh
          key={name}
          ref={(ref) => (planetRefs.current[name] = ref)}
        >
          <sphereGeometry args={[size * sizeScale, 32, 32]} />
          <meshStandardMaterial emissive={color} emissiveIntensity={2} color={'#ff0000'}/>
        </mesh>
      ))}

      {/* Lights */}
      <pointLight position={[0, 0, 0]} intensity={2} distance={200} />
      <ambientLight intensity={0.2} />
    </>
  )
}
