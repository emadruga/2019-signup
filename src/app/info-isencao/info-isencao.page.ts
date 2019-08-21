import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { PersonService } from '../services/person.service';
import { Person }        from '../interfaces/person';

@Component({
  selector: 'app-info-isencao',
  templateUrl: './info-isencao.page.html',
  styleUrls: ['./info-isencao.page.scss'],
})
export class InfoIsencaoPage implements OnInit {
    
    private localPerson: Person;
    // Is it a brand new insert or editing existing person ??
    private isInsert: boolean;

    constructor(private personService: PersonService,
		private navCtrl: NavController) {
	
	this.localPerson            = undefined;
        this.isInsert               = true;
    }

    doRetorna(): void {
        this.navCtrl.back();
    }

    ngOnInit() {
	this.localPerson = this.personService.getLocalPerson();
        if (this.localPerson !== undefined) {

            // The page is going to be used to modify existing person
            // rather than add a new person.
            this.isInsert = false;
	} else {
	    this.isInsert = true;
	}
	
    }
}