export interface Step {
    step: number
    title: string
    description: string
    fields: Field[]
}
export interface Field {
    type: string
    label: string
    required: boolean
    placeholder?: string
    options?: (Option | string | number)[]
}
export interface Option {
    label: string
    value: string | number
}

export type Form = Step[];