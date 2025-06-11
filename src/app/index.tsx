import HomeScreen from '../pages/home/HomeScreen'
import {useCachedResources} from "../shared/lib/hooks/useCachedResources";

export default function Index() {
  const isReady = useCachedResources();

  if (!isReady) return null;
  return <HomeScreen />;
}
