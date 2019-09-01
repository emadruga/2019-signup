import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { PersonService } from '../services/person.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService {

    constructor(private router: Router,
		private personService: PersonService		
	       ) { }

    canActivate(route: ActivatedRouteSnapshot): boolean
    {

        console.log(route);
	
	if (!this.personService.weHavePerson()) {
            this.router.navigate(['home']);
            return false;
        }
	
        return true;

    }

}
