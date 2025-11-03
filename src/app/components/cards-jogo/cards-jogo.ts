

import { Component, OnInit, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf, DecimalPipe, CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Estoque } from '../../models/estoque.model';
import { Jogo } from '../../models/jogo.model';
import { jogoservice } from '../../services/jogo.service';
import { estoqueservice } from '../../services/estoque.service';


type CardJogo = {
    id?: number;
    titulo?: string | null;
    precoUnit?: number | null;
   // estoque?: Estoque | null;
    imagemUrl?: string;
};

@Component({
    selector: 'app-plano-card-list',
    standalone: true,
    imports: [MatCardModule, NgFor, NgIf, MatButton, DecimalPipe, CurrencyPipe,],
    templateUrl: './cards-jogo.html',
    styleUrls: ['./cards-jogo.css']
})
export class JogoCardListComponent implements OnInit {

    jogos: Jogo[] = [];
    cards = signal<CardJogo[]>([]);

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
        this.jogoService.getJogo(0, 10).subscribe({
            next: (data) => {
                this.jogos = data;
                this.carregarCards();
            },
            error: () => this.showSnackbarTopPosition('Falha ao carregar jogos.')
        });
    }

    carregarCards(): void {

        const list: CardJogo[] = this.jogos.map(p => ({
            id: p.id!,
            titulo: p.titulo,
            precoUnit: p.precoUnit,
            imagemUrl: 'assets/img/jogos/padrao.png'
        }));
        this.cards.set(list);
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
}