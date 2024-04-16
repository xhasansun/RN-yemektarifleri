import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Search from '../components/Search/Search';
import Carousel from '../components/Carousel/Carousel';
import Categories from '../components/Categories/Categories';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLoggedIn, setUid, setFavoritesList, setRecipesData } from '../reducers/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, onSnapshot, getDocs, addDoc, deleteDoc, doc, query, where, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import SvgSetting from '../assets/İcons/Setting';
import SvgUser from '../assets/İcons/User';
import SvgExit from '../assets/İcons/Exit';
import { useNavigation } from '@react-navigation/native';





const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const uid = useSelector((state) => state.user.uid);
  const isLogin = useSelector((state) => state.user.isUserLoggedIn)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigation = useNavigation();




  useEffect(() => {
    if (isLogin) {
      fetchFavorites();
      fetchRecipes();
    }
  }, [isLogin])

  const fetchFavorites = async () => {
    try {
      dispatch(setUid(uid));
      // console.log("uiddd", uid)
      const q = query(collection(db, 'Favoriler', uid, 'favorites'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const favoritesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setFavoritesList(favoritesData));
        console.log("favdata---", favoritesData)
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching favorites: ", error);
    }
  };

  const fetchRecipes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Recipes'));
      const data = querySnapshot.docs.map((doc) => doc.data());
      dispatch(setRecipesData(data));
      // console.log("fffdata", data)
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };


  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      dispatch(setUserLoggedIn(false));
      dispatch(setFavoritesList([])); // Boş dizi olarak güncelle
      dispatch(setRecipesData([])); // Boş dizi olarak güncelle
    } catch (error) {
      console.log('Token silme hatası', error);
    }
  };

  const renderDropdown = () => {
    if (!isDropdownOpen) return null;

    return (
      <TouchableWithoutFeedback onPress={closeDropdown}>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity style={styles.dropdownOption} onPress={handleSignOut}>
            <SvgExit /> 
            <Text style={styles.dropdownOptionText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };


  return (
    <SafeAreaView>
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={styles.userName}>Hoşgeldin {userName} !</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={toggleDropdown}>
            <SvgUser width={35} height={35} />
          </TouchableOpacity>
        </View>
        {renderDropdown()}
      </View>
        <Search />
        <Carousel />
        <Categories />
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    zIndex: 5,
  },
  leftContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightContainer: {
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#0A9A61'
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  dropdownOptionText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
