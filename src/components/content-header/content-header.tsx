import { ContentHeaderMeta } from "@/common/meta/content-header-meta";
import { useTheme } from "@emotion/react";
import { Breadcrumbs, Typography, Link, InputBase } from "@mui/material";
import { useReducer, useState } from "react";
import "./content-header.css";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export function ContentHeader(chm: ContentHeaderMeta) {
    const theme = useTheme();
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [contentSize, setContentSize] = useState([0, 0]);
    return (
        <div> 
        <Breadcrumbs  separator={<NavigateNextIcon fontSize="small" />} className="breadclumbs" aria-label="breadcrumb">
            <Typography>Breadcrumbs</Typography>
            <input
                type="text"
                className="inputContentPageName"
                placeholder="<PageName>"
                defaultValue={'TEST0'}
            />
        </Breadcrumbs>
        </div>
    );
}  
