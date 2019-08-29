import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../services/person.service';
import { Person }        from '../interfaces/person';


@Component({
  selector: 'app-quero-cotas',
  templateUrl: './quero-cotas.page.html',
  styleUrls: ['./quero-cotas.page.scss'],
})
export class QueroCotasPage implements OnInit {

    private localPerson  : Person;
    private ppi          : FormControl;
    private renda        : FormControl;
    public  opcoesForm   : FormGroup;

    // Is it a brand new insert or editing existing person ??
    private isInsert: boolean;
    

    constructor(private personService: PersonService,
                private alertCtrl: AlertController,
                private formBuilder: FormBuilder,
                private navCtrl: NavController) {

        this.localPerson            = undefined;

        this.ppi    = this.formBuilder.control('', Validators.required);
        this.renda  = this.formBuilder.control('', Validators.required);
	
	this.opcoesForm    = this.formBuilder.group({
            ppi       : this.ppi,
            renda     : this.renda
        });
    }

    ngOnInit() {

        this.localPerson = this.personService.getLocalPerson();

        if (this.localPerson !== undefined) {
            this.isInsert = false;
            this.ppi    .setValue(this.localPerson. ppi );
            this.renda  .setValue(this.localPerson. renda );
        } else {
            this.isInsert = true;
 	}
    }
    
    doPagamento() {
        console.log("Vamos pagar...");
	if (this.localPerson !== undefined) {
	    let cotista = 'sim';
	    let ppi     = this.ppi.value;
	    let renda   = this.renda.value;
	    this.personService.updateOpcoesCotas(cotista,ppi,renda);
	} else {
	    console.log('quero-cotas: person not defined!')
	}
        this.navCtrl.navigateForward('/pagamento');
    }

    doCancel(): void {
        //this.personService.resetLocalPerson();
        this.navCtrl.back();
    }

}
