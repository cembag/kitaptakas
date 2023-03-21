import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const root = document.getElementById('root');
    if(root) {
      window.scrollTo(0,0);
      root.scrollTo(0,0);
    }
  }, [pathname]);

  return null
}