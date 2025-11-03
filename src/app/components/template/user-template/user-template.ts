import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

// Imports do Angular Material para um Header/Footer profissional
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge'; // Para o ícone do carrinho

@Component({
  selector: 'app-user-template',
  
  // 1. Adicionar `standalone: true`
  standalone: true, 
  
  // 2. Adicionar todos os módulos necessários
  imports: [
    CommonModule,
    RouterOutlet,     // Essencial para carregar outras páginas
    RouterModule,     // Para os links (routerLink)
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatBadgeModule
  ],
  templateUrl: './user-template.html',
  styleUrl: './user-template.css'
})
export class UserTemplate {

  // Signal para simular a contagem de itens no carrinho
  cartItemCount = signal(0); 

  // Você pode adicionar um método aqui para testar
  simularAdicionarAoCarrinho() {
    this.cartItemCount.update(count => count + 1);
  }

}
