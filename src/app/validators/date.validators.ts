import { FormControl } from '@angular/forms';

export class DataNascValidator {


    static isValidDate(date_str: string): boolean {
	var isValid = true;
	var day_str   = date_str.match(/^(\d{2})-\d{2}-\d{4}$/);
	if (day_str != null)
	{
	    var month_str = date_str.match(/^\d{2}-(\d{2})-\d{4}$/);
	    var year_str  = date_str.match(/^\d{2}-\d{2}-(\d{4})$/);
	    var day   = parseInt(day_str[1]   ,10);
	    var month = parseInt(month_str[1] ,10);
	    var year  =   parseInt(year_str[1]  ,10);

	    if (day < 1 || day > 31) {
		isValid = false;
	    }
	    if (month < 1 || month > 12) {
		isValid = false;
	    }
	    if (year < 1900 || year > 2020) {
		isValid = false;
	    }
	} else {
	    isValid = false
	}

	return isValid;
    }
    
    static validDataNasc(fc: FormControl) {
	var isValid = this.isValidDate(fc.value);
	
	if (isValid) {
	    return {validDataNasc: true};
	} else {
	    return null;
	}

    }
}
