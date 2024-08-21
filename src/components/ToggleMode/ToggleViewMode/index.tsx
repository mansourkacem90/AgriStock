import * as React from "react";

import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface ToggleColorModeProps {
  mode: string;
  toggleViewMode: (nextView: string) => void;
}

export const ToggleViewMode = ({
  mode,
  toggleViewMode,
}: ToggleColorModeProps) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: string
  ) => {
    toggleViewMode(nextView);
  };

  return (
    <ToggleButtonGroup
      orientation="horizontal"
      value={mode}
      exclusive
      onChange={handleChange}
      sx={{ maxHeight: 40 }}
      color="primary"
    >
      <ToggleButton value="list" aria-label="list">
        <ViewListIcon />
      </ToggleButton>
      <ToggleButton value="module" aria-label="module">
        <ViewModuleIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
