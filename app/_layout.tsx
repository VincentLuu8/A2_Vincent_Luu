import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{ title: 'Currency Conversion Tool' }}
      />
      <Stack.Screen
        name="about"
        options={{ title: 'About This App' }}
      />
    </Stack>
  );
}