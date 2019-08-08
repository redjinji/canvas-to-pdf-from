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
        radio: {
            name: 'keshet',
            required: true,
            elements: [
                {
                    id: 'keshet-yes',
                    label: 'כן'
                },
                {
                    id: 'keshet-no',
                    label: 'לא'
                }
            ]
        }
    },
    {
        title: 'מקור הגעה',
        radio: {
            name: 'referred',
            required: true,
            elements: [
                {
                    id: 'walkIn',
                    label: 'מזדמן'
                },
                {
                    id: 'advertising',
                    label: 'פרסום'
                },
                {
                    id: 'myPatient',
                    label: 'מטופל שלי'
                },
                {
                    id: 'other-referred',
                    label: 'אחר'
                }
            ]
        }
    },
    {
        title: 'ביטוח בריאות',
        radio: {
            name: 'insurance',
            required: true,
            elements: [
                {
                    id: 'clalit',
                    label: 'כללית',
                },
                {
                    id: 'macabi',
                    label: 'מכבי'
                },
                {
                    id: 'meuhedet',
                    label: 'מאוחדת'
                },
                {
                    id: 'leumit',
                    label: 'לאומית'
                },
                {
                    id: 'other-insurance',
                    label: 'אחר'
                }
            ]
        }
    },
    {
        title: 'האם קיימת פתולוגיה או תלונות כאב',
        textarea: {
            id: 'patalog',
            length: 10000,
            placeHolder: 'שים פה את הטקסט',
            required: true,
            rows: 5,
        }
    },
    {
        title: 'פעילות יום יומית',
        subtitle: 'פרט אופי פעילות: ריצה ספורט, עמידה ממושכת',
        textarea: {
            id: 'activity',
            length: 10000,
            placeHolder: 'שים פה את הטקסט',
            required: true,
            rows: 5,
        }
    },
    {
        title: 'קריסת קשת רוחבית',
        subtitle: 'יש צורך בהגבהה מטטראסל',
        radio: {
            name: 'kolaps-bow',
            required: true,
            elements: [
                {
                    id: 'kolaps-bow-yes',
                    label: 'כן'
                },
                {
                    id: 'kolaps-bow-no',
                    label: 'לא'
                }
            ]
        }
    },
    {
        title: 'טווחי תנועה',
        subtitle: 'יש הגבלה בתנועה',
        radio: {
            name: 'movement-limitation',
            required: true,
            elements: [
                {
                    id: 'movement-limitation-yes',
                    label: 'כן'
                },
                {
                    id: 'movement-limitation-no',
                    label: 'לא'
                },
    
            ]
        }
    },
    {
        title: 'טביעת רגל',
        subtitle: 'סוג קשת פלנטארית',
        radio: {
            name: 'footPrint',
            required: true,
            elements: [
                {
                    id: 'footCollapse',
                    label: 'קריסה',
                    imgs: [
                        {src:'../../../../assets/SoftwareIcons_FootCollapsed.png'}
                    ]
                },
                {
                    id: 'footHigh',
                    label: 'גבוהה',
                    imgs: [
                        {src:'../../../../assets/SoftwareIcons_FootHigh.png'}
                    ]
                },
                {
                    id: 'footLow',
                    label: 'נמוכה',
                    imgs: [
                        {src:'../../../../assets/SoftwareIcons_FootLow.png'}
                    ]
                },
                {
                    id: 'footNormal',
                    label: 'נורמאלית',
                    imgs: [
                        {src:'../../../../assets/SoftwareIcons_FootNormal.png'}
                    ]
                }
            ]
        }
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
                radio: {
                    required: true,
                    name: 'gender',
                    elements: [
                        {
                            id: 'male',
                            label: 'זכר',
                        },
                        {
                            id: 'female',
                            label: 'נקבה',
                        }
                    ]
                }
            },
            {
                input: {
                    required: true,
                    id: 'id-number',
                    name: 'idNumber',
                    placeholder: 'ת.ז',
                    type: 'number',
                    label: 'ת.ז'
                }
            },
            {
                input: {
                    required: true,
                    id: 'client-name',
                    name: 'name',
                    placeholder: 'שם פרטי ומשפחה',
                    type: 'text',
                    label: 'שם פרטי ומשפחה'
                }
            },
            {
                input: {
                    required: true,
                    id: 'birthday',
                    name: 'birthday',
                    type: 'date',
                    maxDate: new Date(),
                    label: 'תאריך לידה'
                }
            },
            {
                input: {
                    required: true,
                    id: 'phone',
                    name: 'phone',
                    placeholder: 'מספר טלפון',
                    type: 'number',
                    label: 'מספר טלפון'
                }
            },
            {
                input: {
                    required: true,
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
                    required: true,
                    id: 'shoes-size',
                    name: 'shoes',
                    placeholder: 'מידת נעלים',
                    type: 'number',
                    label: 'מידת נעלים'
                },
                select: {
                    name: 'shoesMeasureType',
                    required: true,
                    options: [
                        {
                            text: 'בחר יחידת מידה',
                            defaultSelect: true,
                            disabled: true,
                            hidden: true
                        },
                        {
                            text: 'EUR',
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
                    required: true,
                    options: [
                        {
                            text: 'בחר סוג מדרס',
                            defaultSelect: true,
                            disabled: true,
                            hidden: true
                        },
                        {
                            text: 'Soft Step',
                            defaultSelect: true
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
                    required: true,
                    label: 'משקל'
                }
            }
        ]
    }
];
