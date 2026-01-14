import { useLayoutEffect } from 'react';

const useTitle = (title: string) => {
  useLayoutEffect(() => {
    document.title = title;
  }, [title]);
};

export default useTitle;
