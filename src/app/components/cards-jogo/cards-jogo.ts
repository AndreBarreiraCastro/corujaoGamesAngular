import { CurrencyPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

type CardJogo = {
  idJogo?: number;
  titulo?: string|null;
  preco?: number|null;
 /*  maxAlunos?: number|null;
  maxProfessores?: number|null;
  descontoAnual?: number|null;
  */ imagemUrl?: string;
};
@Component({
  selector: 'app-cards-jogo',
  imports: [MatCardModule, NgFor, NgIf, MatButton, DecimalPipe, CurrencyPipe],
  templateUrl: './cards-jogo.html',
  styleUrl: './cards-jogo.css'
})
export class CardsJogo implements OnInit {

  jogos: Jogo[] = [];
  cards = signal<CardJogo[]>([]);

  constructor(
    private jogoService: JogoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarJogos();
  }

  
  carregarJogos(): void {
    // ajuste os parâmetros de paginação conforme seu backend
    this.jogoService.getJogos(0, 10).subscribe({
      next: (data) => {
        this.jogos = data;
        this.carregarCards();
      },
      error: () => this.showSnackbarTopPosition('Falha ao carregar jogos.')
    });
  }

  carregarCards(): void {
    const list: CardJogos[] = this.jogos.map(p => ({
      idJogo: p.id!,
      titulo: p.nome,
      /* preco: p.precoMensal,
      maxAlunos: p.maxAlunos,
      maxProfessores: p.maxProfessores,
      descontoAnual: p.descontoAnual,
       */imagemUrl: 'assets/img/planos/default.png'
    }));
    this.cards.set(list);
  }

  adicionarAoCarrinho(card: CardJogo): void {
    this.showSnackbarTopPosition(`O Jogo (${card.jogo}) foi adicionado ao carrinho.`);

  }

  showSnackbarTopPosition(content: string): void {
    this.snackBar.open(content, 'fechar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}

