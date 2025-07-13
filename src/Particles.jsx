import * as THREE from 'three'

export default function Particles({ color }) {
  const particlesCount = 100000
  const spread = 3000 

  // new particles array
  const positions = new Float32Array(particlesCount * 3)
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * spread  // X position
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread  // Y position
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread  // Z position
  }
  
  // create the geometry
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  // Create material
  const material = new THREE.PointsMaterial({
    color: color,
    size: 2,
    sizeAttenuation: true,
  })

  return <points geometry={geometry} material={material} />
}
