import { AddReaction } from "@mui/icons-material";
import { Chip } from "@mui/material";
import React from "react";
interface AddReactionButtonProps {
  onClick: () => void;
}

export const AddReactionButton: React.FC<AddReactionButtonProps> = ({
  onClick,
}) => {
  return (
    <Chip
      variant="filled"
      size="small"
      onClick={onClick}
      label={
        <div style={{ display: "flex" }}>
          <AddReaction color="action" fontSize="small" />
        </div>
      }
      clickable
    />
  );
};
