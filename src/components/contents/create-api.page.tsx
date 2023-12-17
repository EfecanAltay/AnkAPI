"use client";

import * as React from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  TableCell,
  TableRow,
  Tabs,
  TextField,
  styled,
  tableCellClasses,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import DataGrid from "../data-grid/data-grid.component";
import { DataGridCellType, DataGridTableMode, DataGridTableRule } from "../../common/data-grid/data-grid-cell.type";
import { DataGridCell, DataGridColHeader, DataGridRow } from "@/common/data-grid/data-grid.classes";
import { CreateAPIPageData } from "@/common/data/create-api-page.data";

//#region TabPanel

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
//#endregion

//#region Table

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

//#endregion

//#region Create API
let apiReqHeadersCols: DataGridColHeader[] = [
  new DataGridColHeader("Header", 200, DataGridCellType.Text),
  new DataGridColHeader("Value", 500),
];

let apiReqStaticHeaderRows: DataGridRow[] = [
  new DataGridRow([
    new DataGridCell("Content-Type", DataGridCellType.Text),
    new DataGridCell("", DataGridCellType.Text),
  ]),
  new DataGridRow([
    new DataGridCell(),
    new DataGridCell(),
  ]),
  new DataGridRow([
    new DataGridCell(),
    new DataGridCell(),
  ]),
];
//#endregion

export default function UICreateAPIPage(props:{data?: CreateAPIPageData}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [apiType, setAPIType] = React.useState("0");
  const [pageData, setPageData] = React.useState(props.data);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const apiTypeChange = (event: SelectChangeEvent) => {
    setAPIType(event.target.value);
  };

  return (
    <Box
      component={Paper}
      sx={{
        backgroundColor: "white",
        flexGrow: "initial",
        p: 2,
      }} >
      <Grid container spacing={2}>
        <Grid item sm={1} md={1} xs={1}>
          <Select
            value={apiType}
            sx={{ m: 1, width: 1/1 }}
            variant="outlined"
            style={{ backgroundColor:"gray", color:"white"}}
            onChange={apiTypeChange}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={"0"}>GET</MenuItem>
            <MenuItem value={"1"}>POST</MenuItem>
            <MenuItem value={"2"}>PUT</MenuItem>
            <MenuItem value={"3"}>DELETE</MenuItem>
          </Select>
        </Grid>
        <Grid item sm={9} md={10} xs={10}>
          <TextField
            fullWidth
            id="outlined-required"
            label="API Request URL"
            placeholder="https://<api_url>"
            focused
            style={{ marginTop: "10px" }}
          />
        </Grid>
        <Grid item sm={2} md={1} xs={1}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            endIcon={<SendIcon />}
            style={{ marginTop:"10px", height: "75%" }}
          >
            Send
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ padding: 10 }}>
        <Grid item sm={9} md={10} xs={10}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Header" {...a11yProps(0)} />
              <Tab label="Content" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <DataGrid
              EditRule={DataGridTableRule.Editable}
              InsertColRule={DataGridTableRule.Readonly}
              InsertRowRule={DataGridTableRule.Editable}
              CurrentMode={DataGridTableMode.Read} 
              ColHeaders={apiReqHeadersCols}
              Rows={apiReqStaticHeaderRows}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Content
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Grid>
      </Grid>
      <TextField value={pageData}></TextField>
    </Box>
  );
}
