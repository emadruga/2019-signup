import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { AlertController, NavController } from '@ionic/angular';
import { PersonService } from '../services/person.service';
import { environment, SERVER_URL, SECRET_KEY } from '../../environments/environment';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

    public captchaSvg: SafeHtml;
    public captchaTxt: string;
    public captchaUserAnswer: string;
    public captchaIsGood = false;


    constructor(
        private sanitizer: DomSanitizer,
        private alertCtrl: AlertController,
        private personService: PersonService,
        private navCtrl: NavController) { }

    ngOnInit() {
        console.log(environment.message);
        console.log(SERVER_URL);
        this.getMyCaptcha();
    }

    async alertCaptchaFailure(msg: string) {
        const alert = await this.alertCtrl.create({
            header: 'Acesso',
            subHeader: 'Informação',
            message: msg,
            buttons: ['OK']
        });

        await alert.present();
    }

    doForm() {
        console.log("Vamos criar nova ficha de pré-inscrição");
        this.navCtrl.navigateForward('/NovoCadastro');
    }

    doLogin() {
        console.log("Vamos atualizar dados de pré-inscrição de candidato existente");
        this.navCtrl.navigateForward('/FazerLogin');
    }

    getUserCaptcha() {
        if (this.captchaUserAnswer === this.captchaTxt) {
            this.captchaIsGood = true;
            console.log('captcha ok!');
        } else {
            console.log('captcha wrong!');
        }
    }

    getMyCaptcha() {
        this.captchaIsGood = false;
        const subscription = this.personService.doCaptcha()
            .subscribe(
                (captchaData: any) => {
                    console.log('Captcha recebido:');
                    this.captchaSvg = this.sanitizer.
                            bypassSecurityTrustHtml(captchaData.data);
                    var bytes = crypto.AES.
                            decrypt(captchaData.text, SECRET_KEY);
                    this.captchaTxt = bytes.toString(crypto.enc.Utf8);

                    console.log(captchaData);
                    console.log('Encrypted Captcha is: '  + captchaData.text);
                    console.log('Decrypted Captcha is: '  + this.captchaTxt);
                },
                (err) => {
                    console.log('Captcha Error!');
                    this.alertCaptchaFailure('Servidor não disponível. ' +
                        'Tente mais tarde');
                }
            );

    }


}
