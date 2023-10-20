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
  DataGridTableMode,
  DataGridTableRule,
} from "./data-grid-cell.type";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ButtonBase from "@mui/material/ButtonBase";
import { Block, BorderAll, Padding } from "@mui/icons-material";

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
  public Type: DataGridCellType = DataGridCellType.Text;

  /**
   * DataGridCol
   */
  constructor(
    id: number = 0,
    name: string = "",
    width: number = 100,
    type: DataGridCellType = DataGridCellType.Text
  ) {
    this.Id = id;
    this.Name = name;
    this.Width = width;
    this.Type = type;
  }
}

class DataGridCol {
  public Id: number = 0;
  public Value?: number | string;
  public Type: DataGridCellType = DataGridCellType.Text;
  public Rule: DataGridCellRule = DataGridCellRule.Readonly;
  public CurrentMode: DataGridCellMode = DataGridCellMode.Read;

  /**
   * DataGridCol
   */
  constructor(
    id: number = 0,
    value: number | string = "",
    type: DataGridCellType = DataGridCellType.Text,
    rule: DataGridCellRule = DataGridCellRule.Readonly
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
  public Mode: DataGridCellMode = DataGridCellMode.Read;

  /**
   * DataGridRow
   */
  constructor(
    id: number = 0,
    dataGridCols: DataGridCol[] = [],
    mode: DataGridCellMode = DataGridCellMode.Read
  ) {
    this.Id = id;
    this.DataGridCol = [];
    this.Mode = mode;
    this.DataGridCol = dataGridCols;
  }
}
const colHeader: DataGridColHeader[] = [
  new DataGridColHeader(0, "Header 0", 100, DataGridCellType.Text),
  new DataGridColHeader(1, "Header 1", 100),
  new DataGridColHeader(2, "Header 2", 100),
  new DataGridColHeader(3, "Header 3", 100),
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

  function Refresh() {
    forceRender((prev) => !prev);
  }

  function _cellOnClick(col: DataGridCol, inputColRef: any) {
    if (
      iDataGrid.EditRule === DataGridTableRule.Editable &&
      col.Rule === DataGridCellRule.Editable
    ) {
      col.CurrentMode = DataGridCellMode.Edit;
      Refresh();
      inputColRef?.focus();
    }
  }

  function _cellOnBlur(col: DataGridCol) {
    if (
      iDataGrid.EditRule === DataGridTableRule.Editable &&
      col.Rule === DataGridCellRule.Editable
    ) {
      col.CurrentMode = DataGridCellMode.Read;
      Refresh();
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
            case DataGridCellMode.Read:
              renderCell = <Typography>{col.Value}</Typography>;
              break;
            case DataGridCellMode.Edit:
              renderCell = (
                <TextField
                  multiline
                  className="editCellText"
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
            case DataGridCellMode.Read:
              renderCell = <Typography>{col.Value ? col.Value : 0}</Typography>;
              break;
            case DataGridCellMode.Edit:
              renderCell = <TextField value={col.Value} />;
              break;
          }
          break;
        default:
          switch (col.CurrentMode) {
            case DataGridCellMode.Read:
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
        style={{ padding: "0px" }}
        onClick={() => {
          if (col) _cellOnClick(col, inputRef);
        }}
        className={
          col && col.Rule === DataGridCellRule.Editable
            ? "data-grid-cell editable"
            : "data-grid-cell"
        }
      >
      <span className="cellStyle">
          {renderCell}
        </span>
      </StyledTableCell>
    );
  }

  function RenderRow(row: DataGridRow) {
    return (
      <TableRow key={row.Id}>
        {colHeader.map((_col, _index) => RenderCell(row.DataGridCol[_index]))}
      </TableRow>
    );
  }

  function RenderPlusRow() {
    return (
      <TableRow>
        <TableCell
          className="addSectionRowButton"
          colSpan={
            iDataGrid.InsertRowRule === DataGridTableRule.Editable &&
            iDataGrid.CurrentMode === DataGridTableMode.Edit
              ? colHeader.length + 1
              : colHeader.length
          }
          align="center"
        >
          <ButtonBase
            style={{ width: "100%", height: "100%" }}
            onClick={PlusRowAction}
          >
            <AddIcon></AddIcon>
          </ButtonBase>
        </TableCell>
      </TableRow>
    );
  }

  function RenderPlusCol() {
    return (
      <TableCell className="addSectionColButton" key={-1} align="left">
        <ButtonBase
          style={{ width: "100%", height: "100%" }}
          onClick={PlusColAction}
        >
          <AddIcon></AddIcon>
        </ButtonBase>
      </TableCell>
    );
  }

  function addRow() {
    const cols = [];
    for (let index = 0; index < colHeader.length; index++) {
      cols.push(
        new DataGridCol(
          index,
          "",
          colHeader[index].Type,
          iDataGrid.EditRule === DataGridTableRule.Editable
            ? DataGridCellRule.Editable
            : DataGridCellRule.Readonly
        )
      );
    }
    rows.push(new DataGridRow(rows.length - 1, cols));
    Refresh();
  }

  function addCol() {
    colHeader.push(new DataGridColHeader());
    Refresh();
  }

  function PlusRowAction() {
    addRow();
  }

  function PlusColAction() {
    addCol();
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
              {iDataGrid.EditRule === DataGridTableRule.Editable &&
              iDataGrid.CurrentMode === DataGridTableMode.Edit &&
              iDataGrid.InsertColRule === DataGridTableRule.Editable
                ? RenderPlusCol()
                : ""}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => RenderRow(row))}
            {iDataGrid.EditRule === DataGridTableRule.Editable &&
            iDataGrid.CurrentMode === DataGridTableMode.Edit &&
            iDataGrid.InsertRowRule === DataGridTableRule.Editable
              ? RenderPlusRow()
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
