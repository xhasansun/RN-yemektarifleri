import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import Card from '../components/Card/Card';

const Favorites = () => {
  const favoritesList = useSelector((state) => state.user.favoritesList);

  useEffect(() => {
    // console.log("testtt",favoritesList);
  }, [favoritesList]);

  const isRecipeFavorite = (recipeId) => {
    return favoritesList.some((favorite) => favorite.id === recipeId);
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
    <ScrollView>
      {/* <Text>Favori Yemekler</Text> */}
      <View>
        {favoritesList.map((favorite) => (
          <View key={favorite.id} style={styles.cardWrapper}>
          <Card
            id={favorite.id}
            foodName={favorite.foodName}
            cookingTime={favorite.cookingTime}
            image={favorite.image}
            isFavorite={() => isRecipeFavorite(favorite.id)}
            onFavoritePress={() => null}
            onFavoriteRemovePress={() => handleFavoriteRemove(favorite.id)}
          />
        </View>
        ))}
      </View>
    </ScrollView>
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


export default Favorites;
