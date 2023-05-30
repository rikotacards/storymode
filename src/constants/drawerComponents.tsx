// import { AddLinks } from "@/components/AddLinks/AddLinks";
import { AddLinksNew } from "@/components/AddLinksNew/AddLinksNew";
import { CommentsDrawer } from "@/components/CommentsDrawer/CommentsDrawer";

export const drawerChildren: {[key: string]: any} = {
  linkEditForm: <AddLinksNew/>,
  commentsDrawer: <CommentsDrawer/>
}