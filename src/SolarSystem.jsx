import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import planetData from './PlanetData.js'
import GUI from 'lil-gui'
import * as THREE from 'three'

const orbitScale = 10       // 
const sizeScale = 0.1      // 1000 km = 0.1 units in the scene
const speedScale = 365     // 365 = 1 orbit on earth

export default function SolarSystem() {
  const angleRef = useRef(0)
  const [globalSpeed, setGlobalSpeed] = useState(0.1)
  const planetRefs = useRef({})

  useEffect(() => {
    const gui = new GUI()
    gui.add({ globalSpeed }, 'globalSpeed', 0.1, 10).step(0.1).name('Orbit Speed').onChange(setGlobalSpeed)
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

      {/* draw the lines for orbit*/}
      // 
      {Object.entries(planetData).map(([name, { orbitRadius }]) => {
        const radius = orbitRadius * orbitScale

        // New empty array for adding points
        const points = []
        // Loop 100 times to make a circle
        for (let i = 0; i <= 100; i++) {
          // Divide the circle into 100 even "steps"
          const angle = (i / 100) * Math.PI * 2
          // add the following to our vector
          points.push(new THREE.Vector3(
            radius * Math.cos(angle), // x position
            0,                        // y = 0 because theres no tilt
            radius * Math.sin(angle) // z position
          ))
        }
        // BufferGeometry and use setFromPoints to draw the circle
        const geometry = new THREE.BufferGeometry().setFromPoints(points)

        // render the line
        return (
          <line key={`orbit-${name}`} geometry={geometry}>
            <lineBasicMaterial color="#666666" linewidth={1} />
          </line>
        )
      })}


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
