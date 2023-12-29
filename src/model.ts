// model.ts

export interface Key {
    name: string;
    description: string;
}

export interface ChangeHistory {
    user: string;
    datetime: Date;
    oldValue: string,
    newValue: string
}

export interface ValueComment {
    user: string;
    datetime: Date;
    comment: string
}

export interface SingleValue {
    value: string;
    history: ChangeHistory[];
    comments: ValueComment[]
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