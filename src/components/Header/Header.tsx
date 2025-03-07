import { StyleSheet, View } from "react-native";
import Button from "../Button/Button";
import { useIntl } from "react-intl";
import { useNavigation } from "@react-navigation/native";
import { NavigationHome, NavigationType } from "../../utils/types/common";
import { StackNavigationProp } from "@react-navigation/stack";

const Header = () => {
  const intl = useIntl();
  const navigation = useNavigation<NavigationHome>();
  return (
    <View
      style={{
        flex: 1,
        height: 80,
        backgroundColor: "blue",
        alignItems: "center",
      }}>
      <Button
        type="flex"
        buttonStyle={styles.button}
        press={() => navigation.navigate("Home")}
        title={intl.formatMessage({ id: "header.backToHome" })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {},
  buttonText: {},
});

export default Header;
