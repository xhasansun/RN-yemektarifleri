import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// SVG İCON
import SvgClock from '../../assets/İcons/Clock';
import SvgCalories from '../../assets/İcons/Calories';
import SvgGoBack from '../../assets/İcons/GoBack';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RecipeDetail = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  const windowHeight = Dimensions.get('window').height;
  const imageHeight = windowHeight * 0.5;

  const handleGoBack = () => {
    navigation.goBack(); // Geriye gitmek için goBack yöntemini kullanıyoruz
  };

  return (
    <View style={styles.container}>
      <Image style={{ height: imageHeight, resizeMode: 'stretch' }} source={{ uri: item.image }} />
      <View style={styles.gobackBtn}>
        <TouchableOpacity onPress={handleGoBack}>
        <SvgGoBack stroke={'#fff'} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.contentArea}>
        <Text style={styles.foodName}>{item.foodName}</Text>
        <View style={styles.foodInfoWrapper}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, }}>
            <SvgClock />
            <Text style={styles.cookingTime}>{item.cookingTime} dakika</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, }}>
            <SvgCalories />
            <Text style={styles.cookingTime}>{item.calori} Kalori</Text>
          </View>
        </View>
        <View style={styles.materialsWrapper}>
          <Text style={styles.title}>Malzemeler</Text>
          {item.materials.map((material, index) => (
            <Text key={index} style={styles.materialText}>{`${index + 1}- ${material}`}</Text>
          ))}
        </View>
        <View style={styles.materialsWrapper}>
          <Text style={styles.title}>Hazırlanışı</Text>
          {item.preparation.map((step, index) => (
            <Text key={index} style={styles.preparationText}>{`${index + 1}- ${step}`}</Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default RecipeDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: -50,
    paddingHorizontal: 30,
  },
  foodName: {
    fontSize: 30,
    fontWeight: '500',
    color: '#545454',
    margin: 10,
    paddingTop: 10,
  },
  foodInfoWrapper: {
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  cookingTime: {
    color: '#C3C3C3',
  },
  calori: {
    color: '#C3C3C3',
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
    color: '#545454',
  },
  materialsWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  materialText: {
    fontSize: 16,
    marginVertical: 3,
    marginHorizontal: 15,
  },
  preparationText: {
    fontSize: 16,
    marginVertical: 3,
    marginHorizontal: 15,
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
