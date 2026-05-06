import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';

function CarModel() {
  const { scene } = useGLTF('/models/car.glb');

  return (
    <primitive
      object={scene}
      scale={100}
      position={[0, -1, 0]}
      rotation={[0, -0.5, 0]}
    />
  );
}

export default function CarScene() {
  return (
    <div className="h-56 w-full">
      <Canvas camera={{ position: [1, 0.5, 5], fov: 50 }}>
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <CarModel />

        <Environment preset="city" />

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
}