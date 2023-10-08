"use client";
import SnackbarContextData from "@/common/contexts/snackbar.context";

export function ShowInfo(_snackbarContext: SnackbarContextData,  message : string) {
    try{
        if(_snackbarContext)
            _snackbarContext.ref?.current?.ShowInfo(message);
    }
    catch(err){
        console.log(err);
    }
}

export function ShowError(_snackbarContext: SnackbarContextData,  message : string) {
    try{
        if(_snackbarContext)
            _snackbarContext.ref?.current?.ShowError(message);
    }
    catch(err){
        console.log(err);
    }
}