import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";

import { ActionsColumn } from "./ActionsColumn";
import { useProducts } from "lib/hooks/useProduct";
import { IProduct } from "lib/utils/commons/interfaces";
declare interface ILisViewProps {
  list: Array<IProduct>;
  onSelectedProduct: () => void;
}
export const ListView = ({
  list,
  onSelectedProduct,
}: ILisViewProps): React.FC => {
  const { deleteProduct } = useProducts();
  const navigate = useNavigate();
  const rows = list.map(
    ({ id, label, reference, quantity, expiration_date }) => ({
      id,
      label,
      reference,
      quantity,
      expiration_date,
    })
  );

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "label", headerName: "Label", width: 130 },
    { field: "reference", headerName: "Reference", width: 130 },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 90,
    },
    {
      field: "expiration_date",
      headerName: "Expiration Date",
      sortable: false,
      width: 160,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 280,
      renderCell: (params) => (
        <ActionsColumn
          params={params}
          onEditRow={(row) => {
            onSelectedProduct(row);
          }}
          onDeleteRow={(row) => deleteProduct(row.id)}
          onViewRow={(id) => navigate(`product/${id}`)}
          row={params.row}
          list
        />
      ),
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};
