import React, { SetStateAction } from "react";
import { View, Image, StyleSheet, TextStyle, StyleProp } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Locale } from "../../utils/locales";

interface IProps {
  locale: Locale;
  setLocale: (value: Locale) => void;
  style?: any;
}
const LanguageSelector = ({ locale, setLocale, style = {} }: IProps) => {
  const languages = [
    {
      label: "🇫🇷",
      value: "fr",
    },
    {
      label: "🇬🇧",
      value: "en",
    },
  ];

  return (
    <View style={{ ...styles.container, ...style }}>
      <RNPickerSelect
        onValueChange={(value) => value && setLocale(value)}
        items={languages.map((lang) => ({
          label: lang.label,
          value: lang.value,
          key: lang.value,
        }))}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        placeholder={{ label: "🌍", value: " " }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  flag: { width: 30, height: 20, marginLeft: 10 },
});

const pickerSelectStyles: {
  inputIOS: StyleProp<TextStyle>;
  inputAndroid: StyleProp<TextStyle>;
} = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    color: "black",
    textAlign: "center",
  },
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    color: "black",
    textAlign: "center",
  },
});

export default LanguageSelector;
