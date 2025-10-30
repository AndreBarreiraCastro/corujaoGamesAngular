import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Estoque } from '../../../models/estoque.model';
import { estoqueservice } from '../../../services/estoque.service';
@Component({
  selector: 'app-estoque-form',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbar,
    RouterLink
  ],
  templateUrl: './estoque-form.html',
  styleUrl: './estoque-form.css'
})
export class EstoqueForm {
  readonly form;

  constructor(private fb: FormBuilder,
    private snack: MatSnackBar,
    private estoqueService: estoqueservice,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    const estoque: Estoque = this.activatedRoute.snapshot.data['estoque'];

    this.form = this.fb.group({
      id: [(estoque && estoque.id) ? estoque.id : null],
      quantidade: [(estoque && estoque.quantidade) ? estoque.quantidade : null],
    });

  }



  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newestoque = this.form.value;
    let resultado = (newestoque.id) ? this.estoqueService.alterar(newestoque) : this.estoqueService.incluir(newestoque);
console.log(newestoque)
    resultado.subscribe({
      next: (obj) => {
        this.router.navigateByUrl('/estoques');
        this.exibirMensagem('Classificação salvo com sucesso!');
      },
      error: (erro) => {
        this.exibirMensagem('Problema ao salvar a classificação, entre em contato com o suporte!');
      }
    })

  }

  excluir() {
    if (this.form.valid) {
      const estoque = this.form.value;
      if (estoque.id != null) {
        this.estoqueService.excluir(estoque).subscribe({
          next: () => {
            this.router.navigateByUrl('/estoques');
            this.exibirMensagem('Classificação excluída com sucesso!');
          },
          error: (erro) => {
            this.exibirMensagem('Problema ao excluir o classificação, entre em contato com o suporte!');
          }
        })
      }
    }
  }

  exibirMensagem(mensagem: string): void {
    this.snack.open(mensagem, 'OK', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  onReset() {
    this.form.markAsUntouched();
    this.form.reset();
  }

}
