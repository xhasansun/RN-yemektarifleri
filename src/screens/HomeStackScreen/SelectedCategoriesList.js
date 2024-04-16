import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { db } from '../../../firebase/config';
import Card from '../../components/Card/Card';
import SvgGoBack from '../../assets/İcons/GoBack';
import { collection, getDocs, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { setUid } from '../../reducers/userReducer';

const SelectedCategoriesList = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params;
  const uid = useSelector((state) => state.user.uid);

  const recipesData = useSelector((state) => state.user.recipesData);
  const favoritesList = useSelector((state) => state.user.favoritesList);

  const [data, setData] = useState([]);

  useEffect(() => {

    fetchData();
  }, [categoryId, recipesData, favoritesList]);

  const fetchData = async () => {
    try {
      const filteredData = recipesData.filter((item) => item.category === categoryId);
      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const isRecipeFavorite = (recipeId) => {
    return favoritesList.some((favorite) => favorite.id === recipeId);
  };

  const handleFavoritePress = async (item) => {
    try {
      const userFavoritesRef = doc(db, 'Favoriler', uid);
      const userFavoritesSnapshot = await getDoc(userFavoritesRef);

      if (userFavoritesSnapshot.exists()) {
        const userFavoritesData = userFavoritesSnapshot.data();

        // Eğer aynı yemek zaten favorilere eklenmişse işlem yapmayın
        if (userFavoritesData.hasOwnProperty(item.id)) {
          console.log('Bu yemek zaten favorilere eklenmiş.');
          return;
        }

        const mealRef = doc(userFavoritesRef, 'favorites', item.id);
        await setDoc(mealRef, item);
      } else {
        const mealRef = doc(userFavoritesRef, 'favorites', item.id);
        await setDoc(mealRef, item);
      }
    } catch (error) {
      console.log('Favori eklerken hata oluştu:', error);
    }
  };

  const handleFavoriteRemove = async (id) => {
    try {
      const userFavoritesRef = doc(db, 'Favoriler', uid, 'favorites', id);
      const favoriteSnapshot = await getDoc(userFavoritesRef);

      if (favoriteSnapshot.exists()) {
        await deleteDoc(userFavoritesRef);
        // console.log('Yemek favorilerden kaldırıldı.');
      } else {
        // console.log('Bu yemek favorilere eklenmemiş.');
      }
    } catch (error) {
      // console.log('Favori kaldırılırken hata oluştu:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topWrapper}>
        <TouchableOpacity style={styles.backButtonWrapper} onPress={() => navigation.navigate('CategoriesScreen')}>
          <Text style={styles.backButton}> <SvgGoBack stroke={'#0A9A61'} /> </Text>
        </TouchableOpacity>
        <Text style={styles.title}>{categoryName}</Text>
      </View>
      <View style={styles.cardContainer}>
        {data.map((recipe) => (
          <View key={recipe.id} style={styles.cardWrapper}>
            <Card
              id={recipe.id}
              foodName={recipe.foodName}
              cookingTime={recipe.cookingTime}
              image={recipe.image}
              isFavorite={() => isRecipeFavorite(recipe.id)}
              onFavoritePress={() => handleFavoritePress(recipe)}
              onFavoriteRemovePress={() => handleFavoriteRemove(recipe.id)}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  cardWrapper: {
    width: '50%',
    paddingHorizontal: 10,
    borderColor: 'black',
  },
  topWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default SelectedCategoriesList;
