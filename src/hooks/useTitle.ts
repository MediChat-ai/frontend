import { useEffect } from 'react';

const useTitle = (title: string) => {
  useEffect(() => {
    const previous = document.title;
    document.title = title;

    return () => {
      document.title = previous;
    };
  }, [title]);
};

export default useTitle;
