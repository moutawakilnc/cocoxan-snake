import { useEffect, useRef, useState, useCallback } from "react";
import { View } from "react-native";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import { PerspectiveCamera, Scene } from "three";
import SnakeFragment from "../components/SnakeFragment/SnakeFragment";
import Apple from "../components/Apple/Apple";
import { IApple, Snake } from "../utils/types/common";

const SnakeGame = () => {
  const glRef = useRef(null);
  const [snake, setSnake] = useState<Snake>({
    name: "player",
    positions: [
      { x: 0, y: 0, z: 0 },
      { x: -0.5, y: 0, z: 0 },
      { x: -1, y: 0, z: 0 },
    ],
  });

  const snakeRefs = useRef<any[]>(new Array());
  const sceneRef = useRef<any>(null);
  const [apples, setApples] = useState<IApple[]>([
    { name: "apple_1", position: { x: 3, y: 0, z: 0 } },
  ]);
  const [direction, setDirection] = useState({ x: 1, y: 0, z: 0 });
  const rotation = useRef(0);
  const directionRef = useRef({ x: 1, y: 0, z: 0 });

  const handleKeyPress = useCallback((event: any) => {
    let newRotation = rotation.current;

    setDirection((prev) => {
      if (event.key === "ArrowUp") {
        rotation.current = Math.PI / 2;
        return { x: 0, y: -1, z: 0 };
      } else if (event.key === "ArrowDown") {
        rotation.current = -Math.PI / 2;
        return { x: 0, y: 1, z: 0 };
      }
      if (event.key === "ArrowLeft") {
        rotation.current = Math.PI;
        return { x: -1, y: 0, z: 0 };
      }
      if (event.key === "ArrowRight") {
        rotation.current = -Math.PI;
        return { x: 1, y: 0, z: 0 };
      }
      return prev;
    });

    rotation.current = newRotation;
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, { once: true });
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  //update 3d mesh
  useEffect(() => {
    //GESTION DES SNAKES
    snake.positions.forEach((pos, index, array) => {
      if (array.length !== snakeRefs.current.length) {
        const snakeMesh = SnakeFragment({
          position: array[array.length - 1],
          rotation: rotation.current,
        });
        snakeRefs.current.push(snakeMesh);
        sceneRef.current.add(snakeMesh);
      }

      snakeRefs.current[index].position.set(pos.x, pos.y, pos.z);
      snakeRefs.current[index].rotation.y = rotation.current;
    });
  }, [snake.positions]);
  useEffect(() => {
    const moveSnake = () => {
      setSnake((prev) => {
        const newHead = {
          x: prev.positions[0].x + directionRef.current.x * 0.1,
          y: prev.positions[0].y + directionRef.current.y * 0.1,
          z: prev.positions[0].z,
        };
        return {
          ...prev,
          positions: [
            newHead,
            ...prev.positions.slice(0, prev.positions.length - 1),
          ],
        };
      });
    };
    const interval = setInterval(moveSnake, 17);
    return () => clearInterval(interval);
  }, [directionRef.current]);

  const onContextCreate = async (gl: any) => {
    glRef.current = gl;
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 30);

    //update ref:

    //ajout des pommes
    Apple({ position: apples[0].position, scene: scene });
    //attribuer le ref a la sceneRef
    sceneRef.current = scene;
    console.log("Scene created:", scene);
    //la fonction qui va s'executer plusieurs fois
    const render = () => {
      renderer.render(scene, camera);
      gl.endFrameEXP();
      requestAnimationFrame(render);
    };
    render();
  };

  return (
    <View style={{ flex: 1 }}>
      <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
    </View>
  );
};

export default SnakeGame;
