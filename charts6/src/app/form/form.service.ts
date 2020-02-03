import {Injectable} from "@angular/core";
import {IFormElement} from "./form-elements-components/";

@Injectable()
export class FormService {
    getFormElements() {
        return FORM_ELEMENTS;
    }
    getLength(){
        return FORM_ELEMENTS.length;
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
                    label: 'אחר',
                    other: true
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
                    label: 'אחר',
                    other: true
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
            theme: 'round',
            elements: [
                {
                    id: 'FootCollapsed',
                    parserData: 'FootCollapsed',
                    label: 'השטחה',
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
        title: '',
        footImage: true
    },
    {
        title: 'בחירת זוית רגל',
        radio: {
            name: 'legLine',
            theme: 'round',
            elements: [
                {
                    id: 'legInside',
                    parserData: 'legInside',
                    label: 'פנימי',
                    imgs: [
                        {svg: 'inner-leg'}
                    ]
                },
                {
                    id: 'legNormal',
                    parserData: 'legNormal',
                    label: 'נורמאלי',
                    imgs: [
                        {svg: 'normal-leg'}
                    ]
                },
                {
                    id: 'legOutside',
                    parserData: 'legOutside',
                    label: 'חיצוני',
                    imgs: [
                        {svg: 'outer-leg'}
                    ]
                },
            ]
        }
    },
    {
        title: 'פרטי לקוח',
        class: 'customer-details',
        customerDetails: [
            {
                input: {
                    required: true,
                    id: 'client-name',
                    name: 'name',
                    type: 'text',
                    label: 'שם מלא'
                }
            },
            {
                radio: {
                    name: 'gender',
                    label: 'מין',
                    elements: [
                        {
                            id: 'male',
                            label: 'זכר',
                            imgs: [{svg: 'male'}]
                        },
                        {
                            id: 'female',
                            label: 'נקבה',
                            imgs: [{svg: 'female'}]
                        }
                    ]
                }
            },
            {
                input: {
                    id: 'phone',
                    name: 'phone',
                    type: 'number',
                    label: 'מספר טלפון'
                }
            },
            {
                select: {
                    label: 'סוג מדרס',
                    id: 'midras-type',
                    name: 'midras-type',
                    options: [
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
                    id: 'id-number',
                    name: 'idNumber',
                    type: 'number',
                    label: 'ת.ז'
                }
            },
            {
                input: {
                    required: true,
                    id: 'shoes-size',
                    name: 'shoes',
                    type: 'number',
                    label: 'מידת נעלים'
                }
            },
            {
                inputBirthday: {
                    title: 'תאריך לידה'
                }
            },
            {
                select: {
                    label: 'יחידת מידה',
                    name: 'shoesMeasureType',
                    required: true,
                    options: [
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
                input: {
                    id: 'email',
                    name: 'email',
                    type: 'email',
                    label: 'אימייל'
                }
            },
            {
                input: {
                    id: 'weight',
                    name: 'weight',
                    type: 'number',
                    label: 'משקל'
                }
            }
        ]
    }
];
