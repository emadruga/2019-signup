import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person }     from '../interfaces/person';
import { Observable } from 'rxjs';
import { environment, SERVER_URL } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class PersonService {

    private person: Person;
    private loggedIn: boolean;

    constructor(private http: HttpClient) {

        this.person = undefined;
    }

    doAuthenticateLogin(credentialData) : Observable<Person> {

        console.log(credentialData);

        let url =  SERVER_URL + '/api/login';
        let hdrs =  new HttpHeaders().set('Content-Type', 'application/json');
        console.log("Using " + url);

        return  this.http.post<Person>(url,JSON.stringify(credentialData),
            {
                headers: hdrs,
            });
    }

    setUserLoggedIn() : void {
        this.loggedIn = true;
    }

    setUserLoggedOut() : void {
        this.loggedIn = false;
    }

    isUserLoggedIn() : boolean {
        return (this.loggedIn === true);
    }

    persistPersonLocally(p: Person) {
        this.person = p;
        if (typeof this.person.cotista === 'undefined') {
            this.person.txt_cotista = 'Não';
        } else {
            // it is defined indeed
            if (this.person.cotista === "nao") {
                this.person.txt_cotista = 'Não';
            } else {
                this.person.txt_cotista = 'Sim';
            }
        }

        if (typeof this.person.deficiencia === 'undefined') {
            this.person.txt_deficiencia = 'Não';
        } else {
            // it is defined indeed
            if (this.person.deficiencia === "nao") {
                this.person.txt_deficiencia = 'Não';
            } else {
                this.person.txt_deficiencia = 'Sim';
            }
        }

        if (typeof this.person.modo_pagam === 'undefined') {
            this.person.txt_modo_pagam = 'Guia';
        } else {
            // it is defined indeed
            if (this.person.modo_pagam === "isencao") {
                this.person.txt_modo_pagam = 'Isenção';
            } else {
                this.person.txt_modo_pagam = 'Guia';
            }
        }
	
        if (typeof this.person.rg_identidade === 'undefined') {
            this.person.txt_rg_identidade = '';
        } else {
            // it is defined indeed
            this.person.txt_rg_identidade =
		this.person.rg_identidade.replace(/\-/g, '');
        }
    }

    getLocalPerson() : Person {
        return this.person;
    }

    resetLocalPerson() : void {
        this.person = undefined;
    }

    weHavePerson() : boolean {
        return (this.person !== undefined);
    }

    updateLocalPerson(nome, email, telefone) : void {

	if (this.person !== undefined) {
            this.person.nome_completo  = nome;
            this.person.email          = email;
            this.person.telefone       = telefone;
	}
    }
    
    updateInfo(nome, dnasc, cpf, sexo, email, cidade, celular, defic) : void {
	if (this.person !== undefined) {
            this.person.nome_completo             = nome;
            this.person.data_nasc                 = dnasc;
            this.person.cpf                       = cpf;
            this.person.sexo                      = sexo;
            this.person.email                     = email;
            this.person.cidade                    = cidade;
            this.person.telefone                  = celular;
            this.person.deficiencia               = defic;
	}
    }
    
    updateOpcoesCotas(cotista, ppi, renda) : void {
	if (this.person !== undefined) {
            this.person.cotista                   = cotista;
            this.person.ppi                       = ppi;
            this.person.renda                     = renda;
	}
    }
    
    doCaptcha() : Observable<any> {
        console.log('Pedindo captcha...');

        let url = SERVER_URL + '/api/captcha';
        let hdrs =  new HttpHeaders().set('Content-Type', 'application/json');
        console.log('Using ' + url);

        return  this.http.get<any>(url,
            {
                headers: hdrs,
            });
    }

    saveApplicant(personData) : Observable<Person> {

        console.log(personData);

        let url = SERVER_URL + '/api/rooms/insert';
        let hdrs =  new HttpHeaders().set('Content-Type', 'application/json');
        console.log("Using " + url);

        return  this.http.post<Person>(url,JSON.stringify(personData),
            {
                headers: hdrs,
            });
    }

    updateApplicant(personData) : Observable<Person> {

        console.log("Registro a ser atualizado para:");
        console.log(personData);

        let url = SERVER_URL + '/api/rooms/update';
        let hdrs =  new HttpHeaders().set('Content-Type', 'application/json');
        console.log("Using " + url);

        return  this.http.put<Person>(url,JSON.stringify(personData),
            {
                headers: hdrs,
            });
    }

}
