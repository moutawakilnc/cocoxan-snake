import { Plane } from "@react-three/drei";
import { MAP_BORDERS } from "../../utils/constants/Game";

const GameMap = () => {
  const width = MAP_BORDERS.x.end - MAP_BORDERS.x.start;
  const depth = MAP_BORDERS.z.end - MAP_BORDERS.z.start;

  const centerX = (MAP_BORDERS.x.start + MAP_BORDERS.x.end) / 2;
  const centerZ = (MAP_BORDERS.z.start + MAP_BORDERS.z.end) / 2;
  return (
    <Plane
      args={[width, depth]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[centerX, -0.5, centerZ]}>
      <meshStandardMaterial color="green" />
    </Plane>
  );
};

export default GameMap;
