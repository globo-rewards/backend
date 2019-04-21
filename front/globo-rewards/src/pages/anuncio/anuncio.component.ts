import { Component, OnInit } from '@angular/core';
import { ProgramaProvider } from 'src/service/programa.provider';
import { AtividadeProvider } from 'src/service/atividade.provider';


@Component({
    selector: './anuncio.component.css',
    templateUrl: './anuncio.component.html',
    styleUrls: ['./anuncio.component.css'],
    providers: [ProgramaProvider, AtividadeProvider]
})

export class AnuncioComponent implements OnInit {

    programas: any[];
    atividades: any[];
    anuncio: any;

    marca: string;
    categoria: string;
    link: string;
    imagem: string;
    programa: string;
    atividade: string;


    constructor(
        public programaProvider: ProgramaProvider,
        public atividadeProvider: AtividadeProvider
    ) {
    }

    public ngOnInit() {
        this.getProgramas();
        this.getAtividades();

        // marca
        // categoria
        this.link = "";
        this.imagem = "";
        // programa
        // atividade
    }

    public getProgramas() {
        this.programaProvider.getProgramas()
            .subscribe(res => {
                this.programas = res as Array<any>;
            }, err => {

            });
    }






    public addAnuncio() {
        let anuncio =  {
            marca : this.marca,
            categoria: this.categoria,
            link: this.link,
            image: this.imagem,
            idPrograma: this.programa
        };
        // marca
        // categoria
        // link
        // imagem
        // idPrograma

        this.programaProvider.addAnuncio(anuncio)
            .subscribe(res => {
                console.log(res);
                alert("Inserido com sucesso!");
            }, err => {

            });
    }

    public getAtividades() {
        this.atividadeProvider.getAtividades()
            .subscribe(res => {
                this.atividades = res as Array<any>;
            }, err => {

            });
    }

}