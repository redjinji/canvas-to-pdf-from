export interface IRadio {
    id: string,
    label: string,
    name: string,
    class?: string
}

export interface ITextArea {
    id: string,
    length: number,
    placeHolder?: string,
    rows: number,
    required: boolean,
    class?: string
}

export interface IInput {
    id: string,
    name: string,
    placeholder?: string,
    type: string,
    maxDate?: Date,
    maxDateParsed?: string,
    required?: boolean,
    label: string,
    class?: string
}

export interface ISelect {
    label?: string,
    id?: string,
    name: string,
    class?: string
    options: ISelectOption[]
}

export interface ISelectOption {
    text: string,
    value?: string,
    class?: string
}

export interface ICustomerDetails {
    input?: IInput,
    textarea?: ITextArea,
    radio?: IRadio[],
    select?: ISelect,
    class?: string
}

export interface IFormElement {
    title: string,
    subtitle?: string,
    text?: Text,
    footImage?: boolean,
    class?: string,
    radio?: IRadio[],
    textarea?: ITextArea,
    customerDetails?: ICustomerDetails[]
}

