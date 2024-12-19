import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { SpotLight } from "@react-three/drei";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import * as THREE from "three";
import Model from "../Model/Model";

const Lights = () => (
  <>
    <ambientLight intensity={0.4} />
    <directionalLight position={[2, 2, 2]} intensity={1} castShadow />
  </>
);

const Scene = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [textMesh, setTextMesh] = useState(null);
  const fontLoader = useRef(new FontLoader());

  useEffect(() => {
    fontLoader.current.load(
      "https://threejs.org/examples/fonts/gentilis_regular.typeface.json",
      (font) => {
        const textGeometry = new TextGeometry("Konstantin Pisarev", {
          font: font,
          size: 0.3,
          height: 0.03,
          curveSegments: 15,
          bevelEnabled: true,
          bevelThickness: 0.01,
          bevelSize: 0.02,
          bevelSegments: 5,
        });

        const textMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
        });
        const text = new THREE.Mesh(textGeometry, textMaterial);
        text.position.set(-1.5, 5, 0);
        setTextMesh(text);
      }
    );
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(event.clientY / window.innerHeight) * 2 + 1;

      setPosition({
        x: normalizedX * 2,
        y: normalizedY * 2,
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
        {/* <Lights /> */}
        <SpotLight
          position={[position.x * 5, position.y * 2.5, 3]}
          intensity={0.1}
          angle={1}
          penumbra={1}
          color="white"
        />
        <directionalLight
          position={[position.x * 5, position.y * 2.5, 3]}
          intensity={2}
          angle={1}
          penumbra={1}
          color="white"
        />
        <Model path="/models/virgin1.glb" position={[0, -4, 0]} />
        {textMesh && <primitive object={textMesh} />}{" "}
        {/* Добавляем текст в сцену */}
      </Canvas>
    </div>
  );
};

export default Scene;
