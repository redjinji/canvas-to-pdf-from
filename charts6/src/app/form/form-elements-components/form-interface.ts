export interface IRadio {
    name: string,
    class?: string,
    required?: true,
    elements: IRadioElement[]
}

export interface IRadioElement {
    label: string,
    id: string,
}

export interface ITextArea {
    id: string,
    length: number,
    placeHolder?: string,
    rows: number,
    required?: boolean,
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
    required?: true,
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
    radio?: IRadio,
    select?: ISelect,
    class?: string
}

export interface IFormElement {
    title: string,
    subtitle?: string,
    class?: string,
    footImage?: boolean,
    radio?: IRadio,
    textarea?: ITextArea,
    customerDetails?: ICustomerDetails[]
}

