import React from "react";

import styles from "./Reactions.module.css";
import { EmojiCount } from "../EmojiCount/EmojiCount";
import { AddReactionButton } from "../AddReactionButton/AddReactionButton";
import { EmojiClickData } from "emoji-picker-react";
import { addNewReaction, addNotification, getReactions } from "@/firebase/db";
import { Collapse, Dialog } from "@mui/material";
import { ReactionQuickSelect } from "../ReactionQuickSelect/ReactionQuickSelect";
import { useAuth } from "@/context/AuthContext";
import { Picker } from "../Picker/Picker";
import { useReactionsContext } from "@/context/ReactionsContext";
import { useDrawerContext } from "@/context/DrawerContext";
import { usePostDrawerContext } from "@/context/PostDrawerContext";

interface ReactionsProps {
  postId: string;
  // used for receiving uid
  author: string;
  demoReactions?: ReactionsStateType;
  isDemo?: boolean;
}

export interface ReactionsStateType {
  [key: string]: { count: number; hasLiked: boolean; emoji: string };
}

export const Reactions: React.FC<ReactionsProps> = ({
  isDemo,
  postId,
  author,
  demoReactions,
}) => {
  const displayed = [];
  const drawerContext = usePostDrawerContext();
  const reactionsContext = useReactionsContext();
 
  const onAddReactionButtonClick = () => {
    drawerContext.setComponent("reactionsDrawer");
    drawerContext.setData({ postId, author });
    drawerContext.onOpen();
  };
 
  const heartEmoji = "2764-fe0f"
  for (let key in reactionsContext.displayedReactions) {
    if (
      // We want to always display the heart emoji
      key !== heartEmoji &&
      (!reactionsContext.displayedReactions[key]?.count ||
        !reactionsContext.displayedReactions[key]?.emoji)
    ) {
      continue;
    }

    displayed.push(
      <EmojiCount
        key={key}
        postId={postId}
        symbol={reactionsContext.displayedReactions[key]?.emoji}
        label={key}
        unified={key}
        author={author}
        count={reactionsContext.displayedReactions[key]?.count}
        hasLiked={reactionsContext.displayedReactions[key]?.hasLiked}
      />
    );
  }
  if (demoReactions && Object.keys(demoReactions).length) {
    for (let key in demoReactions) {
      displayed.push(
        <EmojiCount
          key={key}
          postId={postId}
          symbol={demoReactions?.[key]?.emoji}
          label={key}
          unified={key}
          author={author}
          count={demoReactions?.[key]?.count}
          hasLiked={reactionsContext.displayedReactions[key]?.hasLiked}
        />
      );
    }
  }
  return (
    <>
      <div className={styles.reactions}>
        <div className={styles.allEmojis}>{displayed}</div>
        <div className={styles.addReactionButtonContainer}>
          <AddReactionButton onClick={onAddReactionButtonClick} />
        </div>
      </div>
    </>
  );
};
