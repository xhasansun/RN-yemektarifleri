import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { db } from '../../../firebase/config';
import { deleteDoc, doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import SvgHearth from '../../assets/İcons/Hearth';
import SvgFavori from '../../assets/İcons/Favori';
import SvgCalories from '../../assets/İcons/Calories';
import SvgClock from '../../assets/İcons/Clock';

const Card = ({ id, foodName, cookingTime, image, isFavorite, onFavoritePress, onFavoriteRemovePress }) => {
  const [isFavorited, setIsFavorited] = useState(isFavorite);
  const uid = useSelector((state) => state.user.uid);

  const handleFavoritePress = () => {
    setIsFavorited(!isFavorited);
    onFavoritePress();
  };

  const handleFavoriteRemovePress = async () => {
    setIsFavorited(!isFavorited);
    await onFavoriteRemovePress();
  };

  const handleFavoriteRemove = async () => {
    try {
      const favoriteRef = doc(db, 'Favoriler', uid);
      await deleteDoc(doc(favoriteRef, 'meals', id)); // Belirli belgeyi Favoriler koleksiyonundan siler
      console.log('Yemek favorilerden çıkarıldı');
    } catch (error) {
      console.log('Favorilerden çıkarma hatası:', error);
    }
  };

  return (
    <View style={styles.cardWrapper}>
      <Image source={{ uri: image }} style={styles.cardImage} />
      <View style={styles.overlay}>
        <Text numberOfLines={2} style={styles.foodName}>{foodName}</Text>
      </View>
      {isFavorited ? (
        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoriteRemovePress}>
          <Text style={styles.favoriteButtonText}>
            <SvgFavori fill={'#0A9A61'} stroke={'#0A9A61'} width={27} height={27} />
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
          <Text style={styles.favoriteButtonText}>
            <SvgFavori fill={'white'} stroke={'white'} width={27} height={27} />
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    position: 'relative',
    marginVertical: 10,
    marginHorizontal: 10,
    height: 210,
    width: 160,
    borderRadius: 5,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    textAlign: 'center',
  },
  
  foodName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    width:'100%'
  },
  favoriteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    top: 0,
    right: 5,
    padding: 7,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  favoriteButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Card;
