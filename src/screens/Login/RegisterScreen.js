import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import { useDispatch } from 'react-redux';
import { setUserLoggedIn, setUserName, setUid } from '../../reducers/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName });
      console.log('Kullanıcı hesabı oluşturuldu ve oturum açıldı!');
      dispatch(setUserLoggedIn(true));
      dispatch(setUserName(displayName)); // Kullanıcının adını güncelle
      dispatch(setUid(user.uid)); // Kullanıcının uid'sini Redux store'a kaydet
      console.log('after register login', displayName, user.uid);

      // Tokeni kaydet
      await AsyncStorage.setItem('token', 'validToken');
      const expirationTime = Date.now() + (5 * 24 * 60 * 60 * 1000);
      await AsyncStorage.setItem('expirationTime', expirationTime.toString());
      await AsyncStorage.setItem('userName', displayName); // Kullanıcının adını AsyncStorage'e kaydet
      await AsyncStorage.setItem('uid', user.uid); // Kullanıcının uid'sini AsyncStorage'e kaydet
    } catch (error) {
      console.log('Kayıt hatası:', error);
    }
  };

  const goBackLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Image style={{ flex: .4, resizeMode: 'center', }} source={require('../../assets/images/logo.png')} />
      <View style={styles.form}>
        {/* <TextInput
            style={styles.input}
            placeholder="İsim"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Numara"
            placeholderTextColor="#999"
            keyboardType="numeric"
          /> */}
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Ad Soyad"
          value={displayName}
          onChangeText={setDisplayName}
        />
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Kayıt Ol</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>Hesabınız var mı?</Text>
        <TouchableOpacity style={styles.loginButton} onPress={goBackLogin}>
          <Text style={styles.loginButtonText}>Giriş Yap</Text>
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
  },
  logo: {
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
  registerButton: {
    backgroundColor: '#0A9A61',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginText: {
    color: '#0A9A61',
    fontSize: 14,
    marginRight: 8,
    textAlign: 'center',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#0A9A61',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    marginLeft: '15%'
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
