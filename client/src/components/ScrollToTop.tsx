import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTops: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Inapeleka ukurasa juu kila njia (path) inapobadilika
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTops;
