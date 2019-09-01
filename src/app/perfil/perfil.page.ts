import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { SettingsPage } from '../settings/settings.page';
import { PersonService } from '../services/person.service';
import { Person }        from '../interfaces/person';


@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.page.html',
    styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

    public pessoa: Person;

    constructor(private personServ: PersonService,
                private alertCtrl: AlertController,
                private modalCtrl: ModalController,
                private navCtrl: NavController) {
    }

    doEdit() {
        this.navCtrl.navigateForward('/NovoCadastro');
    }

    doGuia() {
        this.navCtrl.navigateForward('/info-gru');
    }

    doExit() {
        this.personServ.resetLocalPerson();
        this.navCtrl.navigateForward('/home');
    }

    async alertInfo(msg1, msg2: string) {
        const alert = await this.alertCtrl.create({
            header: 'Informação',
            subHeader: msg1,
            message: msg2,
            buttons: ['OK']
        });

        await alert.present();
    }

    doInfo() {
	var comprov = "Comprovante de Pagamento";
	var link = "http://consulta.tesouro.fazenda.gov.br/GRU_NOVOSITE/GRU_SIMPLES.ASP";

	if (this.pessoa.modo_pagam !== "gru") {
	    
	    comprov = "Comprovante de Cadastramento (CadÚnico)";
	    link = "https://aplicacoes.mds.gov.br/sagi/consulta_cidadao/index.php";
	}
	var txt  = '<a href="' + link + '" target="_blank">' + comprov + '</a>';
	
        this.alertInfo("Entregar Comprovante",
            "É necessário entregar o " + txt + " pessoalmente na " +
            "Secretaria do Cicma, Prédio 32, no Campus do Inmetro, " +
            "em Xerém. Observe a data-limite. " +
            "Endereço e datas na página do curso.");
    }

    ngOnInit() {
        this.pessoa = this.personServ.getLocalPerson();
        console.log(this.pessoa);
    }

    async openSettings() {

        const modal = await this.modalCtrl.create({
            component: SettingsPage,
            componentProps:  { person: this.pessoa }
        });

        // Get returned data
        modal.onWillDismiss()
            .then( () =>  {
                this.pessoa = 	this.personServ.getLocalPerson();
                console.log("Modal entregou:");
                console.log(this.pessoa);
            });

        modal.present();

    }

}
