import Header from "@/components/header"
import { Section } from "@/components/section"
import state from "@/components/state"
import { Html, useGLTF } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import NProgress from "nprogress"
import * as React from "react"
import { useInView } from "react-intersection-observer"
import "nprogress/nprogress.css"

const CHAIR_LIME_GREEN = "/armchair_lime_green/scene.gltf"
const CHAIR_OCHRE_YELLOW = "/armchair_ochre_yellow/scene.gltf"
const CHAIR_PEARL_GREY = "/armchair_pearl_grey/scene.gltf"

function Model({ modelPath }: { modelPath: string }) {
  const gltf = useGLTF(modelPath, true)

  return <primitive object={gltf.scene} dispose={null} />
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
      <spotLight position={[1000, 0, 0]} intensity={1} />
    </>
  )
}

interface HTMLContentProps {
  children: React.ReactNode
  modelPath: string
  positionY: number
  domContent: React.MutableRefObject<any>
  bgColor: string
}
function HTMLContent({
  children,
  modelPath,
  positionY,
  domContent,
  bgColor,
}: HTMLContentProps) {
  const ref = React.useRef<any>()
  const [refItem, inView] = useInView({
    threshold: 0,
  })

  useFrame(() => {
    ref.current.rotation.y += 0.01
  })

  React.useEffect(() => {
    inView && (document.body.style.background = bgColor)
  }, [inView, bgColor])

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh position={[0, -35, 0]} ref={ref}>
          <Model modelPath={modelPath} />
        </mesh>
        <Html portal={domContent} fullscreen>
          <div
            ref={refItem}
            className="my-0 mx-auto w-full max-w-full h-full flex items-center justify-center"
          >
            {children}
          </div>
        </Html>
      </group>
    </Section>
  )
}

function Fallback() {
  React.useEffect(() => {
    NProgress.start()

    return () => {
      NProgress.done()
    }
  })
  return null
}

function App() {
  const domContent = React.useRef<any>()
  const scrollArea = React.useRef<any>()

  const onScroll = (event: any) => {
    state.top.current = event.target.scrollTop
  }

  React.useEffect(() => onScroll({ target: scrollArea.current }), [])

  return (
    <>
      <Header />
      <div className="absolute w-screen h-screen top-0 left-0">
        <Canvas camera={{ position: [0, 0, 120], fov: 70 }}>
          <React.Suspense fallback={<Fallback />}>
            <Lights />
            <HTMLContent
              domContent={domContent}
              modelPath={CHAIR_LIME_GREEN}
              positionY={250}
              bgColor="#8cdb70"
            >
              <h1 className="text-6xl font-bold text-center w-full my-0 mx-auto text-white">
                Lime Green Chair
              </h1>
            </HTMLContent>
            <HTMLContent
              domContent={domContent}
              modelPath={CHAIR_OCHRE_YELLOW}
              positionY={0}
              bgColor="#c7b108"
            >
              <h1 className="text-6xl font-bold text-center w-full my-0 mx-auto text-white">
                Ochre Yellow Chair
              </h1>
            </HTMLContent>
            <HTMLContent
              domContent={domContent}
              modelPath={CHAIR_PEARL_GREY}
              positionY={-250}
              bgColor="#636567"
            >
              <h1 className="text-6xl font-bold text-center w-full my-0 mx-auto text-white">
                Pearl Grey Chair
              </h1>
            </HTMLContent>
          </React.Suspense>
        </Canvas>
        <div
          className="absolute top-0 left-0 w-screen h-screen overflow-y-auto overflow-x-hidden scrollbar"
          ref={scrollArea}
          onScroll={onScroll}
        >
          <div className="sticky top-0" ref={domContent}></div>
          <div style={{ height: `${state.sections * 100}vh` }}></div>
        </div>
      </div>
    </>
  )
}

export default App
