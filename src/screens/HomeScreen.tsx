import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { FormattedMessage, useIntl } from "react-intl";

const HomeScreen = ({ navigation }: any) => {
  const intl = useIntl();
  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <Button
        title={intl.formatMessage({ id: "home.play" })}
        onPress={() => navigation.navigate("Game")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
});

export default HomeScreen;
