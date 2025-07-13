import * as THREE from 'three'

export default function Particles({ color }) {
  const particlesCount = 25000
  const innerRadius = 450

  const positions = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount; i++) {
    // Make random spherical coordinates
    const radius = innerRadius + Math.random() * 1500 // radius r
    const theta = Math.acos(2 * Math.random() - 1) // Polar angle (θ)
    const phi = 2 * Math.PI * Math.random() // azimuthal angle (φ)

    // spherical coordinates converted into cartesian coodinates
    // Formulas: x = ρsin(φ)cos(θ), y = ρsin(φ)sin(θ), and z = ρcos(φ).
    const x = radius * Math.sin(theta) * Math.cos(phi)
    const y = radius * Math.sin(theta) * Math.sin(phi)
    const z = radius * Math.cos(theta)

    positions[i * 3 + 0] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    color: color,
    size: 2,
    sizeAttenuation: true,
  })

  return <points geometry={geometry} material={material} />
}
