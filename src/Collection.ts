
export interface Info {
    _postman_id: string;
    name: string;
    schema: string;
}

export interface Header {
    key: string;
    value: string;
    type: string;
}

export interface Raw {
    language: string;
}

export interface Options {
    raw: Raw;
}

export interface Body {
    mode: string;
    raw: string;
    options: Options;
}

export interface Url {
    raw: string;
    host: string[];
    path: string[];
}

export interface Request {
    method: string;
    header: Header[];
    body: Body;
    url: Url;
}

export interface DisabledSystemHeaders {
    accept: boolean;
}

export interface ProtocolProfileBehavior {
    disabledSystemHeaders: DisabledSystemHeaders;
}

export interface Bearer {
    key: string;
    value: string;
    type: string;
}

export interface Auth {
    type: string;
    bearer: Bearer[];
}

export interface Script {
    type: string;
    exec: string[];
}

export interface Event {
    listen: string;
    script: Script;
}

export interface Item {
    name: string;
    item: Item[];
    auth: Auth;
    event: Event[];
    request: Request;
    response: any[];
    protocolProfileBehavior: ProtocolProfileBehavior;
}



export interface Collection {
    info: Info;
    item: Item[];
    event: Event[];
}

