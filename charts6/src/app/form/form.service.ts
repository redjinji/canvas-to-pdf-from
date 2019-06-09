import {Injectable} from "@angular/core";
import {IFormElement} from "./form-elements-components/";

@Injectable()
export class FormService {
    getFormElements(){
        return FORM_ELEMENTS;
    }
}

const FORM_ELEMENTS:IFormElement[] = [
    {
        title: 'קשת קשיחה?',
        radio: [
            {
                id:'keshet-yes',
                name: 'keshet',
                text: 'כן'
            },
            {
                id:'keshet-no',
                name: 'keshet',
                text: 'לא'
            }
        ]
    },
    {
        title: 'מקור הגעה',
        radio: [
            {
                id: 'walkIn',
                name: 'referred',
                text: 'מזדמן'
            },
            {
                id: 'advertising',
                name: 'referred',
                text: 'פרסום'
            },
            {
                id: 'myPatient',
                name: 'referred',
                text: 'מטופל שלי'
            },
            {
                id: 'other-referred',
                name: 'referred',
                text: 'אחר'
            }
        ]
    },
    {
        title: 'ביטוח בריאות',
        radio: [
            {
                id: 'clalit',
                name: 'insurance',
                text: 'כללית'
            },
            {
                id: 'macabi',
                name: 'insurance',
                text: 'מכבי'
            },
            {
                id: 'meuhedet',
                name: 'insurance',
                text: 'מאוחדת'
            },
            {
                id: 'leumit',
                name: 'insurance',
                text: 'לאומית'
            },
            {
                id: 'other-insurance',
                name: 'insurance',
                text: 'אחר'
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
                text: 'כן'
            },
            {
                id: 'kolaps-bow-no',
                name: 'kolaps-bow',
                text: 'לא'
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
                text: 'כן'
            },
            {
                id: 'movement-limitation-no',
                name: 'movement-limitation',
                text: 'לא'
            },

        ]
    },
    {
        title: 'צלם תמונה',
        footImage: true
    }
];
