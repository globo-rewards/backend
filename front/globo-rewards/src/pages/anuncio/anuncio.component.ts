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
    anunciantes: any [];

    constructor(
        public programaProvider: ProgramaProvider,
        public atividadeProvider: AtividadeProvider
    ) {
    }

    public ngOnInit() {
        this.getProgramas();
        this.getAtividades();

        // marca
        this.categoria = "AUTOMOBILISTICA"
        this.link = "https://www.youtube.com/watch?v=scvrzNOKjdM";
        this.imagem = "https://www.sensorsexpo.com/sites/sensorsexpo/files/til_image/s17_eventicons3.png";
        this.programa = "a57435360a4e19824bd2bede2d1758d5";
        this.atividade = "f82255959faffa64e0e247b13e5c1d01";
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
            imagem: this.imagem,
            idPrograma: this.programa
        };

        this.programaProvider.addAnuncio(anuncio)
            .subscribe(res => {
                console.log(res);
                alert("Inserido com sucesso!");
                this.getAnunciantes();
            }, err => {

            });
    }

    public getAtividades() {
        this.atividadeProvider.getAtividades()
            .subscribe(res => {
                this.atividades = res as Array<any>;
                this.getAnunciantes();
            }, err => {

            });
    }

    public getAnunciantes() {
        this.programaProvider.getAnunciantes()
            .subscribe(res => {
                this.anunciantes = res as Array<any>;
            }, err => {

            });
    }

}