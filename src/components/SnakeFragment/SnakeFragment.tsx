import { Mesh, SphereGeometry, MeshBasicMaterial } from "three";
import { SnakeFragmentProps } from "../../utils/types/componentProps";

const SnakeFragment = ({ position, rotation }: SnakeFragmentProps) => {
  const geometry = new SphereGeometry(1);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const mesh = new Mesh(geometry, material);

  mesh.scale.set(1, 1, 1);
  mesh.position.set(position.x, position.y, position.z);

  return mesh;
};

export default SnakeFragment;
