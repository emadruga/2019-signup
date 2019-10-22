import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { PersonService } from '../services/person.service';
import { Person } from '../interfaces/person';
import * as crypto from 'crypto-js';
import {SECRET_KEY} from '../../environments/environment';

@Component({
    selector: 'app-fazer-login',
    templateUrl: './fazer-login.page.html',
    styleUrls: ['./fazer-login.page.scss'],
})

export class FazerLoginPage implements OnInit {

    public username: string;
    public password: string;

    constructor(private personService: PersonService,
                private alertCtrl: AlertController,
                private navCtrl: NavController) {}

    ngOnInit() {}

    async alertUserAuthFailure(msg: string) {
        const alert = await this.alertCtrl.create({
            header: 'Acesso',
            subHeader: 'Informação',
            message: msg,
            buttons: ['OK']
        });

        await alert.present();
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
        this.alertInfo("Atualização e Consulta",
            "É necessário informar e-mail e a senha. " +
            "Os 4 últimos digitos do CPF em cadastro constituem a senha. " +
            "Exemplo: para um CPF igual a 123.456.789-10, " +
            "a senha seria 8910.");	
    }

    login() {

        var digest = crypto.HmacSHA256(this.password, SECRET_KEY)
                        .toString(crypto.enc.Hex);

        const credentials = {
            email:         this.username,
            senha:         digest
        };


        this.personService.doAuthenticateLogin(credentials)
            .subscribe(
                (person: Person) => {
                    console.log('Auth Ok: ' + person.email);
                    this.personService.persistPersonLocally(person);
                    this.navCtrl.navigateRoot('/Perfil');
                },
                (err) => {
                    console.log(credentials);
                    console.log(err);
                    if (err.status == 401) {
                        this.alertUserAuthFailure('Email ou senha inválidos');
                    } else {
                        this.alertUserAuthFailure('Usuário inexistente');
                    }
                }
            );
    }

}
