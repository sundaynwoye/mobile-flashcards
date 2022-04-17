import AsyncStorage from '@react-native-async-storage/async-storage';
import { decks } from './_DATA';

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

export const getDecks = async () => {
    try {
        const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

        if (storeResults === null) {
            await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
        }

        return storeResults === null ? decks : JSON.parse(storeResults);
    } catch (e) {
        console.log(e);
    }
}


export const removeDeckAS = async (key) => {
    try {
        const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
        const data = JSON.parse(results);
        data[key] = undefined;
        delete data[key];
        await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.log(e);
    }
}

export const saveDeckAS = async (title) => {
    try {
        await AsyncStorage.mergeItem(
            DECKS_STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    title,
                    questions: []
                }
            })
        );
    } catch (err) {
        console.log(err);
    }
}



