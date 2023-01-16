import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IUser } from "../provider";
import { FC } from "react";
import uuid from "react-uuid";

interface Column {
  id: "name" | "street" | "city" | "country" | "weight" | "lat" | "lng";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Nome", minWidth: 170 },
  { id: "street", label: "Rua", minWidth: 100 },
  {
    id: "city",
    label: "Cidade",
    minWidth: 170,
    align: "right",
  },
  {
    id: "country",
    label: "País",
    minWidth: 170,
    align: "right",
  },
  {
    id: "weight",
    label: "Peso",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },

  {
    id: "lat",
    label: "Lat",
    minWidth: 170,
    align: "right",
  },
  {
    id: "lng",
    label: "Lng",
    minWidth: 170,
    align: "right",
  },
];

interface Data {
  name?: string;
  street?: string;
  city?: string;
  country?: string;
  weight?: string;
  lat?: string;
  lng?: string;
}

function createData(
  name?: string,
  street?: string,
  city?: string,
  country?: string,
  weight?: string,
  lat?: string,
  lng?: string
): Data {
  return { name, street, city, country, weight, lat, lng };
}

let rows = [];
interface UserProps {
  data: IUser[];
}
export const StickyHeadTable: FC<UserProps> = ({ data }) => {
  rows = data.map((item: IUser) =>
    createData(
      item.name,
      item.address?.publicPlace,
      item.address?.city,
      item.address?.country,
      String(item.weight) + "KG",
      item.address?.geolocation.latitude,
      item.address?.geolocation.longitude
    )
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", height: "55vh" }}>
      <TableContainer sx={{ maxHeight: 480 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name + uuid()}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
