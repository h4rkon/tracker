// model.ts

export interface Key {
    name: string;
    description: string;
}

export interface SingleValue {
    value: string;
}

export interface Attribute {
    key: Key;
    onDispatch: SingleValue;
    onSubmission: SingleValue;
    onApprovalOrDenial: SingleValue;
}

export interface Group {
    name: string,
    content: Attribute[];
}

export interface Submission {
    content: Group[];
}