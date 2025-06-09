import { useCachedResources } from '../../shared/lib/hooks/useCachedResources';
import TaskView from '../../pages/task/TaskView';

export default function AddTask() {
    const isReady = useCachedResources();

    if (!isReady) return null;

    return <TaskView />;
}