import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { PersonService } from '../services/person.service';
import { Person }        from '../interfaces/person';

@Component({
  selector: 'app-info-gru',
  templateUrl: './info-gru.page.html',
  styleUrls: ['./info-gru.page.scss'],
})
export class InfoGruPage implements OnInit {
    private pessoa: Person;
    // Is it a brand new insert or editing existing person ??
    private isInsert: boolean;

    constructor(private personService: PersonService,
		private alertCtrl: AlertController,
		private navCtrl: NavController) {
	
	this.pessoa            = undefined;
        this.isInsert               = true;
    }

    doRetorna(): void {
        //this.navCtrl.back();
	this.navCtrl.navigateBack('/Perfil');
    }


    ngOnInit() {
	this.pessoa = this.personService.getLocalPerson();
        if (this.pessoa !== undefined) {

            // The page is going to be used to modify existing person
            // rather than add a new person.
            this.isInsert = false;
	} else {
	    this.isInsert = true;
	}
	
    }

}
