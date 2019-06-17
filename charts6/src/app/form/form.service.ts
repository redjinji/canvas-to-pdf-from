import {Injectable} from "@angular/core";
import {IFormElement} from "./form-elements-components/";

@Injectable()
export class FormService {
    getFormElements() {
        return FORM_ELEMENTS;
    }
}

const FORM_ELEMENTS: IFormElement[] = [
    {
        title: 'קשת קשיחה?',
        radio: [
            {
                id: 'keshet-yes',
                name: 'keshet',
                label: 'כן'
            },
            {
                id: 'keshet-no',
                name: 'keshet',
                label: 'לא'
            }
        ]
    },
    {
        title: 'מקור הגעה',
        radio: [
            {
                id: 'walkIn',
                name: 'referred',
                label: 'מזדמן'
            },
            {
                id: 'advertising',
                name: 'referred',
                label: 'פרסום'
            },
            {
                id: 'myPatient',
                name: 'referred',
                label: 'מטופל שלי'
            },
            {
                id: 'other-referred',
                name: 'referred',
                label: 'אחר'
            }
        ]
    },
    {
        title: 'ביטוח בריאות',
        radio: [
            {
                id: 'clalit',
                name: 'insurance',
                label: 'כללית'
            },
            {
                id: 'macabi',
                name: 'insurance',
                label: 'מכבי'
            },
            {
                id: 'meuhedet',
                name: 'insurance',
                label: 'מאוחדת'
            },
            {
                id: 'leumit',
                name: 'insurance',
                label: 'לאומית'
            },
            {
                id: 'other-insurance',
                name: 'insurance',
                label: 'אחר'
            },
        
        ]
    },
    {
        title: 'האם קיימת פתולוגיה או תלונות כאב',
        textarea: {
            id: 'patalog',
            length: 10000,
            placeHolder: 'שים פה את הטקסט',
            rows: 5,
            required: true
        }
    },
    {
        title: 'פעילות יום יומית',
        subtitle: 'פרט אופי פעילות: ריצה ספורט, עמידה ממושכת',
        textarea: {
            id: 'activity',
            length: 10000,
            placeHolder: 'שים פה את הטקסט',
            rows: 5,
            required: true
        }
    },
    {
        title: 'קריסת קשת רוחבית',
        subtitle: 'יש צורך בהגבהה מטטראסל',
        radio: [
            {
                id: 'kolaps-bow-yes',
                name: 'kolaps-bow',
                label: 'כן'
            },
            {
                id: 'kolaps-bow-no',
                name: 'kolaps-bow',
                label: 'לא'
            }
        ]
    },
    {
        title: 'טווחי תנועה',
        subtitle: 'יש הגבלה בתנועה',
        radio: [
            {
                id: 'movement-limitation-yes',
                name: 'movement-limitation',
                label: 'כן'
            },
            {
                id: 'movement-limitation-no',
                name: 'movement-limitation',
                label: 'לא'
            },
        
        ]
    },
    {
        title: 'צלם תמונה',
        footImage: true
    },
    {
        title: 'פרטי לקוח',
        class: 'customer-details',
        customerDetails: [
            {
                radio:[
                    {
                        id: 'male',
                        label: 'זכר',
                        name: 'gender'
                    },
                    {
                        id: 'female',
                        label: 'נקבה',
                        name: 'gender'
                    }
                ]
            },
            {
                input: {
                    id: 'id-number',
                    name: 'id',
                    placeholder: 'ת.ז',
                    type: 'number',
                    label: 'ת.ז'
                }
            },
            {
                input: {
                    id: 'client-name',
                    name: 'name',
                    placeholder: 'שם פרטי ומשפחה',
                    type: 'text',
                    label: 'שם פרטי ומשפחה'
                }
            },
            {
                input: {
                    id: 'birthday',
                    name: 'surname',
                    type: 'date',
                    maxDate: new Date(),
                    required: true,
                    label: 'תאריך לידה'
                }
            },
            {
                input: {
                    id: 'phone',
                    name: 'phone',
                    placeholder: 'מספר טלפון',
                    type: 'number',
                    label: 'מספר טלפון'
                }
            },
            {
                input: {
                    id: 'email',
                    name: 'email',
                    placeholder: 'אימייל',
                    type: 'email',
                    label: 'אימייל'
                }
            },
            {
                class: 'shoes',
                input: {
                    id: 'shoes-size',
                    name: 'shoes',
                    placeholder: 'מידת נעלים',
                    type: 'number',
                    label: 'מידת נעלים'
                },
                select: {
                    name: 'shoes-measure-type',
                    options: [
                        {
                            text: 'EUR'
                        },
                        {
                            text: 'US'
                        },
                        {
                            text: 'CM'
                        }
                    ]
                }
            },
            {
                select: {
                    label: 'סוג מדרס',
                    id: 'midras-type',
                    name: 'midras-type',
                    options: [
                        {
                            text: 'Soft Step',
                        },
                        {
                            text: 'Balance Step',
                        },
                        {
                            text: 'Moonwalk',
                        },
                        {
                            text: 'On Cloud',
                        },
                        {
                            text: 'Ortostep',
                        },
                        {
                            text: 'Other',
                        }
                        
                    ]
                }
            },
            {
                input: {
                    id: 'weight',
                    name: 'weight',
                    placeholder: 'משקל',
                    type: 'number',
                    label: 'משקל'
                }
            }
        ]
    }
];
