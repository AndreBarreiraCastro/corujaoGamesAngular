

import { Component, OnInit, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf, DecimalPipe, CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Estoque } from '../../models/estoque.model';
import { Jogo } from '../../models/jogo.model';
import { jogoservice } from '../../services/jogo.service';
import { estoqueservice } from '../../services/estoque.service';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CustomPaginatorIntl } from '../jogo/jogo-list/custom-paginator-intl';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


type CardJogo = {
    id?: number;
    titulo?: string | null;
    PrecoUnit?: number | null;
    imagemUrl?: string;
};

@Component({
    selector: 'app-plano-card-list',
    standalone: true,
    imports: [MatCardModule, NgFor, NgIf, MatButton, DecimalPipe, CurrencyPipe, MatPaginatorModule, MatPaginator, MatFormFieldModule,
        MatInputModule],
    templateUrl: './cards-jogo.html',
    providers: [
        { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
    ],
    styleUrls: ['./cards-jogo.css']
})
export class JogoCardListComponent implements OnInit {

    jogos: Jogo[] = [];
    private allCards = signal<CardJogo[]>([]);
    cards = signal<CardJogo[]>([]);
    totalRecords = 0;
    page = 0;
    pageSize = 100;
    constructor(
        private jogoService: jogoservice,
        private snackBar: MatSnackBar,
        private estoqueService: estoqueservice,
    ) { }

    ngOnInit(): void {
        this.carregarJogos();
    }

    carregarJogos(): void {
        // ajuste os parâmetros de paginação conforme seu backend
        this.jogoService.getJogo(this.page, this.pageSize).subscribe({
            next: (data) => {
                this.jogos = data;
                this.carregarCards();
            }
            ,
            error: () => this.showSnackbarTopPosition('Falha ao carregar jogos.')
        });
        this.jogoService.count().subscribe(data => {
            this.totalRecords = data;

        });
    }

    carregarCards(): void {

        const list: CardJogo[] = this.jogos.map(p => ({
            id: p.id!,
            titulo: p.titulo,
            imagemUrl: 'assets/img/jogos/padrao.png',
            PrecoUnit: p.PrecoUnit
        }));
        this.cards.set(list);
        this.allCards.set(list);
    }
    filtrarCards(event: Event): void {
        const input = event.target as HTMLInputElement;
        const termo = input.value.toLowerCase(); // Pega o valor digitado

        if (!termo) {
            // Se o campo estiver vazio, restaura a lista completa
            this.cards.set(this.allCards());
            return;
        }

        // Filtra a lista mestre
        const listaFiltrada = this.allCards().filter(card =>
            card.titulo?.toLowerCase().startsWith(termo)
        );

        // Atualiza o signal 'cards' que a tela está lendo
        this.cards.set(listaFiltrada);
    }
    adicionarAoCarrinho(card: CardJogo): void {
        this.showSnackbarTopPosition(`O Jogo (${card.titulo}) foi adicionado ao carrinho.`);

    }

    showSnackbarTopPosition(content: string): void {
        this.snackBar.open(content, 'fechar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
        });
    }

    paginar(event: PageEvent): void {
        this.page = event.pageIndex;
        this.pageSize = event.pageSize;
        this.ngOnInit();
    }
}