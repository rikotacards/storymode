import React from "react";
import { EmojiClickData } from "emoji-picker-react";

export const ReactionsContext = React.createContext(
  {} as {
    displayedReactions: ReactionsStateType;
    setDisplayedReactions: React.Dispatch<
      React.SetStateAction<ReactionsStateType>
    >;
    updateDisplayedReactions: (
      unified: EmojiClickData["unified"],
      incrementValue: number,
      emoji: string
    ) => void;
  }
);
export const useReactionsContext = () => React.useContext(ReactionsContext);

interface ReactionsProviderProps {
  children: React.ReactNode;
}
interface ReactionsStateType {
  [key: string]: { count: number; hasLiked: boolean; emoji: string };
}

//
export const ReactionsProvider: React.FC<ReactionsProviderProps> = ({
  children,
}) => {
  const [displayedReactions, setDisplayedReactions] =
    React.useState<ReactionsStateType>({});
  const updateDisplayedReactions = React.useCallback(
    (
      unified: EmojiClickData["unified"],
      incrementValue: number,
      emoji: string
    ) => {
      const newState = {
        ...displayedReactions[unified],
        count: (displayedReactions[unified]?.count || 0) + incrementValue,
        hasLiked: incrementValue == 1,
        emoji,
      };
      setDisplayedReactions((prev) => ({ ...prev, [unified]: newState }));
    },
    [displayedReactions]
  );
  React.useEffect(() => {
  },[displayedReactions])
  const context = {
    setDisplayedReactions,
    displayedReactions,
    updateDisplayedReactions,
  };
  return (
    <ReactionsContext.Provider value={context}>
      {children}
    </ReactionsContext.Provider>
  );
};
