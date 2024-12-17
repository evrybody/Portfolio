import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, SpotLight } from "@react-three/drei";
import Model from "../Model/Model";

const Lights = () => (
  <>
    <ambientLight intensity={0.4} />
    <directionalLight position={[2, 2, 2]} intensity={1} castShadow />
  </>
);

const Scene = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(event.clientY / window.innerHeight) * 2 + 1;

      setPosition({
        x: normalizedX,
        y: normalizedY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 100 }}>
        <Lights />
        <SpotLight
          position={[position.x * 5, position.y * 2.5, 3]}
          intensity={0.1}
          angle={1}
          penumbra={1}
          color="white"
        />
        <directionalLight
          position={[position.x * 5, position.y * 2.5, 3]}
          intensity={4}
          angle={1}
          penumbra={1}
          color="white"
        />
        <Model path="/models/virgin1.glb" position={[0, -4, 0]} />
        {/* <OrbitControls maxDistance={10} minDistance={2} /> */}
      </Canvas>
    </div>
  );
};

export default Scene;
