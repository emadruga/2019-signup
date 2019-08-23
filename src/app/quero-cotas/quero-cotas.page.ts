import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormControl } from '@angular/forms';
import { PersonService } from '../services/person.service';
import { Person }        from '../interfaces/person';


@Component({
  selector: 'app-quero-cotas',
  templateUrl: './quero-cotas.page.html',
  styleUrls: ['./quero-cotas.page.scss'],
})
export class QueroCotasPage implements OnInit {

    private localPerson  : Person;
    private cotista      : FormControl;
    private renda        : FormControl;

    // Is it a brand new insert or editing existing person ??
    private isInsert: boolean;
    

    constructor(private personService: PersonService,
                private alertCtrl: AlertController,
                private formBuilder: FormBuilder,
                private navCtrl: NavController) {

        this.localPerson            = undefined;

        this.cotista       = this.formBuilder.control('', Validators.required);
        this.renda         = this.formBuilder.control('', Validators.required);
	
    }

    ngOnInit() {

        this.localPerson = this.personService.getLocalPerson();

        if (this.localPerson !== undefined) {
            this.isInsert = false;
        } else {
            this.isInsert = true;
 	}
    }
    doPagamento() {
        console.log("Vamos pagar...");
        this.navCtrl.navigateForward('/pagamento');
    }

    doCancel(): void {
        //this.personService.resetLocalPerson();
        this.navCtrl.back();
    }

}
