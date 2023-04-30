import React from 'react';
import { addNewReaction, addNotification, getReactions } from "@/firebase/db";
import { EmojiClickData } from 'emoji-picker-react';
import { useAuth } from '@/context/AuthContext';
import { useReactionsContext } from '@/context/ReactionsContext';

interface UseEmojiInfoProps {
  postId: string;
  author: string;
}
export const useEmojiInfo = ({ postId, author}:UseEmojiInfoProps ) => {
  const auth = useAuth();
  const {updateDisplayedReactions, displayedReactions, setDisplayedReactions} = useReactionsContext();
  const uid = auth?.user?.uid
  React.useEffect(() => {
    getReactions(postId)
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

  const onAddEmojiClick = React.useCallback(
    (unified: EmojiClickData["unified"], emoji: string) => {
      console.log('clicker', displayedReactions, unified)

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
    onAddEmojiClick,
  }
}