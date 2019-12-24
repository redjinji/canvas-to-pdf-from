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
            rows: 5,
        }
    },
    {
        title: 'קריסת קשת רוחבית',
        subtitle: 'יש צורך בהגבהה מטטראסל',
        radio: {
            name: 'kolapsBow',
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
            name: 'movementLimitation',
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
            elements: [
                {
                    id: 'FootCollapsed',
                    parserData: 'FootCollapsed',
                    label: 'קריסה',
                    imgs: [
                        {src: '../../../../assets/SoftwareIcons_FootCollapsed.png'}
                    ]
                },
                {
                    id: 'FootHigh',
                    parserData: 'FootHigh',
                    label: 'גבוהה',
                    imgs: [
                        {src: '../../../../assets/SoftwareIcons_FootHigh.png'}
                    ]
                },
                {
                    id: 'FootLow',
                    parserData: 'FootLow',
                    label: 'נמוכה',
                    imgs: [
                        {src: '../../../../assets/SoftwareIcons_FootLow.png'}
                    ]
                },
                {
                    id: 'FootNormal',
                    parserData: 'FootNormal',
                    label: 'נורמאלית',
                    imgs: [
                        {src: '../../../../assets/SoftwareIcons_FootNormal.png'}
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
                inputBirthday: {
                    title: 'תאריך יומולדת'
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
                    required: true,
                    id: 'shoes-size',
                    name: 'shoes',
                    placeholder: 'מידה',
                    type: 'number',
                    label: 'מידת נעלים'
                },
                select: {
                    name: 'shoesMeasureType',
                    required: true,
                    options: [
                        {
                            text: 'יחידת מידה',
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
                    options: [
                        {
                            text: 'בחר סוג מדרס',
                            defaultSelect: true,
                            disabled: true,
                            hidden: true
                        },
                        {
                            text: 'אקטיבי',
                            defaultSelect: true
                        },
                        {
                            text: 'פרו',
                        },
                        {
                            text: 'פרו פלוס',
                        },
                        {
                            text: 'קשיח',
                        },
                        {
                            text: 'רב שיכבתי',
                        },
                        {
                            text: 'אחר',
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
