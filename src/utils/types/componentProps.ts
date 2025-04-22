import {
  ButtonType,
  Distance,
  NamedElementInSpace,
  ObjPosition,
  Position,
  Snake,
} from "./common";

export interface IButtonProps {
  title?: string;
  type?: ButtonType;
  imageSrc?: string;
  isImage?: boolean;
  buttonStyle?: any;
  textStyle?: any;
  press?: any;
}

export interface IHeaderProps {}

export interface AppleProp {
  position: any;
  scene?: any;
}

export interface SnakeFragmentProps {
  position: any;
  rotation?: any;
  scale?: number;
  ref?: any;
}

export interface UseCollisionProps {
  snake: Snake;
  setSnake: any;
}

export interface UseSnakeProps extends UseCollisionProps {}

export interface IUseCollisionManagerProps {
  snakeHead: ObjPosition<number>;
  obstacle: NamedElementInSpace<Distance | number, []>;
}

export interface IUseColl {
  objectA: ObjPosition<Distance>;
  objectB: ObjPosition<Distance>;
}
