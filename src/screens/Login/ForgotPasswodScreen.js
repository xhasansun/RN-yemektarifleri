import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import SvgGoBack from '../../assets/İcons/GoBack';

const ForgotPasswordScreen = ({ navigation }) => {
  const handleResetPassword = () => {
    // Şifre sıfırlama işlemini burada gerçekleştirin
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.gobackBtn}>
        <TouchableOpacity onPress={goToLogin}>
          <SvgGoBack />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Şifre Sıfırlama</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="E-posta adresinizi girin"
          placeholderTextColor="#999"
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
          <Text style={styles.resetButtonText}>Şifre Sıfırla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A9A61',
    marginBottom: 40,
  },
  form: {
    width: '80%',
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#0A9A61',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gobackBtn: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#876C59',
    opacity: .5,
    top: 60,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ForgotPasswordScreen;
