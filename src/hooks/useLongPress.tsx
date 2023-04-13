import { featureFlags } from "@/featureFlags";
import React from "react";
import { MouseEvent, MouseEventHandler } from "react";

export const useLongPress = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isActive, setActive] = React.useState(true);
  const [notMoving, setNotMoving] = React.useState(true);

  let timeoutId: any;
  const onMove = () => {
    setNotMoving(false);
    let timer = setTimeout(() => {
      setNotMoving(true), 10;
    });
  };
  const handlePressStart = (e: MouseEvent) => {
    e.preventDefault();
    //@ts-ignore
      console.log("start");
      if(isOpen){
        return;
      }
      timeoutId = setTimeout(() => {
        console.log("setting open");
        setIsOpen(true);
        setActive(true);
        setPosition({
          //@ts-ignore
          x: e?.page || e?.touches?.[0]?.clientX,
          //@ts-ignore
          y: e?.pageY || e?.touches?.[0]?.clientY,
        });
      }, 280)
    
   ;
  };

  const handlePressEnd = () => {
    console.log("closing");
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
        clearTimeout(timeoutId);
      }, 800);
      return;
    }
    clearTimeout(timeoutId);
    setIsOpen(false);
  };
  return {
    handlePressEnd: featureFlags.enableLongPressMenu ? handlePressEnd : () => {},
    handlePressStart: featureFlags.enableLongPressMenu ? handlePressStart : (e: MouseEvent) => {},
    position,
    isOpen,
    setIsOpen,
  };
};
