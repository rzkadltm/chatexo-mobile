import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack 
      initialRouteName='index'
      screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signIn" />
      <Stack.Screen name="signUp" />
      <Stack.Screen name="home" />
    </Stack>
  );
}