import React, { useState } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { View } from "react-native";
import { IntlProvider } from "react-intl";
import messages, { Locale } from "./src/utils/locales";
import { StyleSheet } from "react-native";
import LangueSelector from "./src/components/LangueSelector/LangueSelector";
import GameProvider from "./src/utils/provider/GameLogicProvider";

export default function App() {
  const [locale, setLocale] = useState<Locale>("fr");

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <LangueSelector
          locale={locale}
          setLocale={setLocale}
          style={{ ...style.button, ...style.dropDownListLang }}
        />
        <GameProvider>
          <AppNavigator />
        </GameProvider>
      </View>
    </IntlProvider>
  );
}
const style = StyleSheet.create({
  dropDownListLang: { alignSelf: "flex-end", marginRight: 10 },
  button: {
    backgroundColor: "#1E90FF",
    width: 80,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
