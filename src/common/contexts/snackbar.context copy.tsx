import React from "react";
import { ISnackbar } from "../snackbar.interface";
import { SnackbarState } from "./snackbar.state";

export default class SnackbarContextData{
    public ref: React.RefObject<ISnackbar> = React.createRef();
    public state: SnackbarState = new SnackbarState();
 }