// import { AddLinks } from "@/components/AddLinks/AddLinks";
import { AddLinksNew } from "@/components/AddLinksNew/AddLinksNew";
import { CommentsDrawer } from "@/components/CommentsDrawer/CommentsDrawer";
import { PostMoreDrawer } from "@/components/PostMoreDrawer/PostMoreDrawer";
import { ReactionsDrawer } from "@/components/ReactionDrawer/ReactionDrawer";
import { ShareDrawer } from "@/components/ShareDrawer/ShareDrawer";

export const drawerChildren: { [key: string]: any } = {
  linkEditForm: <AddLinksNew />,
  commentsDrawer: <CommentsDrawer />,
  shareDrawer: <ShareDrawer />,
  postMoreDrawer: <PostMoreDrawer />,
  reactionsDrawer: <ReactionsDrawer />,
};
