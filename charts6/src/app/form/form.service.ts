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
                        {src: '../../../../assets/footPrint/collapsed01.png'},
                        {src: '../../../../assets/footPrint/collapsed02.png'}
                    ]
                },
                {
                    id: 'FootHigh',
                    parserData: 'FootHigh',
                    label: 'גבוהה',
                    imgs: [
                        {src: '../../../../assets/footPrint/high01.png'},
                        {src: '../../../../assets/footPrint/high02.png'}
                    ]
                },
                {
                    id: 'FootLow',
                    parserData: 'FootLow',
                    label: 'נמוכה',
                    imgs: [
                        {src: '../../../../assets/footPrint/low01.png'},
                        {src: '../../../../assets/footPrint/low02.png'}
                    ]
                },
                {
                    id: 'FootNormal',
                    parserData: 'FootNormal',
                    label: 'נורמאלית',
                    imgs: [
                        {src: '../../../../assets/footPrint/normal01.png'},
                        {src: '../../../../assets/footPrint/normal02.png'}
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
                    label: 'מקור הגעה',
                    name: 'referred',
                    id: 'referred',
                    options: [
                        {
                            text: 'מזדמן'
                        },
                        {
                            text: 'פרסום'
                        },
                        {
                            text: 'מטופל שלי'
                        },
                        {
                            text: 'אחר',
                        }
                    ]
                }
            },
            {
                select: {
                    label: 'ביטוח',
                    name: 'insurance',
                    id: 'insurance',
                    options: [
                        {
                            text: 'כללית',
                        },
                        {
                            text: 'מכבי'
                        },
                        {
                            text: 'מאוחדת'
                        },
                        {
                            text: 'לאומית'
                        },
                        {
                            text: 'אחר',
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
            },
            {
                textarea: {
                    id: 'comments',
                    length: 10000,
                    placeHolder: 'הערות כלליות',
                    rows: 5,
                }
            }
        ]
    }
];
