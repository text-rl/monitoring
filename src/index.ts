import * as environment from "./postman/FYC.postman_environment.json"
import * as collection from "./postman/FYC.postman_collection.json"
import {Collection} from "./Collection";
import {prepareOptions} from "./prepare-option";
import {Environment} from "./Environment";
import {prepareRun} from "./prepare-run";
import {ApiResult} from "./ApiResult";

const PARALLEL_RUN_COUNT = 20
const apiResults: ApiResult[] = ["http://localhost:5000", "http://localhost:5001", "http://localhost:5002", "http://localhost:5003"].map(api => ({
    api,
    totalRun: 0,
    averageDuration: 0,
    totalRequestFailures: 0,
    totalRequestSuccess: 0,
    totalRequests: 0
}))


const runOptions = prepareOptions(collection as unknown as Collection, environment as unknown as Environment, apiResults);
const runPromises = prepareRun(runOptions, PARALLEL_RUN_COUNT)

Promise.all(runPromises).then(runResults => {
    runResults.forEach(runResult => {
        const apiResult = apiResults.find(api => api.api === runResult.api);
        apiResult.totalRun++;
        apiResult.totalRequests += runResult.run.stats.requests.total
        apiResult.totalRequestSuccess += runResult.run.stats.requests.total - runResult.run.stats.requests.failed;
        apiResult.totalRequestFailures += runResult.run.stats.requests.failed;
        apiResult.averageDuration += (runResult.run as any).timings.responseAverage
        apiResult.averageDuration /= 2;
    })
    apiResults.forEach(result => {
        console.info(result)
    })
})


