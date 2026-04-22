import { Stack } from "expo-router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { initDB } from "../src/database/schema";
import { store } from "../src/store";

export default function RootLayout() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </Provider>
  );
}
