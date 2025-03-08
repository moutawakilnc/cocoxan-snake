import { useEffect } from "react";
import { Mesh, SphereGeometry, MeshBasicMaterial } from "three";
import { AppleProp } from "../../utils/types/componentProps";

const Apple = ({ position, scene }: AppleProp) => {
  const geometry = new SphereGeometry(1, 32, 32);
  const material = new MeshBasicMaterial({ color: "yellow" });
  const mesh = new Mesh(geometry, material);
  mesh.position.set(position.x, position.y, position.z);
  scene.add(mesh);

  return { mesh, geometry, material };
};

export default Apple;
