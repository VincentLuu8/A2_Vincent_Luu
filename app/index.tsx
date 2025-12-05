import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Button,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LabeledInput from '../components/LabeledInput';

const API_KEY = 'fca_live_hS5LU6W8DHmsfLCmhmj0Mr6fcYbVtDbBJdGzRot0';

const MainScreen: React.FC = () => {
  const [baseCurrency, setBaseCurrency] = useState('CAD');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [amount, setAmount] = useState('1');

  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetOutput = () => {
    setConvertedAmount(null);
    setExchangeRate(null);
  };

  const validateInputs = () => {
    const codeRegex = /^[A-Z]{3}$/;

    const baseTrimmed = baseCurrency.trim().toUpperCase();
    const targetTrimmed = targetCurrency.trim().toUpperCase();

    if (!codeRegex.test(baseTrimmed)) {
      setErrorMessage(
        'Base currency must be a 3-letter uppercase code (for example CAD).'
      );
      return false;
    }

    if (!codeRegex.test(targetTrimmed)) {
      setErrorMessage(
        'Destination currency must be a 3-letter uppercase code.'
      );
      return false;
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMessage('Amount needs to be a positive number.');
      return false;
    }

    // normalise codes
    setBaseCurrency(baseTrimmed);
    setTargetCurrency(targetTrimmed);
    return true;
  };

  const handleConvert = async () => {
    setErrorMessage('');
    resetOutput();

    if (!validateInputs()) {
      return;
    }

    const numericAmount = Number(amount);
    setIsLoading(true);

    try {
      const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${baseCurrency}&currencies=${targetCurrency}`;
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('The API key looks invalid or missing.');
        }
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        }
        throw new Error('The currency service returned an unexpected error.');
      }

      const data = await response.json();

      if (!data || !data.data) {
        throw new Error('Unexpected response from the currency API.');
      }

      const apiRate = data.data[targetCurrency];
      if (!apiRate) {
        throw new Error('Destination currency was not found in the API result.');
      }

      const rate = Number(apiRate);
      const result = numericAmount * rate;

      setExchangeRate(rate);
      setConvertedAmount(result);
    } catch (err: any) {
      console.log('Conversion error:', err);
      setErrorMessage(
        err?.message || 'Something went wrong while fetching exchange rates.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Simple Currency Converter</Text>
          <Text style={styles.subtitle}>
            Choose your currencies, enter an amount, and tap Convert.
          </Text>

          <View style={styles.card}>
            <LabeledInput
              label="Base Currency (e.g. CAD, USD)"
              value={baseCurrency}
              onChangeText={(text) => {
                setBaseCurrency(text);
                resetOutput();
              }}
              placeholder="CAD"
              autoCapitalize="characters"
            />

            <LabeledInput
              label="Destination Currency (e.g. USD, EUR)"
              value={targetCurrency}
              onChangeText={(text) => {
                setTargetCurrency(text);
                resetOutput();
              }}
              placeholder="USD"
              autoCapitalize="characters"
            />

            <LabeledInput
              label="Amount"
              value={amount}
              onChangeText={(text) => {
                setAmount(text);
                resetOutput();
              }}
              placeholder="1"
              keyboardType="numeric"
            />

            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            <View style={styles.buttonRow}>
              <Button
                title={isLoading ? 'Converting...' : 'Convert'}
                onPress={handleConvert}
                disabled={isLoading}
              />
            </View>

            {isLoading && (
              <View style={styles.loadingRow}>
                <ActivityIndicator size="small" />
                <Text style={styles.loadingText}>Getting latest rates…</Text>
              </View>
            )}

            {convertedAmount !== null && exchangeRate !== null && (
              <View style={styles.resultBox}>
                <Text style={styles.resultText}>
                  {amount} {baseCurrency} = {convertedAmount.toFixed(2)} {targetCurrency}
                </Text>
                <Text style={styles.rateText}>
                  Used rate: 1 {baseCurrency} = {exchangeRate.toFixed(4)} {targetCurrency}
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.aboutLink}>
            <Link href="/about">
              <Text style={styles.aboutLinkText}>About this app</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    color: '#555',
  },
  buttonRow: {
    marginTop: 8,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },
  resultBox: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#eaf7ff',
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600',
  },
  rateText: {
    marginTop: 4,
    fontSize: 14,
    color: '#333',
  },
  errorText: {
    marginTop: 8,
    color: '#b00020',
    fontSize: 14,
  },
  aboutLink: {
    marginTop: 16,
    alignSelf: 'center',
  },
  aboutLinkText: {
    color: '#0066cc',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default MainScreen;