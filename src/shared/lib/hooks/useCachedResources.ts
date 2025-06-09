import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                await Font.loadAsync({
                    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
                    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
                    'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
                });
            } catch (e) {
                console.warn(e);
            } finally {
                setLoadingComplete(true);
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}