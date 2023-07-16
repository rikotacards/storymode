import React from "react";

export const useScrollDirection = () => {
  const [prevScrollPos, setPrevScrollPos] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
   
    if ((currentScrollPos > prevScrollPos) && currentScrollPos > 0) {
      setVisible(false)
    } else {
      setVisible(true)
    }

    setPrevScrollPos(currentScrollPos);
  };
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  return {
    isScrollDown: !visible
  };
};
