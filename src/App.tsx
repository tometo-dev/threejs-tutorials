import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import * as React from "react"
import * as THREE from "three"

import circleImage from "./assets/circle.png"

const count = 100
const sep = 3

let t = 0
const f = 0.002
const a = 3

const graph = (x: number, z: number) => {
  return Math.sin(f * (x ** 2 + z ** 2 + t)) * a
}

const getInitialPositions = () => {
  const positions = []

  for (let xi = 0; xi < count; xi++) {
    for (let zi = 0; zi < count; zi++) {
      const x = sep * (xi - count / 2)
      const z = sep * (zi - count / 2)
      const y = graph(x, z)
      positions.push(x, y, z)
    }
  }

  return new Float32Array(positions)
}

function Points() {
  const bufferRef = React.useRef<any>()
  const imageTexture = useLoader(THREE.TextureLoader, circleImage)

  const positions = getInitialPositions()

  useFrame(() => {
    if (t >= 10000) {
      t = 0
    }
    t += 15
    const positions = bufferRef.current.array
    let i = 0
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = sep * (xi - count / 2)
        const z = sep * (zi - count / 2)
        positions[i + 1] = graph(x, z)
        i += 3
      }
    }
    bufferRef.current.needsUpdate = true
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          ref={bufferRef}
          attachObject={["attributes", "position"]}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={imageTexture}
        color={0x00aaff}
        size={0.5}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={1}
      />
    </points>
  )
}

function AnimationCanvas() {
  return (
    <Canvas camera={{ position: [100, 10, 0], fov: 75 }}>
      <Points />
    </Canvas>
  )
}

function App() {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black">
      <React.Suspense fallback={<div>Loading...</div>}>
        <AnimationCanvas />
      </React.Suspense>
    </div>
  )
}

export default App
