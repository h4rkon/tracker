// model.ts

export interface Key {
    name: string;
    description: string;
}

export interface ChangeHistory {
    id: number,
    user: string;
    datetime: string;
    oldValue: string,
    newValue: string
}

export interface ValueComment {
    user: string;
    datetime: string;
    comment: string
}

export interface SingleValue {
    value: string;
    history: ChangeHistory[];
    comments: ValueComment[]
}

export interface Attribute {
    key: Key;
    atDispatch: SingleValue;
    atSubmission: SingleValue;
    atOutcome: SingleValue;
}

export interface Group {
    name: string,
    content: Attribute[];
}

export interface Submission {
    content: Group[];
}