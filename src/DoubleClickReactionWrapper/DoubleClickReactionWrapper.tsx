import { DoubleClickReactionPanel } from "@/components/DoubleClickReactionPanel/DoubleClickReactionPanel";
import React from "react";
interface DoubleClickReactionWrapperProps {
  children: React.ReactNode;
  author: string;
  postId: string;
}
export const DoubleClickReactionWrapper: React.FC<
  DoubleClickReactionWrapperProps
> = ({ children, author, postId }) => {
  const [open, setOpen] = React.useState(false);
  const [timerId, setTimerId] = React.useState<NodeJS.Timeout>();
  const handleDoubleClick = () => {
    setOpen(true);
    const timer = setTimeout(() => {
      setOpen(false);
    }, 2000);
    setTimerId(timer);
  };
  const cancelTimer = () => {
    clearTimeout(timerId);
  };
  const close = () => {
    setOpen(false);
  };
  return (
    <div style={{position: 'relative'}} onDoubleClick={handleDoubleClick}>
      <DoubleClickReactionPanel
      author={author}
      postId={postId}
        close={close}
        visible={open}
        cancelTimeout={cancelTimer}
      />
      {children}
    </div>
  );
};
