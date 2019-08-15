import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { PersonService }  from '../services/person.service';
import { Person }  from '../interfaces/person';

@Component({
    selector: 'app-settings',
    templateUrl: 'settings.page.html',
    styleUrls: ['settings.page.scss']
})

export class SettingsPage {

    private localPerson: Person;

    private nome_completo: FormControl;
    private data_nasc         : FormControl;
    private email                 : FormControl;
    private telefone             : FormControl;
    private escola_publica  : FormControl;
    private cotista               : FormControl;

    private accented_regex = '^[a-zA-Z \u00C0-\u017F]+$';
    public  signUpForm       : FormGroup;

    constructor(private personService: PersonService,
                private alertCtrl: AlertController,
                private navParams: NavParams,
                private formBuilder: FormBuilder,
                private modalCtrl: ModalController)
    {
        this.localPerson = 	this.personService.getLocalPerson();
        console.log("Modal recebeu: ");
        console.log(this.localPerson);

        this.nome_completo = this.formBuilder.control('',  Validators.compose([
            Validators.required,
            Validators.maxLength(40),
            Validators.pattern(this.accented_regex)
        ]));
        this.email         = this.formBuilder.control('', Validators.required);
        this.telefone       = this.formBuilder.control('', Validators.required);
        this.escola_publica         = this.formBuilder.control('', Validators.required);
        this.cotista       = this.formBuilder.control('', Validators.required);

        if (this.localPerson !== null) {
            this.nome_completo .setValue(this.localPerson. nome_completo );
            this.email                  .setValue(this.localPerson. email         );
            this.cotista                .setValue(this.localPerson. cotista       );
            this.telefone              .setValue(this.localPerson. telefone        );
            this.escola_publica   .setValue(this.localPerson. escola_publica   );
        } else {
            console.log("Erro: tentativa de editar  registro vazio!");
            this.close();
        }

        this.signUpForm    = this.formBuilder.group({
            nome_completo: this.nome_completo,
            email                     : this.email,
            cotista                   : this.cotista,
            telefone                 : this.telefone,
            escola_publica      : this.escola_publica
        });
    }

    public onKeyUp(event: any) {

        let newValue = event.target.value;

        let regExp = new RegExp(this.accented_regex);

        if (! regExp.test(newValue)) {
            event.target.value = newValue.slice(0, -1);
        }
    }

    async alertProblemaFormato(msg1, msg2: string) {
        const alert = await this.alertCtrl.create({
            header: 'Formato',
            subHeader: msg1,
            message: msg2,
            buttons: ['OK']
        });
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

    save(): void {

        this.personService.updateLocalPerson(
            this.nome_completo.value.trim(),
            this.email.value.trim(),
            this.cotista.value,
            this.escola_publica.value,
            this.telefone.value
        );

        let personData = this.personService.getLocalPerson();

        if (!this.nome_completo.valid) {
            this.alertProblemaFormato("Nome Completo",
                "Usar até 40 letras no nome e sobrenome, separados por espaço." );
            return;
        }

        console.log("Salvando modificações...");
        console.log(personData);
        this.personService.updateApplicant(personData)
            .subscribe(
                (person: Person) => {
                    console.log("Id recebido: " + person._id);
                    this.personService.persistPersonLocally(person);
                    this.alertInsertOk("Informações atualizadas!");
                },
                (err) => {
                    console.log(err);
                    this.alertServerFailure("Por favor, tente mais tarde!");
                }
            );

        this.close();
    }

    close(): void {
        this.modalCtrl.dismiss();
    }

}
