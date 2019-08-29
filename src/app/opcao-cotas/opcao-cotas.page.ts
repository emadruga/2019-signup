import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PersonService } from '../services/person.service';
import { Person }        from '../interfaces/person';

@Component({
  selector: 'app-opcao-cotas',
  templateUrl: './opcao-cotas.page.html',
  styleUrls: ['./opcao-cotas.page.scss'],
})
export class OpcaoCotasPage implements OnInit {

    private localPerson: Person;
    // Is it a brand new insert or editing existing person ??
    private isInsert: boolean;

    constructor(private personService: PersonService,
		private navCtrl: NavController) {
	
	this.localPerson   = undefined;
        this.isInsert      = true;
    }
    
    
    doNaoQueroCotas(): void {
        console.log("Ampla concorrência...");
        if (this.localPerson !== undefined) {
	    let cotista = 'nao';
	    // in this case, we do not care about ppi and renda
	    // just filling in some consistent info.
	    let ppi     = 'nao';
	    let renda   = 'acima';
	    this.personService.updateOpcoesCotas(cotista,ppi,renda);
	} else {
	    console.log('opcao-cotas: person not defined!')
	}
	this.navCtrl.navigateForward('/pagamento');
    }

    doQueroCotas(): void {
        console.log("Info para cotas...");
        this.navCtrl.navigateForward('/quero-cotas');
    }

    doCancel(): void {
        //this.personService.resetLocalPerson();
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
