
import { useEffect } from 'react';
import { 
    useBooleanState, 
    usePrevious 
} from 'webrix/hooks';

export default function Offline({ children }) {
  const { value: online, setFalse: setOffline, setTrue: setOnline } = useBooleanState(navigator.onLine);
    // const previousOnline = usePrevious(online);

//   useEffect(() => {
//         enableBodyScroll(document.body);
//     }, [online]);

    useEffect(() => {
        window.addEventListener('online', setOnline);
        window.addEventListener('offline', setOffline);

        return () => {
            window.removeEventListener('online', setOnline);
            window.removeEventListener('offline', setOffline);
        };
    }, []);

  return (
     <div>
        {children}
    </div>
  );
}