export interface Person {
    _id?                : string;
    nome_completo       : string;
    data_nasc           : string;
    rg_identidade?      : string;
    cpf                 : string;
    sexo                : string;
    email               : string;
    cidade              : string;
    cep                 : string;
    telefone            : string;
    deficiencia         : string;
    escola_publica?     : string;
    cotista?            : string; // sim/nao
    ppi?                : string; // nao/pre/par/ind
    renda?               : string;// acima/abaixo
    modo_pagam?          : string;// gru/isencao
    doc_entregue?        : string;// sim/nao
    txt_escola_publica?  : string;
    txt_deficiencia?     : string;
    txt_cotista?         : string;
}
