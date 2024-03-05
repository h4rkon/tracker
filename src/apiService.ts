// apiService.ts

import { Submission, ValueComment } from "./model";
import imported from './data.json';


let data: Submission | null = null;

const fetchData = async (): Promise<Submission> => {
    if (!data) {
        data = createData()
    }
    return data
}

const createData = (): Submission => {
    return imported
};

export const getSubmission = (): Promise<Submission> => fetchData();

export const updateCell = async (
    groupIndex: number,
    keyIndex: number,
    column: 'atDispatch' | 'atSubmission' | 'atOutcome',
    newValue: string
): Promise<void> => {
    // Check if data is loaded
    if (!data) {
        throw new Error('Data not loaded');
    }

    // Update the specific cell value
    const group = data.content[groupIndex];
    const attribute = group?.content[keyIndex];

    if (!attribute || !(column in attribute)) {
        throw new Error('Invalid groupIndex, keyIndex, or column');
    }
    attribute[column].value = newValue
};

export const updateComment = async (
    groupIndex: number,
    keyIndex: number,
    column: 'atDispatch' | 'atSubmission' | 'atOutcome',
    newComment: ValueComment
): Promise<void> => {
    if (!data) {
        throw new Error('Data not loaded');
    }
    const group = data.content[groupIndex];
    const attribute = group?.content[keyIndex];
    
    if (!attribute || !(column in attribute)) {
        throw new Error('Invalid groupIndex, keyIndex, or column');
    }
    attribute[column].comments.push(newComment)
}