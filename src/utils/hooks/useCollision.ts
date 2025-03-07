import { useEffect, useState } from "react";
import { Position } from "../types/common";

const useCollision = (item: Position, items: Position[], tolerance = 0.08) => {
  const [isColliding, setIsColliding] = useState<Boolean>(false);
  const [collisionIndex, setCollisionIndex] = useState<number | null>(null);
  useEffect(() => {
    console.log("item.x:", item.x);
    console.log("position.x:", items[0].x);
  }, []);
  useEffect(() => {
    const checkCollision = () => {
      const index = items.findIndex((position) => {
        return (
          Math.abs(item.x - position.x) < tolerance &&
          Math.abs(item.z - position.z) < tolerance
        );
      });
      if (index !== -1) {
        setIsColliding(true);
        setCollisionIndex(index);
      } else {
        setIsColliding(false);
        setCollisionIndex(null);
      }
    };
    checkCollision();
  }, [item, items, tolerance]);

  return { isColliding, collisionIndex };
};

export default useCollision;
