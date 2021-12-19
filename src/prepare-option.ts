import _ from "lodash";
import path from "path";
import fs from "fs";
import {Collection, Item} from "./Collection";
import {Environment} from "./Environment";
import {CustomNewmanRunOptions} from "./CustomNewman";
import {Api} from "./ApiResult";

const GENERATED_POSTMAN_PATH = path.join(__dirname, "generated_postman");

function ensureGeneratedPathExists() {
    if (!fs.existsSync(GENERATED_POSTMAN_PATH)) {
        fs.mkdirSync(GENERATED_POSTMAN_PATH, {recursive: true});
    }
}

function removeAllStreamRequests(element: Item | Collection) {
    _.remove(element.item, item => item?.request?.header?.some(header => header.value.indexOf("stream") >= 0))
    element.item?.forEach(removeAllStreamRequests)
}

function prepareCollection(collection: Collection, id: string): string {
    const clonedCollection = _.cloneDeep(collection);
    removeAllStreamRequests(clonedCollection);
    const collectionFilePath = path.join(GENERATED_POSTMAN_PATH, `postman_collection${id}.json`);
    fs.writeFileSync(collectionFilePath, JSON.stringify(clonedCollection));
    return collectionFilePath;
}


function prepareEnvironment(environment: Environment, api: Api, id: string): string {
    const coreApi = environment.values.find(v => v.key === "coreApi");
    coreApi.value = api.api;
    const environmentFilePath = path.join(GENERATED_POSTMAN_PATH, `postman_environment${id}.json`);
    fs.writeFileSync(environmentFilePath, JSON.stringify(environment));
    return environmentFilePath;
}


export function prepareOptions(collection: Collection, environment: Environment, apis: Api[]): CustomNewmanRunOptions[] {
    ensureGeneratedPathExists();
    const collectionPath = prepareCollection(collection, "1");
    return apis.map((api, index) => {
        const envPath = prepareEnvironment(environment, api, index.toString(10));
        return {
            api: api.api,
            environment: envPath,
            collection: collectionPath
        } as CustomNewmanRunOptions
    })
}
