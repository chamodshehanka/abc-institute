import { TablePagination } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import React from "react";

export interface TableFooterPaginationProps {
  totalRecordCount: number;
  rowsPerPage: number;
  page: number;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleChangePage: (event: unknown, newPage: number) => void;
}

export function TableFooterPagination<T>({
  totalRecordCount,
  rowsPerPage,
  handleChangeRowsPerPage,
  page,
  handleChangePage,
}: TableFooterPaginationProps) {
  return (
    <TableContainer>
      <div className="card-table-action" style={{ paddingRight: "1rem" }}>
        <TablePagination
          component="div"
          count={totalRecordCount}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10, 20, 50, 100]}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          ActionsComponent={TablePaginationActions}
        />
      </div>
    </TableContainer>
  );
}
