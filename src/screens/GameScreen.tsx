import { useEffect, useRef, useCallback, useContext } from "react";
import { View } from "react-native";
import { GLView } from "expo-gl";
import { Renderer, THREE } from "expo-three";
import { Scene } from "three";
import SnakeFragment from "../components/SnakeFragment/SnakeFragment";
import Apple from "../components/Apple/Apple";
import { GameLogicContext } from "../utils/context/gameLogicContext";
import { mapEventToDirection } from "../utils/hooks/helper";
import { MOUVEMENT_DIRECTION, MOUVEMENT_KEY } from "../utils/constants/Game";

const SnakeGame = () => {
	const { snake, apples, setDirection, gameAnimation, gameAnimationControl } =
		useContext(GameLogicContext);
	const glRef = useRef(null);

	const snakeRefs = useRef<any[]>(new Array());
	const sceneRef = useRef<any>(null);

	const rotation = useRef(0);

	useEffect(() => {
		setDirection({
			type: MOUVEMENT_KEY.arrowUp,
			coordinates: { x: 1, y: 0, z: 0 },
		});
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
	//below is good

	//s'il clique sur un truc, je map l'event a la direction ok...
	const handleKeyPress = useCallback((event: KeyboardEvent) => {
		setDirection((prev?: any) => {
			const eventCasted = mapEventToDirection(event.key);
			//ici j'ai la direction eventCaster, c'un objet du type
			//MOVEMENT_KEY, qui est une enum qui indique le type du mouvement a faire
			let coordinates = prev?.coordinates;
			console.log("test", MOUVEMENT_DIRECTION[eventCasted]);
			if (
				(eventCasted === MOUVEMENT_KEY.arrowUp && prev?.coordinates.y === 0) ||
				(eventCasted === MOUVEMENT_KEY.arrowDown &&
					prev?.coordinates.y === 0) ||
				(eventCasted === MOUVEMENT_KEY.arrowLeft &&
					prev?.coordinates.x === 0) ||
				(eventCasted === MOUVEMENT_KEY.arrowRight && prev?.coordinates.x === 0)
			) {
				//ici je recupere les coordonées du movement a faire, en accedant, a
				//un objet MOUVEMENT_DIRECTION et a la propriété équivalente au
				//MOVEMENT_KEY obtenu au préalable
				coordinates = MOUVEMENT_DIRECTION[eventCasted];
			} else {
				coordinates = MOUVEMENT_DIRECTION["none"];
			}
			console.log("coordinates:", coordinates);
			//ici un objet du genre: MOUVEMENT_KEY(up , down...(lenum genre))
			//et coordinates, cad le mouvement a appliquer
			return { type: eventCasted, coordinates };
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
