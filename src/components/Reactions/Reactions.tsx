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
  const reactionsContext = useReactionsContext();
  const [openEmojiPicker, setOpenPicker] = React.useState(false);
  const [openQuick, setOpenQuick] = React.useState(false);
  const auth = useAuth();
  const drawerContext = useDrawerContext();
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

  React.useEffect(() => {
    if (!auth.isLoggedIn) {
      return;
    }
    getReactions(postId)
      .then((data) => {
        if (data) {
          reactionsContext.setDisplayedReactions(data);
        }
      })
      .catch((e) => {
        // todo
        console.log(e);
      })
      .then(() => {});
  }, [postId]);
  const onAddReactionClick = () => {
    drawerContext.setComponent("reactionsDrawer");
    drawerContext.setData({ postId });
    drawerContext.onOpen();
  };
  const onAddEmojiClick = React.useCallback(
    (unified: EmojiClickData["unified"], emoji: string) => {
      if (reactionsContext.displayedReactions[unified] == undefined) {
        addNewReaction({ docId: postId, unified, emoji });
        // we have this so we don't need to 'get' the data after increment.
        reactionsContext.updateDisplayedReactions(unified, 1, emoji);
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
    [
      reactionsContext.displayedReactions,
      postId,
      reactionsContext.updateDisplayedReactions,
    ]
  );

  for (let key in reactionsContext.displayedReactions) {
    if (
      // We want to always display the heart emoji
      key !== "2764-fe0f" &&
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
        <Collapse
          sx={{ position: "absolute", zIndex: 10000 }}
          in={openQuick}
          orientation="horizontal"
        >
          <ReactionQuickSelect
            onEmojiClick={(unified, emoji) => {
              onAddEmojiClick(unified, emoji);
              toggleOpenQuickSelect();
            }}
            openEmojiPicker={() => {
              onClick();
              toggleOpenQuickSelect();
            }}
            onClose={toggleOpenQuickSelect}
          />
        </Collapse>
        <div className={styles.addReactionButtonContainer}>
          <AddReactionButton onClick={onAddReactionClick} />
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
