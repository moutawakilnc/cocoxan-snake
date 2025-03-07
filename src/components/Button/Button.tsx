import {
  Button as ButtonNative,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { IButtonProps } from "../../utils/types/componentProps";

const Button = ({
  title,
  type = "flex",
  buttonStyle,
  textStyle,
  imageSrc,
  isImage = false,
  press = () => {},
}: IButtonProps) => {
  let toReturn = null;

  switch (type) {
    case "flex":
      toReturn = (
        <TouchableOpacity
          onPress={press}
          style={{ ...styles.button, ...buttonStyle }}>
          {isImage ? (
            <Image src={imageSrc} />
          ) : (
            <Text style={{ ...styles.textStyle, ...textStyle }}>{title}</Text>
          )}
        </TouchableOpacity>
      );
      break;
    case "native":
      toReturn = <ButtonNative title={title ?? ""}></ButtonNative>;
      break;
  }

  return toReturn;
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    backgroundColor: "yellow",
  },
  textStyle: {
    textAlign: "center",
  },
});

export default Button;
