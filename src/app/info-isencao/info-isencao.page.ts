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
		private alertCtrl: AlertController,
		private navCtrl: NavController) {
	
	this.localPerson            = undefined;
        this.isInsert               = true;
    }

    doRetorna(): void {
        // this.navCtrl.back();
	this.navCtrl.navigateBack('/NovoCadastro');
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
    
   async alertInsertOk(msg: string) {
        const alert = await this.alertCtrl.create({
            header: 'Sucesso',
            subHeader: 'Cadastro realizado',
            message: msg,
            buttons: ['OK']
        });

        await alert.present();
    }
    
    async alertServerFailure(msg: string) {
        const alert = await this.alertCtrl.create({
            header: 'Problema',
            subHeader: 'Serviço indisponível',
            message: msg,
            buttons: ['OK']
        });

        await alert.present();
    }

    async alertConflict(msg: string) {
        const alert = await this.alertCtrl.create({
            header: 'Conflito',
            subHeader: 'CPF já existente',
            message: msg,
            buttons: ['OK']
        });

        await alert.present();
    }

    doFinaliza(): void {
        if (this.localPerson !== undefined) {

	    // atualiza localPerson com this.pagamento = "isencao pendente"
	    this.localPerson.modo_pagam   = 'isencao';
	    this.localPerson.doc_entregue = 'nao';

	    console.log("Sending info to database...");
	    console.log(this.localPerson);
	
            this.personService.saveApplicant(this.localPerson)
                .subscribe(
                    (person: Person) => {
                        console.log("Id recebido: " + person._id);
                        this.alertInsertOk("Informações salvas!");
                        this.personService.persistPersonLocally(person);
                        this.navCtrl.navigateRoot('/Perfil');
                    },
                    (err) => {
                        console.log(err);
                        if (err.status == 409) {
                            this.alertConflict("Por favor, verifique dados fornecidos.");
                        } else {
                            this.alertServerFailure("Por favor, tente mais tarde!");
                        }
                    }
                );

	} else {
	    console.log("info-gru: no user to save...");
	}
    }    
    
}
