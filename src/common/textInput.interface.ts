import { OverridableStringUnion } from '@mui/types';

export class ITextInput{
    public Text? :string = undefined;
    public Variant?:OverridableStringUnion<'text' | 'outlined' | 'contained'> = "contained";
    public OnTextChanged? : (changedText:string)=> any;
}