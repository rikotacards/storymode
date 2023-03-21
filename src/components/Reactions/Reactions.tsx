import React from "react";
import { Emoji } from "../Emoji/Emoji";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./Reactions.module.css";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import { EmojiCount } from "../EmojiCount/EmojiCount";
import { AddReactionButton } from "../AddReactionButton/AddReactionButton";

const defaultEmojis = ["heart"];

export const Reactions: React.FC = () => {
  return (
    <div className={styles.reactions}>
      <EmojiCount symbol="❤️" label="heart" count={0} />

      <AddReactionButton />
      
    </div>
  );
};
