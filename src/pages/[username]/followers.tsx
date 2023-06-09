import React from "react";
import { TabPanel } from "@/components/TabPanel/TabPanel";
import { useRouter } from "next/router";
import { useGetUidFromUsername } from "@/hooks/useGetUidFromUsername";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useGetFollowers } from "@/hooks/useGetFollowers";
import { LinearProgressCustom } from "@/components/LinearProgressCustom/LinearProgressCustom";
import { UserRow } from "@/components/UserRow/UserRow";
const Followers: React.FC = () => {
  const route = useRouter();

  const username = route.query.username as string;
  const { data, isLoading } = useGetUidFromUsername(username);

  const { data: followersData } = useGetFollowers(data?.uid || "");
  console.log("star", followersData);
  const userRows = followersData?.map((followerUid) => (
    <UserRow uid={followerUid} />
  ));

  if (isLoading) {
    return <LinearProgressCustom />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <TabPanel value={0} index={0}>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          {userRows}
        </div>
      </TabPanel>
    </div>
  );
};
export default Followers;
