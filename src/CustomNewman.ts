import {NewmanRunOptions, NewmanRunSummary} from "newman";
import {Api} from "./ApiResult";

export interface CustomNewmanRunOptions extends NewmanRunOptions, Api {
}

export interface CustomNewmanRunSummary extends NewmanRunSummary, Api {
}
