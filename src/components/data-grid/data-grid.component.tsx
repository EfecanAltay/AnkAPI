import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import "./data-grid.css";
import { IDataGrid } from "./data-grid.interface";
import {
  DataGridCellMode,
  DataGridCellRule,
  DataGridCellType,
  DataGridTableRule,
} from "./data-grid-cell.type";
import React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "gray",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

class DataGridColHeader {
  public Id: number = 0;
  public Name: string = "";
  public Width: number = 100;
}

class DataGridCol {
  public Id: number = 0;
  public Value?: number | string;
  public Type: DataGridCellType = DataGridCellType.Text;
  public Rule: DataGridCellRule = DataGridCellRule.Normal;
  public CurrentMode: DataGridCellMode = DataGridCellMode.Normal;

  /**
   * DataGridCol
   */
  constructor(
    id: number,
    value?: number | string,
    type: DataGridCellType = DataGridCellType.Text,
    rule: DataGridCellRule = DataGridCellRule.Normal
  ) {
    this.Id = id;
    this.Value = value;
    this.Rule = rule;
    this.Type = type;
  }
}

class DataGridRow {
  public Id: number = 0;
  public DataGridCol: DataGridCol[] = [];
  public Mode: DataGridCellMode = DataGridCellMode.Normal;

  /**
   * DataGridRow
   */
  constructor(
    id: number,
    dataGridCols: DataGridCol[] = [],
    mode: DataGridCellMode = DataGridCellMode.Normal
  ) {
    this.Id = id;
    this.DataGridCol = [];
    this.Mode = mode;
    this.DataGridCol = dataGridCols;
  }
}
const colHeader: DataGridColHeader[] = [
  { Id: 0, Name: "Header", Width: 100 },
  { Id: 1, Name: "Header1", Width: 100 },
  { Id: 2, Name: "Header2", Width: 100 },
  { Id: 3, Name: "Header3", Width: 100 },
];

const rows: DataGridRow[] = [
  new DataGridRow(0, [
    new DataGridCol(
      0,
      "TEST",
      DataGridCellType.Text,
      DataGridCellRule.Editable
    ),
    new DataGridCol(1, "", DataGridCellType.Text, DataGridCellRule.Editable),
    new DataGridCol(2),
  ]),
  new DataGridRow(1, [
    new DataGridCol(0),
    new DataGridCol(1, "TEST2"),
    new DataGridCol(2),
  ]),
  new DataGridRow(2, [
    new DataGridCol(0),
    new DataGridCol(1),
    new DataGridCol(2, "TEST3"),
  ]),
];

export default function DataGrid(iDataGrid: IDataGrid) {
  const [, forceRender] = React.useState(false);

  function RenderRow(row: DataGridRow) {
    return (
      <TableRow key={row.Id}>
        {colHeader.map((_col, _index) => RenderCell(row.DataGridCol[_index]))}
      </TableRow>
    );
  }

  function _cellOnClick(col: DataGridCol, inputColRef: any) {
    if (
      iDataGrid.Mode === DataGridTableRule.Editable &&
      col.Rule === DataGridCellRule.Editable
    ) {
      col.CurrentMode = DataGridCellMode.Edit;
      forceRender((prev) => !prev);
      inputColRef?.focus();
    }
  }

  function _cellOnBlur(col: DataGridCol) {
    if (
      iDataGrid.Mode === DataGridTableRule.Editable &&
      col.Rule === DataGridCellRule.Editable
    ) {
      col.CurrentMode = DataGridCellMode.Normal;
      forceRender((prev) => !prev);
    }
  }

  function _textCellOnChanged(col: DataGridCol, event: any) {
    col.Value = event.currentTarget.value.toString();
  }

  function RenderCell(col: DataGridCol) {
    let renderCell: any;
    let cellId: number = 0;
    let inputRef: any;
    if (col) {
      cellId = col.Id;
      switch (col.Type) {
        case DataGridCellType.Text:
          switch (col.CurrentMode) {
            case DataGridCellMode.Normal:
              renderCell = <Typography>{col.Value}</Typography>;
              break;
            case DataGridCellMode.Edit:
              renderCell = (
                <TextField
                  multiline
                  variant="standard"
                  defaultValue={col.Value}
                  inputRef={(input) => input && input.focus()}
                  onBlur={() => {
                    _cellOnBlur(col);
                  }}
                  onChange={(event) => {
                    _textCellOnChanged(col, event);
                  }}
                />
              );
              break;
          }
          break;
        case DataGridCellType.Number:
          switch (col.CurrentMode) {
            case DataGridCellMode.Normal:
              renderCell = <Typography>{col.Value ? col.Value : 0}</Typography>;
              break;
            case DataGridCellMode.Edit:
              renderCell = <TextField value={col.Value} />;
              break;
          }
          break;
        default:
          switch (col.CurrentMode) {
            case DataGridCellMode.Normal:
              renderCell = <Typography>{col.Value}</Typography>;
              break;
            case DataGridCellMode.Edit:
              renderCell = <TextField value={col.Value} />;
              break;
          }
          break;
      }
    } else {
      renderCell = (
        <Typography component="div" sx={{ flexGrow: 1 }}>
          NULL
        </Typography>
      );
    }

    return (
      <StyledTableCell
        key={cellId}
        onClick={() => {
          if(col)
            _cellOnClick(col, inputRef);
        }}
        className={col && col.Rule === DataGridCellRule.Editable ? "data-grid-cell editable": "data-grid-cell"}>
        {renderCell}
      </StyledTableCell>
    );
  }

  return (
    <Paper
      sx={{
        width: "fit-content",
        blockSize: "fit-content",
        overflow: "hidden",
      }}
    >
      <TableContainer>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {colHeader.map((col) => (
                <StyledTableCell
                  sx={{ width: col.Width }}
                  key={col.Id}
                  align="left"
                >
                  {col.Name}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{rows.map((row) => RenderRow(row))}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
