import { useTheme } from "@emotion/react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useState, useReducer, useImperativeHandle } from "react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function BreadCrumbs(props:{path: string}) {
    
    function getBreadcrumbsData(path : string){
        if(path)
        {
            const parts = path.split('/');
            return parts.map((part:string) => 
            (
                <Typography key="1" color="gray">
                    {part}
                </Typography>
            ));
        }
        return null;
    }

    function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    const breadcrumbs = getBreadcrumbsData(props.path);
    
      const breadcrumbs2 = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
          MUI
        </Link>,
        <Link
          underline="hover"
          key="2"
          color="inherit"
          href="/material-ui/getting-started/installation/"
          onClick={handleClick}
        >
          Core
        </Link>,
        <Typography key="3" color="white">
          Breadcrumb
        </Typography>,
      ];
    

    return(
        <Breadcrumbs
            style={{color:'white'}}
            separator={<NavigateNextIcon fontSize="small" style={{color:'gray'}} />}
            aria-label="breadcrumb" >
            {breadcrumbs}
        </Breadcrumbs>
    );
}