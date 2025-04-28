import { useEffect, useRef, useState, useCallback, useContext } from "react";
import { View } from "react-native";
import { GLView } from "expo-gl";
import { Renderer, THREE } from "expo-three";
import { Scene } from "three";
import SnakeFragment from "../components/SnakeFragment/SnakeFragment";
import Apple from "../components/Apple/Apple";
import { DirectionType, Snake } from "../utils/types/common";
import useSnakeMouvement from "../utils/hooks/useSnakeMouvement";
import { GameLogicContext } from "../utils/context/gameLogicContext";
import useCollision from "../utils/hooks/useCollision";
import { mapDirectionToMouvement } from "../utils/hooks/helper";
import { MOUVEMENT_KEY } from "../utils/constants/Game";

const SnakeGame = () => {
  const {
    snake,
    setSnake,
    apples,
    setApples,
    eatenApples,
    setEatenApples,
    gameAnimation,
    gameAnimationControl,
  } = useContext(GameLogicContext);
  const glRef = useRef(null);

  const snakeRefs = useRef<any[]>(new Array());
  const sceneRef = useRef<any>(null);

  const [direction, setDirection] = useState<DirectionType>({
    type: MOUVEMENT_KEY.up,
    coordinates: {
      x: 1,
      y: 0,
      z: 0,
    },
  });
  const rotation = useRef(0);
  const snakeMouvementRef = useRef<number | null>(null);

  useSnakeMouvement();
  useEffect(() => {
    switch (gameAnimation) {
      case "RUNNING":
        gameAnimationControl.start();
        break;
      case "PAUSED":
        gameAnimationControl.pause();
        break;
      default:
        gameAnimationControl.stop();
        break;
    }
  }, [gameAnimation]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    setDirection((prev) => {
      let coordinates = prev.coordinates;
      if (
        (event.key === MOUVEMENT_KEY.up && prev.coordinates.y === 0) ||
        (event.key === MOUVEMENT_KEY.down && prev.coordinates.y === 0) ||
        (event.key === MOUVEMENT_KEY.left && prev.coordinates.x === 0) ||
        (event.key === MOUVEMENT_KEY.right && prev.coordinates.x === 0)
      ) {
        coordinates = mapDirectionToMouvement(event.key).coordinates;
      }
      return { ...prev, coordinates }; // Ignore si mouvement invalide
    });
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  //update 3d mesh
  useEffect(() => {
    //GESTION DES SNAKES
    snake.element.forEach((pos, index, array) => {
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
  }, [snake.element]);

  const onContextCreate = async (gl: any) => {
    glRef.current = gl;
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const scene = new Scene();
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
    Apple({ position: apples[0].element, scene: scene });
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
