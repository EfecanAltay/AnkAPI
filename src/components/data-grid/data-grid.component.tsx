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
  DataGridValidationMode,
} from "../../common/data-grid/data-grid-cell.type";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ButtonBase from "@mui/material/ButtonBase";
import {
  DataGridCell,
  DataGridColHeader,
  DataGridRow,
} from "@/common/data-grid/data-grid.classes";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "gray",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AttentionIcon = styled(GppMaybeIcon)(({ theme }) => ({
  position: "absolute",
  color: theme.palette.error.light,
}));

const RemoveIcon = styled(RemoveCircleIcon)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.warning.light,
}));

const RemoveHeaderIcon = styled(RemoveCircleIcon)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.warning.light,
  height: "15px",
  position: "relative",
  top: "-10px",
  right: "-15px",
}));

//#region Mock Data
let colHeader: DataGridColHeader[] = [
  new DataGridColHeader("Header 0", 100, DataGridCellType.Text),
  new DataGridColHeader("Header 1", 100),
  new DataGridColHeader("Header 2", 100),
  new DataGridColHeader("Header 3", 100),
];

let rows: DataGridRow[] = [
  new DataGridRow([
    new DataGridCell("TEST", DataGridCellType.Text, DataGridCellRule.Editable),
    new DataGridCell("", DataGridCellType.Text, DataGridCellRule.Editable),
    new DataGridCell(),
  ]),
  new DataGridRow([
    new DataGridCell(),
    new DataGridCell("TEST2"),
    new DataGridCell(),
  ]),
  new DataGridRow([
    new DataGridCell(),
    new DataGridCell(),
    new DataGridCell("TEST3"),
    new DataGridCell("TEST4"),
  ]),
];
//#endregion

export default function DataGrid(iDataGrid: IDataGrid) {
  const [, forceRender] = React.useState(false);
  const [tableValid, SetTableValid] = React.useState(true);

  function Refresh() {
    forceRender((prev) => !prev);
  }

  function _cellOnClick(col: DataGridCell, inputColRef: any) {
    if (
      iDataGrid.EditRule === DataGridTableRule.Editable &&
      col.Rule === DataGridCellRule.Editable
    ) {
      col.CurrentMode = DataGridCellMode.Edit;
      inputColRef?.focus();
      inputColRef?.select();
      Refresh();
    }
    console.log("click :" + col.Id);
  }

  function _cellOnBlur(col: DataGridCell, inputColRef: any) {
    if (
      iDataGrid.EditRule === DataGridTableRule.Editable &&
      col.Rule === DataGridCellRule.Editable
    ) {
      if (!col.Nullable && (!col.Value || col.Value === ""))
        col.Validation = DataGridValidationMode.Error;
      else {
        col.Validation = DataGridValidationMode.Normal;
        col.CurrentMode = DataGridCellMode.Read;
      }

    } else {
      col.CurrentMode = DataGridCellMode.Read;
    }
    inputColRef?.blur();
    Refresh();
    console.log("on blur :" + col.Id);
  }

  function _textCellOnChanged(col: DataGridCell, event: any) {
    col.Value = event.currentTarget.value.toString();
    if (!col.Nullable) nullValidation(col);
  }

  function nullValidation(col: DataGridCell) {
    if (col.Validation === DataGridValidationMode.Error && col.Value) {
      col.Validation = DataGridValidationMode.Normal;
      SetTableValid(true);
      Refresh();
    } else if (
      col.Validation === DataGridValidationMode.Normal &&
      (!col.Value || col.Value === "")
    ) {
      col.Validation = DataGridValidationMode.Error;
      SetTableValid(false);
      Refresh();
    }
  }

  function RenderColHeader(col: DataGridColHeader, index: number) {
    let renderCell: any;
    col.Id = "h" + index;
    let inputRef: any;
    if (col) {
      switch (col.CurrentMode) {
        case DataGridCellMode.Read:
          renderCell = (
            <Typography
              component="div"
              sx={{ position: "relative", flexGrow: 1 }}
            >
              {col.Value}
            </Typography>
          );
          break;
        case DataGridCellMode.Edit:
          renderCell = (
            <span>
              <TextField
                error={col.Validation === DataGridValidationMode.Error}
                multiline
                className="editCellText"
                variant="standard"
                defaultValue={col.Value}
                inputRef={(input) => inputRef = input}
                onBlur={(event) => {
                  _cellOnBlur(col, inputRef);
                }}
                onChange={(event) => {
                  _textCellOnChanged(col, event);
                }}
              ></TextField>
              { col.Validation === DataGridValidationMode.Error ? (
                <AttentionIcon></AttentionIcon>
              ) : (
                ""
              )}
            </span>
          );
          break;
      }
    } else {
      renderCell = (
        <Typography component="div" sx={{ flexGrow: 1 }}></Typography>
      );
    }

    return (
      <StyledTableCell sx={{ width: col.Width }} key={col.Id} align="left">
        <div
          style={{
            position: "relative",
            height: "0px",
            float: "right",
            zIndex: "99",
          }}
        >
          {
            iDataGrid.EditRule === DataGridTableRule.Editable &&
            iDataGrid.InsertColRule === DataGridTableRule.Editable ? 
            <RemoveHeaderIcon onClick={() => removeCol(col)}></RemoveHeaderIcon>
            : ""
          }
       
        </div>
        {renderCell}
      </StyledTableCell>
    );
  }

  function RenderCell(col: DataGridCell, cellIndex: number) {
    let renderCell: any;
    let inputRef: any;
    if (col) {
      col.Id = "c" + cellIndex;
      // when table is edit mode, changed cell rule as editable
      if (
        iDataGrid.CurrentMode === DataGridTableMode.Edit &&
        (iDataGrid.InsertColRule === DataGridTableRule.Editable ||
          iDataGrid.InsertRowRule === DataGridTableRule.Editable)
      )
        col.Rule = DataGridCellRule.Editable;

      switch (col.Type) {
        case DataGridCellType.Text:
          switch (col.CurrentMode) {
            case DataGridCellMode.Read:
              renderCell = <Typography>{col.Value}</Typography>;
              break;
            case DataGridCellMode.Edit:
              renderCell = (
                <TextField
                  error={col.Validation === DataGridValidationMode.Error}
                  multiline
                  className="editCellText"
                  variant="standard"
                  defaultValue={col.Value}
                  inputRef={(input) => 
                  {
                    if(input)
                    {
                      inputRef = input;
                      input?.focus();
                    }
                  }}
                  onBlur={() => {
                    _cellOnBlur(col,inputRef);
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
        <Typography component="div" sx={{ flexGrow: 1 }}></Typography>
      );
    }

    return (
      <StyledTableCell
        key={col.Id}
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
        <span className="cellStyle">{renderCell}</span>
      </StyledTableCell>
    );
  }

  function RenderRow(row: DataGridRow, rowIndex: number) {
    if (colHeader.length > row.DataGridCol.length) {
      for (
        let index = row.DataGridCol.length;
        index < colHeader.length;
        index++
      ) {
        const col = colHeader[index];
        row.DataGridCol.push(
          new DataGridCell("", col.Type, DataGridCellRule.Editable)
        );
      }
    }

    row.Id = "r" + rowIndex;
    return (
      <TableRow key={row.Id}>
        {
          row.DataGridCol.map((_col, _index) =>
          RenderCell(_col, _index + 1 + (rowIndex - 1) * colHeader.length))
        }
        {
            iDataGrid.InsertRowRule === DataGridTableRule.Editable?
            <StyledTableCell
            key="-1"
            style={{ padding: "12px" }}>
            <RemoveIcon onClick={() => {
              removeRow(row);
            }}>
            </RemoveIcon>
          </StyledTableCell> : ""
        }        
      </TableRow>
    );
  }

  function RenderPlusRow() {
    return (
      <TableRow key="rowPlus">
        <TableCell
          className="addSectionRowButton"
          key="rowPlusChild"
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
            onClick={() => PlusRowAction()}
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
          onClick={() => PlusColAction()}
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
        new DataGridCell(
          "",
          colHeader[index].Type,
          DataGridCellRule.Editable,
          true
        )
      );
    }
    rows.push(new DataGridRow(cols));
    Refresh();
  }

  function addCol() {
    const n_header = new DataGridColHeader("", 100, DataGridCellType.Text);
    n_header.Id = "h" + colHeader.length;
    n_header.Rule = DataGridCellRule.Editable;
    n_header.CurrentMode = DataGridCellMode.Edit;
    n_header.Nullable = false;
    colHeader.push(n_header);
    Refresh();
  }

  function removeCol(col: DataGridColHeader) {
    const removingColIndex = colHeader.indexOf(col);
    colHeader = colHeader.filter((_col) => _col !== col);
    rows.forEach((row) => {
      row.DataGridCol = row.DataGridCol.filter(
        (col) => col !== row.DataGridCol[removingColIndex]
      );
    });
    Refresh();
  }

  function removeRow(row: DataGridRow) {
    rows = rows.filter((_row) => _row !== row);
    Refresh();
  }

  function PlusRowAction() {
    if (tableValid === false) {
      alert("When invalid table, cannot Add Row !");
      return;
    }
    addRow();
  }

  function PlusColAction() {
    if (tableValid === false) {
      alert("When invalid table, cannot Add Col !");
      return;
    }
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
              {colHeader.map((col, _index) => RenderColHeader(col, _index ))}
              {iDataGrid.EditRule === DataGridTableRule.Editable &&
              iDataGrid.CurrentMode === DataGridTableMode.Edit &&
              iDataGrid.InsertColRule === DataGridTableRule.Editable
                ? RenderPlusCol()
                : ""}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, _index) => RenderRow(row, _index + 1))}
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
