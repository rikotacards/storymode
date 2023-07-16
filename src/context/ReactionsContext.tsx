import React from "react";
import { EmojiClickData } from "emoji-picker-react";
import { addNewReaction, addNotification, getReactions } from "@/firebase/db";
import { useAuth } from "./AuthContext";
import { useDrawerContext } from "@/context/DrawerContext";
type ReactionsContextType = {
  displayedReactions: ReactionsStateType;
  onAddEmojiClick: (unified: EmojiClickData["unified"], emoji: string) => void;
  setDisplayedReactions: (value: React.SetStateAction<ReactionsStateType>) => void
  updateDisplayedReactions: (
    unified: EmojiClickData["unified"],
    incrementValue: number,
    emoji: string
  ) => void;
}
export const ReactionsContext = React.createContext(
  {} as ReactionsContextType
);
export const useReactionsContext = () => React.useContext(ReactionsContext);

interface ReactionsProviderProps {
  children: React.ReactNode;
  postId: string;
  author: string;
}
interface ReactionsStateType {
  [key: string]: { count: number; hasLiked: boolean; emoji: string };
}

//
export const ReactionsProvider: React.FC<ReactionsProviderProps> = ({
  children,
  postId, 
  author
}) => {
  console.log('reactionProvider')
  const auth = useAuth();
  const uid = auth?.user?.uid
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

  const onAddEmojiClick = 
    (unified: EmojiClickData["unified"], emoji: string) => {
      console.log('WHAT')
      if (displayedReactions[unified] == undefined) {
        addNewReaction({ docId: postId || "", unified, emoji });
        // we have this so we don't need to 'get' the data after increment.
        updateDisplayedReactions(unified, 1, emoji);
        uid &&
          addNotification({
            senderUid: uid,
            receiverUid: author,
            payloadId: 0,
            unified,
            postId,
          });
      }
    }

  React.useEffect(() => {
    console.log('ReactionsContedxt run for', postId)
    
    getReactions(postId || "")
      .then((data) => {
        if (data) {
          setDisplayedReactions(data);
        }
      })
      .catch((e) => {
        // todo
        console.log(e);
      })
      .then(() => {});
  }, [postId]);

  const context = {
    setDisplayedReactions,
    displayedReactions,
    updateDisplayedReactions,
    onAddEmojiClick
  };
  console.log('context', context)
  return (
    <ReactionsContext.Provider value={context}>
      {children}
    </ReactionsContext.Provider>
  );
};
