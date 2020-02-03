export interface IRadio {
    name: string,
    label?: string,
    class?: string,
    required?: true,
    theme?: string,
    elements: IRadioElement[]
}

export interface IRadioElement {
    label: string,
    parserData?: string,
    id: string,
    imgs?:IImage[],
    other?: boolean
}

export interface IImage {
    src?: string,
    svg?: string
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
    parserData?: string,
    type: string,
    maxDate?: Date,
    maxDateParsed?: string,
    required?: boolean,
    label: string,
    class?: string
}

export interface IInputBirthday {
    title: string,
    required?: true
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
    class?: string,
    defaultSelect?: boolean,
    disabled?: boolean,
    hidden?: boolean
}

export interface ICustomerDetails {
    input?: IInput,
    inputBirthday?: IInputBirthday,
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

