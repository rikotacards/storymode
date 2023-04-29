import React from 'react';
import { addNewReaction, addNotification, getReactions } from "@/firebase/db";
import { EmojiClickData } from 'emoji-picker-react';
import { useAuth } from '@/context/AuthContext';

interface UseEmojiInfoProps {
  postId: string;
  author: string;
}
interface ReactionsStateType {
  [key: string]: { count: number; hasLiked: boolean; emoji: string };
}

export const useEmojiInfo = ({ postId, author}:UseEmojiInfoProps ) => {
  const [postReactions, setReactions] = React.useState<ReactionsStateType>({});
  const [displayedReactions, setDisplayedReactions] = React.useState<ReactionsStateType>({});
  const auth = useAuth();
  const uid = auth?.user?.uid
  React.useEffect(() => {
    getReactions(postId)
      .then((data) => {
        if (data) {
          setReactions(data);
          setDisplayedReactions(data);
        }
      })
      .catch((e) => {
        // todo
        console.log(e);
      })
      .then(() => {});
  }, [postId]);
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
  const onAddEmojiClick = React.useCallback(
    (unified: EmojiClickData["unified"], emoji: string) => {
      if (displayedReactions[unified] == undefined) {
        addNewReaction({ docId: postId, unified, emoji });
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
    },
    [displayedReactions, postId, updateDisplayedReactions]
  );
  return {
    displayedReactions, 
    onAddEmojiClick,
    updateDisplayedReactions
  }
}