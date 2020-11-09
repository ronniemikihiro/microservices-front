import { StringUtil } from './util/util';
import { FormGroup } from '@angular/forms';
import { RequiredPropertyError } from '../core/error/required-property-error';
import { InvalidEmailError } from '../core/error/invalid-email-error';

export class AbstractComponent {

    constructor() {}

    compareSelectObjId(o1: any, o2: any): boolean {
        return o1 && o2 ? o1.id === o2.id : false;
    }

    validPropertiesForm(form: FormGroup) {
        Object.keys(form.controls).forEach((property) => {
            const field = form.get(property);

            if(field.invalid) {
                if(field.hasError('required')) {
                    throw new RequiredPropertyError(StringUtil.capitalizeFirstLetter(property));
                }
                if(field.hasError('email')) {
                    throw new InvalidEmailError();
                }
            }
        });
    }

    formToObj(form: FormGroup, obj: any) {
        const propertiesObj = Object.getOwnPropertyNames(obj);

        propertiesObj.forEach((property) => {
            const value = form.get(property).value;
            if(value) {
                obj[property] = value;
            }
        });

        return obj;
    }


}