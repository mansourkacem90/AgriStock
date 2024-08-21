import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { GridCellParams } from "@mui/x-data-grid";

declare interface IActionsColumn {
  row: any;
  onEditRow: () => void;
  onDeleteRow: () => void;
  onViewRow: () => void;
  list?: boolean;
}
export const ActionsColumn = ({
  row,
  onEditRow,
  onDeleteRow,
  onViewRow,
  list,
}: IActionsColumn) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ height: "100%", alignItems: "center" }}
    >
      <Button
        variant="outlined"
        color="success"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onEditRow(row);
        }}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteRow(row);
        }}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      {list && (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => onViewRow(row.id)}
          startIcon={<VisibilityOutlinedIcon />}
        >
          View Details
        </Button>
      )}
    </Stack>
  );
};
export const renderActions = (params: GridCellParams<any, Date>) => (
  <ActionsColumn row={params.row} />
);
