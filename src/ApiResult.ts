export interface Api {
    api: string;
}

export interface ApiResult extends Api {
    totalRequests: number;
    totalRun: number;
    averageDuration: number;
    totalRequestFailures: number;
    totalRequestSuccess: number;
}
