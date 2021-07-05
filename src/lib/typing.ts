import { ErrorList, FieldErrorList, Rules, ValidateOption } from "async-validator";

export interface Scenes {
    [key:string]:SceneItem
}

export type ValidateRules = Rules;

export interface DataParams{
    [key:string]:any
}

export type SceneItem = string[]|null|undefined;

export type ConfigOption = ValidateOption;

type CallBackError = {
    errors: ErrorList,
    fields:FieldErrorList
}

export type CallbackData = [
    CallBackError|null,
    boolean
]
