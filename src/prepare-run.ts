import {CustomNewmanRunOptions, CustomNewmanRunSummary} from "./CustomNewman";
import newman, {NewmanRunOptions, NewmanRunSummary} from "newman";

export function prepareRun(options: CustomNewmanRunOptions[], runCount: number): Promise<CustomNewmanRunSummary>[] {
    const runPromises: Promise<CustomNewmanRunSummary>[] = []
    options.forEach(option => {
        for (let i = 0; i < runCount; i++) {
            runPromises.push(parallelCollectionRun(option))
        }
    })
    return runPromises;
}

function parallelCollectionRun(options: CustomNewmanRunOptions): Promise<CustomNewmanRunSummary> {
    return new Promise<CustomNewmanRunSummary>(((resolve, reject) => {
        newman.run(options, (err, summary) => {
            if (err) return reject(err)
            resolve({...summary, api: options.api})
        })
    }))
}
