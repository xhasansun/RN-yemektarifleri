import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import { useDispatch } from 'react-redux';
import { setUserLoggedIn, setUserName, setUid } from '../../reducers/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential && userCredential.user) {
        // console.log('Giriş başarılı', userCredential.user);
        const expirationTime = Date.now() + (5 * 24 * 60 * 60 * 1000); // Login olunca 5 gün geçerlilik süresine sahip token
        await AsyncStorage.setItem('token', 'validToken');
        await AsyncStorage.setItem('expirationTime', expirationTime.toString());
        dispatch(setUserName(userCredential.user.displayName));
        dispatch(setUid(userCredential.user.uid)); // Kullanıcının uid'sini Redux store'a kaydet
        await AsyncStorage.setItem('uid', userCredential.user.uid); // Kullanıcının uid'sini AsyncStorage'e kaydet
        await AsyncStorage.setItem('userName', userCredential.user.displayName); // Kullanıcının adını AsyncStorage'e kaydet
        // console.log('Giriş başarılıxxx', userCredential.user.displayName, userCredential.user.uid);
        dispatch(setUserLoggedIn(true));
      } else {
        console.log('Giriş hatası: Kullanıcı bilgileri alınamadı');
        dispatch(setUserLoggedIn(false));
      }
    } catch (error) {
      console.log('Giriş hatası', error);
      dispatch(setUserLoggedIn(false));
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      if (userCredential && userCredential.user) {
        console.log('Anonim giriş başarılı', userCredential.user);
        dispatch(setUserLoggedIn(true));
        const expirationTime = Date.now() + (365 * 24 * 60 * 60 * 1000); // Login olunca 365 gün geçerlilik süresine sahip token
        await AsyncStorage.setItem('token', 'validToken');
        await AsyncStorage.setItem('expirationTime', expirationTime.toString());
        await AsyncStorage.setItem('userName', 'Anonim'); // Anonim kullanıcının adını AsyncStorage'e kaydet
        await AsyncStorage.setItem('uid', userCredential.user.uid); // Kullanıcının uid'sini AsyncStorage'e kaydet
        dispatch(setUserName('Anonim'));
        dispatch(setUid(userCredential.user.uid)); // Kullanıcının uid'sini Redux store'a kaydet
        console.log('Anonim giriş başarılı', userCredential.user.uid);
      } else {
        console.log('Anonim giriş hatası: Kullanıcı bilgileri alınamadı');
        dispatch(setUserLoggedIn(false));
      }
    } catch (error) {
      console.log('Anonim giriş hatası', error);
      dispatch(setUserLoggedIn(false));
    }
  };


  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const expirationTime = parseInt(await AsyncStorage.getItem('expirationTime'));
        if (token && expirationTime && Date.now() < expirationTime) {
          // Token hala geçerli
          console.log('Kullanıcı oturumu açık', token);
          const userName = await AsyncStorage.getItem('userName'); // Kullanıcının adını AsyncStorage'den al
          const uid = await AsyncStorage.getItem('uid'); // Kullanıcının uid'sini AsyncStorage'den al
          console.log('Kullanıcı oturumu açık', userName, uid);
          dispatch(setUserName(userName)); // Kullanıcının adını güncelle
          dispatch(setUid(uid)); // Kullanıcının uid'sini güncelle
          dispatch(setUserLoggedIn(true));
        } else {
          // Token süresi dolmuş
          console.log('Kullanıcı oturumu kapalı');
          dispatch(setUserLoggedIn(false));
          // Tokeni, expirationTime'ı, kullanıcının adını ve uid'sini temizle
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('expirationTime');
          await AsyncStorage.removeItem('userName');
          await AsyncStorage.removeItem('uid');
        }
      } catch (error) {
        console.log('Token kontrol hatası', error);
      }
    };

    checkUserLoggedIn();
  }, []);

  const goToForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const goToRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="#999"
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPasswordButton} onPress={goToForgotPassword}>
          <Text style={styles.forgotPasswordButtonText}>Şifremi Unuttum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={goToRegister}>
          <Text style={styles.registerButtonText}>Hesap Oluştur</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAnonymousLogin} style={styles.button}>
        <Text style={styles.buttonText}>ANON Giriş yap</Text>
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
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
  loginButton: {
    backgroundColor: '#0A9A61',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    borderColor: '#0A9A61',
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  registerButtonText: {
    color: '#0A9A61',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  forgotPasswordButtonText: {
    color: '#0A9A61',
    fontSize: 14,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 4,
    width: '80%',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default LoginScreen;
