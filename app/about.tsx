import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AboutScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>Vincent Luu</Text>
      <Text style={styles.idText}>Student ID: 101239401</Text>

      <View style={styles.separator} />

      <Text style={styles.heading}>About the App</Text>
      <Text style={styles.bodyText}>
        This app allows the user to convert X amount of any currency into another
        currency using live exchange rates from https://freecurrencyapi.com/
      </Text>
      <Text style={styles.bodyText}>
        You can enter a base currency (Ex.  CAD or USD), followed by a destination
        currency, and then the amount you want to convert. The app checks the input,
        sends a request to the API, and then shows the converted amount together
        with the live exchange rate used.
      </Text>
      <Text style={styles.bodyText}>
        The project is built with Expo and React Native and uses a simple stack
        navigation setup with a main screen and this About screen.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  nameText: {
    fontSize: 22,
    fontWeight: '700',
  },
  idText: {
    fontSize: 16,
    marginTop: 4,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default AboutScreen;