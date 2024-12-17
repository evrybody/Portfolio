import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { gsap } from "gsap/gsap-core";

export default function Model({ path, position, isLiftable }) {
  const { scene } = useGLTF(path);
  const [hovered, setHovered] = useState(false);
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current && isLiftable) {
      if (hovered) {
        gsap.to(modelRef.current.position, {
          y: 0,
          duration: 0.5,
        });
      } else {
        gsap.to(modelRef.current.position, {
          y: -3,
          duration: 0.5,
        });
      }
    }
  }, [hovered, isLiftable]);

  return (
    <primitive
      ref={modelRef}
      object={scene}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}
