import { Euler } from "three";
import { ButtonType } from "./common";

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
