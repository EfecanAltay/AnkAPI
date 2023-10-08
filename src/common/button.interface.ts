import { ButtonPropsVariantOverrides } from "@mui/material";
import { OverridableStringUnion } from '@mui/types';

export class IButton{
    public Text :string = "No Text";
    public Variant?:OverridableStringUnion<'text' | 'outlined' | 'contained'> = "contained";
    public OnAction? : ()=> any;
}