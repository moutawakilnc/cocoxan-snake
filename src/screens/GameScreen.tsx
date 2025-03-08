import { useEffect, useRef, useState, useCallback } from "react";
import { View } from "react-native";
import { GLView } from "expo-gl";
import { Renderer, THREE } from "expo-three";
import { PerspectiveCamera, Scene } from "three";
import SnakeFragment from "../components/SnakeFragment/SnakeFragment";
import Apple from "../components/Apple/Apple";
import { IApple, Position, Snake } from "../utils/types/common";
import { MAP_BORDERS } from "../utils/constants/Game";
import useCollision from "../utils/hooks/useCollision";

const SnakeGame = () => {
  const glRef = useRef(null);
  const [snake, setSnake] = useState<Snake>({
    name: "player",
    positions: [
      { x: 0, y: 0, z: 0 },
      { x: -2, y: 0, z: 0 },
      { x: -4, y: 0, z: 0 },
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

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      setDirection((prev) => {
        if (event.key === "ArrowUp" && prev.y === 0)
          return { x: 0, y: 1, z: 0 };
        if (event.key === "ArrowDown" && prev.y === 0)
          return { x: 0, y: -1, z: 0 };
        if (event.key === "ArrowLeft" && prev.x === 0)
          return { x: -1, y: 0, z: 0 };
        if (event.key === "ArrowRight" && prev.x === 0)
          return { x: 1, y: 0, z: 0 };
        return prev; // Ignore si mouvement invalide
      });
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

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
    directionRef.current = direction; // Toujours mettre à jour la direction actuelle
  }, [direction]);
  const smoothMove = (element: Position, toMove: number) => {
    //imaginons toMove= 0.1
  };
  useEffect(() => {
    const moveSnake = () => {
      setSnake((prev) => {
        const newHead = {
          x:
            prev.positions[0].x < MAP_BORDERS.x.start
              ? MAP_BORDERS.x.end
              : prev.positions[0].x > MAP_BORDERS.x.end
                ? MAP_BORDERS.x.start
                : prev.positions[0].x + directionRef.current.x * 2,
          y:
            prev.positions[0].y < MAP_BORDERS.y.start
              ? MAP_BORDERS.y.end
              : prev.positions[0].y > MAP_BORDERS.y.end
                ? MAP_BORDERS.y.start
                : prev.positions[0].y + directionRef.current.y * 2,
          z: prev.positions[0].z,
        };

        // Déplacer les autres segments pour suivre la tête (le dernier suit le premier)
        const newPositions = [
          newHead,
          ...prev.positions.slice(0, prev.positions.length - 1),
        ];

        return {
          ...prev,
          positions: newPositions,
        };
      });
    };

    const interval = setInterval(moveSnake, 100);
    return () => clearInterval(interval);
  }, [directionRef.current]);

  useEffect(() => {
    for (var i = 0; i < 10000; i++) {}
  }, [directionRef.current]);
  const onContextCreate = async (gl: any) => {
    glRef.current = gl;
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const scene = new Scene();
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(
      -window.innerWidth / 20,
      window.innerWidth / 20,
      window.innerHeight / 20,
      -window.innerHeight / 20,
      0.1,
      1000
    );

    camera.position.set(0, 0, 30); // Positionner la caméra
    camera.lookAt(0, 0, 0); // Déplacer la caméra sur l'axe Z
    camera.lookAt(0, 0, 0); // S'assurer que la caméra regarde vers le centre

    //update ref:

    //ajout des pommes
    Apple({ position: apples[0].position, scene: scene });
    //attribuer le ref a la sceneRef
    sceneRef.current = scene;
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
