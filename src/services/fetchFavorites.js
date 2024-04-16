import { useDispatch, useSelector } from "react-redux";
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { setUid, setFavoritesList } from "../reducers/userReducer";


const fetchFavorites = () => {
  const uid = useSelector((state) => state.user.uid);
  const dispatch = useDispatch();

  try {
    dispatch(setUid(uid));

    const q = query(collection(db, 'Favoriler', uid, 'favorites'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const favoritesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setFavoritesList(favoritesData));
    });

    return () => unsubscribe();
  } catch (error) {
    console.error("Error fetching favorites: ", error);
  }
}

export default fetchFavorites
