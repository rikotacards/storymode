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

interface ReactionsProps {
  postId: string;
  // used for receiving uid
  author: string;
}

interface ReactionsStateType {
  [key: string]: { count: number; hasLiked: boolean; emoji: string };
}

export const Reactions: React.FC<ReactionsProps> = ({ postId, author }) => {
  const displayed = [];
  const [openEmojiPicker, setOpenPicker] = React.useState(false);
  const [openQuick, setOpenQuick] = React.useState(false);
  const [postReactions, setReactions] = React.useState<ReactionsStateType>({});
  const auth = useAuth();
  const uid = auth?.user?.uid;
  const onClick = () => {
    setOpenPicker(!openEmojiPicker);
  };
  const toggleOpenQuickSelect = () => {
    setOpenQuick(!openQuick);
  };
  const handleClose = () => {
    setOpenPicker(false);
  };
  const [displayedReactions, setDisplayedReactions] =
    React.useState<ReactionsStateType>({});

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
        author={author}
        count={displayedReactions[key].count}
        hasLiked={displayedReactions[key].hasLiked}
      />
    );
  }
  return (
    <>
      <div className={styles.reactions}>
        <div className={styles.allEmojis}>{displayed}</div>
        <Collapse
          sx={{ position: "absolute", zIndex: 1000 }}
          in={openQuick}
          orientation="horizontal"
        >
          <ReactionQuickSelect
            onEmojiClick={(unified, emoji) => {
              onAddEmojiClick(unified, emoji);
              toggleOpenQuickSelect();
            }}
            openEmojiPicker={() => {onClick(); toggleOpenQuickSelect()}}
            onClose={toggleOpenQuickSelect}
          />
        </Collapse>
        <div className={styles.addReactionButtonContainer}>
          <AddReactionButton onClick={toggleOpenQuickSelect} />
        </div>
      </div>
      <Dialog onClose={handleClose} open={openEmojiPicker}>
        <div style={{ display: "flex" }}>
          <Picker
            autoFocusSearch={false}
            onEmojiClick={(d) => {
              console.log(d);
              onAddEmojiClick(d.unified, d.emoji);
              handleClose();
            }}
          />
        </div>
      </Dialog>
    </>
  );
};
