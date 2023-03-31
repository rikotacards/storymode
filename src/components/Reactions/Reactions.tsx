import React from "react";
import styles from "./Reactions.module.css";
import { EmojiCount } from "../EmojiCount/EmojiCount";
import { AddReactionButton } from "../AddReactionButton/AddReactionButton";
import { EmojiClickData } from "emoji-picker-react";
import { addNewReaction, getReactions, updateReaction } from "@/firebase/db";

interface ReactionsProps {
  postId: string;
}

interface ReactionsStateType {
  [key: string]: { count: number; hasLiked: boolean; emoji: string };
}

export const Reactions: React.FC<ReactionsProps> = ({ postId }) => {
  const displayed = [];
  const [postReactions, setReactions] = React.useState<ReactionsStateType>({});
  const [displayedReactions, setDisplayedReactions] =
    React.useState<ReactionsStateType>({});

  React.useEffect(() => {
    getReactions(postId)
      .then((data) => {
        if(data){
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

  const updateDisplayedReactions = React.useCallback((
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
  },[displayedReactions])

  const onAddEmojiClick = React.useCallback(
    (unified: EmojiClickData["unified"], emoji: string) => {
      if (displayedReactions[unified] == undefined) {
        addNewReaction({ docId: postId, unified, emoji });
        // we have this so we don't need to 'get' the data after increment.
        updateDisplayedReactions(unified, 1, emoji);
      }
    
    },
    [ displayedReactions, postId, updateDisplayedReactions]
  );

  for (let key in displayedReactions) {
    if (
      key !== "2764-fe0f" &&
      (displayedReactions[key].count === 0 || !displayedReactions[key].emoji)
    ) {
      continue;
    }
    displayed.push(
      <EmojiCount
        key={key}
        postId={postId}
        symbol={displayedReactions[key].emoji}
        label={key}
        unified={key}
        count={displayedReactions[key].count}
        hasLiked={displayedReactions[key].hasLiked}
      />
    );
  }
  return (
    <div className={styles.reactions}>
      <div className={styles.allEmojis}>{displayed}</div>
      <AddReactionButton onEmojiClick={onAddEmojiClick} />
    </div>
  );
};
