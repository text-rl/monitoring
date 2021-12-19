export interface Value {
    key: string;
    value: string;
    enabled: boolean;
}

export interface Environment {
    id: string;
    name: string;
    values: Value[];
    _postman_variable_scope: string;
    _postman_exported_at: Date;
    _postman_exported_using: string;
}


