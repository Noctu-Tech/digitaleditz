export enum TaskType {
    START_CHAT="START_CHAT",
    ACTION_MESSAGE="ACTION_MESSAGE",
    PRODUCT_MESSAGE="PRODUCT_MESSAGE",
    END_CHAT="END_CHAT",
}
export enum TaskParamType{
    STRING="STRING",
    PRODUCT="PRODUCT"
}

export interface TaskParam {  
name:string;
type:TaskParamType;
helperText?:string;
required?:boolean;
hideHandle?:boolean;
[key:string]:any;
}

