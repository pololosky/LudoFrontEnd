import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { Suspense } from "react";

export const LudoScene = () => {
  return (
    <div className="w-full h-full bg-slate-950">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 15, 10]} fov={50} />
          <OrbitControls
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.1}
            enablePan={false}
          />

          {/* Lumières pour le réalisme */}
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 15, 10]}
            angle={0.3}
            penumbra={1}
            castShadow
          />
          <Environment preset="city" />

          {/* Objets du jeu */}
          {/* <Board />
          <DicePair />
          <PlayersManager /> */}

          <ContactShadows opacity={0.4} scale={20} blur={2.4} far={4.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};
