import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 800,
  },
})

export type Column = {
  id: string
  label: string
  minWidth: number
  align: "left" | "right" | "inherit" | "center" | "justify" | undefined
  format?(value: any): string | undefined
}

interface OwnProps {
  columns: Column[]
  rows?: any[] | undefined
}

export const StickyHeadTable: React.FC<OwnProps> = (props) => {
  const { columns, rows } = props

  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography variant="body2">{column.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                      {columns.map((column) => {
                        const value = row[column.id]
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Typography variant="body2">
                              {column.format && typeof value !== "string"
                                ? column.format(value)
                                : value}
                            </Typography>
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
          </TableBody>
        </Table>
      </TableContainer>
      {rows && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  )
}
