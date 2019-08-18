import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as cpf from "@fnando/cpf";
import { PersonService } from '../services/person.service';
import { Person }        from '../interfaces/person';
import { DataNascValidator } from '../validators/date.validators';

@Component({
    selector: 'app-novo-cadastro',
    templateUrl: './novo-cadastro.page.html',
    styleUrls: ['./novo-cadastro.page.scss'],
})

export class NovoCadastroPage implements OnInit {

    public  isSaveButtonEnabled: boolean;
    public  isLiabilityWarningShown: boolean;
    private localPerson: Person;
    // Is it a brand new insert or editing existing person ??
    private isInsert: boolean;

    private cpf_validators: any;

    private nome_completo: FormControl;
    private data_nasc    : FormControl;
    private rg_identidade: FormControl;
    private cpf          : FormControl;
    private sexo         : FormControl;
    private email        : FormControl;
    private cidade       : FormControl;
    private cep          : FormControl;
    private telefone     : FormControl;
    private deficiencia     : FormControl;
    private escola_publica  : FormControl;
    private cotista      : FormControl;
    private renda       : FormControl;

    private accented_regex = '^[a-zA-Z \u00C0-\u017F]+$';

    public signUpForm       : FormGroup;

    constructor(private personService: PersonService,
                private alertCtrl: AlertController,
                private formBuilder: FormBuilder,
                private navCtrl: NavController) {

        this.localPerson            = undefined;
        this.isInsert               = true;
        this.isSaveButtonEnabled    = false;
        this.isLiabilityWarningShown    = false;
        this.cpf_validators = Validators.compose([
            Validators.required,
            Validators.minLength(14),
            Validators.maxLength(14),
            Validators.pattern('^[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}$')
        ]);

        this.nome_completo = this.formBuilder.control('',  Validators.compose([
            Validators.required,
            Validators.maxLength(40),
            Validators.pattern(this.accented_regex)
        ]));
        this.data_nasc     = this.formBuilder.control('', Validators.compose([
            Validators.required,
            //DataNascValidator.validDataNasc,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern('^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$')
        ]));
        this.rg_identidade = this.formBuilder.control('', Validators.required);
        this.cpf           = this.formBuilder.control('', this.cpf_validators);
        this.sexo          = this.formBuilder.control('', Validators.required);
        this.email         = this.formBuilder.control('',  Validators.compose([
            Validators.required,
            Validators.maxLength(40),
            Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
        ]));

        this.cidade        = this.formBuilder.control('', Validators.required);
        this.cep           = this.formBuilder.control('', Validators.required);
        this.telefone      = this.formBuilder.control('',  Validators.compose([
            Validators.required,
            Validators.minLength(13),
            Validators.maxLength(13),
            Validators.pattern('^[0-9]{2}\-[0-9]{5}\-[0-9]{4}$')
        ]));
        this.deficiencia   = this.formBuilder.control('', Validators.required);
        this.escola_publica   = this.formBuilder.control('', Validators.required);
        this.cotista       = this.formBuilder.control('', Validators.required);
        this.renda         = this.formBuilder.control('', Validators.required);

        this.signUpForm    = this.formBuilder.group({
            nome_completo: this.nome_completo,
            data_nasc    : this.data_nasc    ,
            rg_identidade: this.rg_identidade,
            cpf          : this.cpf          ,
            sexo         : this.sexo         ,
            email        : this.email        ,
            cidade       : this.cidade       ,
            cep          : this.cep          ,
            telefone     : this.telefone     ,
            deficiencia  : this.deficiencia  ,
            escola_publica  : this.escola_publica  ,
            cotista      : this.cotista,
            renda     : this.renda
        });
    }

    ngOnInit() {

        this.localPerson = this.personService.getLocalPerson();

        if (this.localPerson !== undefined) {

            // The page is going to be used to modify existing person
            // rather than add a new person.
            this.isInsert = false;

            this.nome_completo .setValue(this.localPerson. nome_completo );
            this.data_nasc     .setValue(this.localPerson. data_nasc     );
            this.cpf           .setValue(this.localPerson. cpf           );
            this.rg_identidade .setValue(this.localPerson. rg_identidade );
            this.sexo          .setValue(this.localPerson. sexo          );
            this.email         .setValue(this.localPerson. email         );
            this.cidade        .setValue(this.localPerson. cidade        );
            this.cep           .setValue(this.localPerson. cep           );
            this.telefone      .setValue(this.localPerson. telefone      );
            this.deficiencia   .setValue(this.localPerson. deficiencia   );
            this.escola_publica   .setValue(this.localPerson. escola_publica   );
            this.cotista       .setValue(this.localPerson. cotista       );
            this.renda       .setValue(this.localPerson. renda      );

        } else {
            this.isInsert = true;
        }
    }

    doCancel(): void {
        this.personService.resetLocalPerson();
        this.navCtrl.back();
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

    async alertConflict(msg: string) {
        const alert = await this.alertCtrl.create({
            header: 'Conflito',
            subHeader: 'CPF já existente',
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

    async alertProblemaFormato(msg1, msg2: string) {
        const alert = await this.alertCtrl.create({
            header: 'Formato',
            subHeader: msg1,
            message: msg2,
            buttons: ['OK']
        });

        await alert.present();
    }

    async alertLiability(msg1, msg2: string) {
        const alert = await this.alertCtrl.create({
            header: 'Aviso',
            subHeader: msg1,
            message: msg2,
            buttons: [
                {
                    text: 'Revisar',
                    role: 'cancel',
                    handler: () => {
                        console.log('Revisar a ficha...');
                    }
                },
                {
                    text: 'Salvar',
                    handler: () => {
                        this.doSave();
                    }
                }
            ]
        });

        await alert.present();
    }

    async alertCampoObrigatorio(msg: string) {
        const alert = await this.alertCtrl.create({
            header: 'Formato',
            subHeader: 'Campo Obrigatório',
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

    public onKeyUp(event: any) {

        let newValue = event.target.value;

        let regExp = new RegExp(this.accented_regex);

        if (! regExp.test(newValue)) {
            event.target.value = newValue.slice(0, -1);
        }
    }

    doInfo() {
        this.alertInfo("Cotistas",
            "Por lei, todos os candidatos que desejam o benefício de  cotas " +
            "devem ter cursado escola pública integralmente nos ensinos fundamental e médio. " +
            "Candidatos que desejam benefício por renda familiar, deverão comprovar " +
            "renda familiar abaixo de 1,5 salários mínimos. " +
            "Maiores detalhes no Edital de Seleção.");
    }
    
    doPagamento() {
        console.log("Vamos pagar...");
        this.navCtrl.navigateForward('/pagamento');
    }

    doSaveWithAlert() {
        this.alertLiability("Revise seus Dados",
            "Nos termos do Edital de Seleção, informações incorretas " +
            "poderão causar o cancelamento posterior da inscrição.");
        this.isLiabilityWarningShown = true;
    }


    doSave(): void {

        console.log("Data nasc : " + this.data_nasc.value);
        console.log("Data nasc is valid: " +
            DataNascValidator.isValidDate(this.data_nasc.value));
        let personData = {
            nome_completo: this.nome_completo.value.trim(),
            data_nasc:     this.data_nasc.value,
            rg_identidade: this.rg_identidade.value,
            cpf:	   this.cpf.value,
            sexo:	   this.sexo.value,
            email:	   this.email.value,
            cidade:	   this.cidade.value,
            cep:	   this.cep.value,
            telefone:	   this.telefone.value,
            deficiencia:   this.deficiencia.value,
            escola_publica:   this.escola_publica.value,
            cotista:       this.cotista.value,
            renda:       this.renda.value
        };

        if (!this.nome_completo.valid) {
            this.alertProblemaFormato("Nome Completo",
                "Usar até 40 letras no nome e sobrenome, separados por espaço." );
            return;
        }

        if (!this.data_nasc.valid ||
            !DataNascValidator.isValidDate(this.data_nasc.value)) {
            this.alertProblemaFormato("Data de Nascimento",
                "Informar dia, mês e ano no formato 'dd-mm-aaaa'. Ex: 28-02-1996 e 31-12-2008." );
            return;
        }
        if (!this.cpf.valid) {
            this.alertProblemaFormato("Informação de CPF",
                "Usar dígitos e separadores '.' e '-'. Ex: 123.456.789-00" );
            return;
        }

        if (!cpf.isValid(this.cpf.value)) {
            this.alertProblemaFormato("Informação de CPF",
                "Não válido. Digitos corretos?" );
            return;
        }

        if (!this.email.valid) {
            this.alertProblemaFormato("Informação de Email",
                "Informar seu email no formato correto. Ex: marcela@gmail.com, leonardo97@uol.com.br" );
            return;
        }
        if (!this.telefone.valid) {
            this.alertProblemaFormato("Informação de Celular",
                "Informar seu celular para contato com o código de área separado por '- '. Ex: 21-99999-1234" );
            return;
        }

        if (this.isInsert) {

            console.log("Sending info to database...");
            console.log(personData);
            this.personService.saveApplicant(personData)
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
            console.log("Updating...");
            console.log(personData);
            this.personService.updateApplicant(personData)
                .subscribe(
                    (person: Person) => {
                        console.log("Id recebido: " + person._id);
                        this.alertInsertOk("Informações atualizadas!");
                        this.personService.persistPersonLocally(person);
                        this.navCtrl.navigateRoot('/Perfil');
                    },
                    (err) => {
                        console.log(err);
                        if (err.status == 500) {
                            this.alertConflict("Registro desconhecido.");
                        } else {
                            this.alertServerFailure("Por favor, tente mais tarde!");
                        }
                    }
                );

        }
    }


}
 
