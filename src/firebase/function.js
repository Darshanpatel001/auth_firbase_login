import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { firestore } from "./config";

export const getAllData = async () => {
  const allItems = await getDocs(collection(firestore, "product"));
  //   console.log(allItems.docs);
  allItems.docs.map((doc) => console.log(doc.data()));
};

export const saveItem = async (data) => {
  console.log(data);
  return await setDoc(doc(firestore, "product", `${Date.now()}`), data, {
    merge: true,
  });
};