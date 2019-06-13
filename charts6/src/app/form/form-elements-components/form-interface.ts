export interface IRadio {
    id: string,
    text: string,
    name: string
}
export interface ITextArea {
    id: string,
    length: number,
    placeHolder: string,
    rows: number,
    required: boolean
}
export interface IText {
    id: string,
    name: string,
    placeholder: string
}

export interface IFormElement {
    title: string,
    subtitle?: string,
    radio?: IRadio[],
    textarea?: ITextArea,
    text?: Text,
    footImage?: boolean
}

