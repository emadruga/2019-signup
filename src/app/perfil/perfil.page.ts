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
        this.pessoa = this.personServ.getLocalPerson();
    }

    doEdit() {
        this.navCtrl.navigateForward('/NovoCadastro');
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
        this.alertInfo("Ficha de Inscrição",
            "Imprima a ficha no seu computador, e leve a impressão no dia da prova. " +
            "Logo após, feche o navegador por segurança. " +
            "Se preferir, use os últimos 4 (quatro) dígitos de seu CPF para acessar a " +
            "ficha de inscrição e imprimir mais tarde.  " +
            "Pode também acessar a ficha no seu celular, e apresentá-la no dia da prova." +
            "Maiores detalhes no Edital de Seleção.");
    }

    ngOnInit() {
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
