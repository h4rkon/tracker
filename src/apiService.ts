// apiService.ts

import { create } from "domain";
import { Submission, Group, Attribute, SingleValue, Key } from "./model";

let data: Submission | null = null;

const fetchData = async (): Promise<Submission> => {
    if (!data) {
        data = createData()
    }
    return data
}

const createData = (): Submission => {
    
    let groups: Group[] = [];

    for(let groupIndex=1; groupIndex<=3; groupIndex++) {
        let group: Group = {
            name: `Group${groupIndex}`,
            content: []
        }
        for (let keyIndex=0; keyIndex<10; keyIndex++) {
            let attribute: Attribute = {
                key: {name: `Group${groupIndex} - Key${keyIndex}`, description: "Lorem ipsum dolor sit amet"}, 
                onDispatch: {value: `Value${groupIndex}.${keyIndex}.1`},
                onSubmission: {value: `Value${groupIndex}.${keyIndex}.2`},
                onApprovalOrDenial: {value: `Value${groupIndex}.${keyIndex}.3`},
            }
            group.content.push(attribute)
        }
        groups.push(group)
    }
    return {
        content: groups
    }
};

export const getSubmission = (): Promise<Submission> => fetchData();

export const updateCell = async (
        groupIndex: number,
        keyIndex: number,
        column: 'onDispatch' | 'onSubmission' | 'onApprovalOrDenial',
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