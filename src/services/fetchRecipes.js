import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const fetchRecipes = async (setData) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Recipes'));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setData(data);
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};

export default fetchRecipes;
