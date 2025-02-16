// Airplane.jsx

import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Euler, Quaternion, Matrix4, Vector3 } from 'three';

export const planePosition = new Vector3(0, 3, 7);

export function Airplane({ roll, pitch, yaw }) {
  // thanks to:
  // https://sketchfab.com/3d-models/vintage-toy-airplane-7de2ecbc0acb4b1886c3df3d196c366b
  const { nodes, materials } = useGLTF('assets/models/airplane.glb');
  const groupRef = useRef();
  const helixMeshRef = useRef();

  // Create quaternions for current and target orientations
  const currentQuaternion = useRef(new Quaternion());
  const targetQuaternion = useRef(new Quaternion());

  useFrame(({ camera }) => {
    // Convert roll, pitch, and yaw from degrees to radians
    const rollRad = (roll * Math.PI) / 180;
    const pitchRad = (pitch * Math.PI) / 180;
    const yawRad = (yaw * Math.PI) / 180;

    // Set the target quaternion based on the new roll, pitch, and yaw
    targetQuaternion.current.setFromEuler(new Euler(pitchRad, yawRad, rollRad, 'XYZ'));

    // Interpolate between current and target quaternion
    currentQuaternion.current.slerp(targetQuaternion.current, 0.1); // The 0.1 factor controls the smoothness

    // Apply interpolated quaternion to the airplane
    groupRef.current.quaternion.copy(currentQuaternion.current);

    // Update airplane position
    const matrix = new Matrix4()
      .makeTranslation(planePosition.x, planePosition.y, planePosition.z)
      .multiply(new Matrix4().makeRotationFromQuaternion(currentQuaternion.current));

    groupRef.current.matrixAutoUpdate = false;
    groupRef.current.matrix.copy(matrix);
    groupRef.current.matrixWorldNeedsUpdate = true;

    // Update camera position to follow the airplane
    const cameraMatrix = new Matrix4()
      .makeTranslation(planePosition.x, planePosition.y, planePosition.z)
      .multiply(new Matrix4().makeRotationFromQuaternion(currentQuaternion.current))
      .multiply(new Matrix4().makeRotationX(-0.2))
      .multiply(new Matrix4().makeTranslation(0, 0.015, 0.3));

    camera.matrixAutoUpdate = false;
    camera.matrix.copy(cameraMatrix);
    camera.matrixWorldNeedsUpdate = true;

    // Rotate the propeller
    helixMeshRef.current.rotation.z -= 1.0;
  });

  return (
    <>
      <group ref={groupRef}>
        <group dispose={null} scale={0.02} rotation-y={Math.PI}>
          <mesh geometry={nodes.supports.geometry} material={materials['Material.004']} />
          <mesh geometry={nodes.chassis.geometry} material={materials['Material.005']} />
          <mesh geometry={nodes.helix.geometry} material={materials['Material.005']} ref={helixMeshRef} />
        </group>
      </group>
    </>
  );
}

useGLTF.preload('assets/models/airplane.glb');
