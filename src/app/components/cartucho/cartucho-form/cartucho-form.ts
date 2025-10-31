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
import {Cartucho } from '../../../models/cartucho.model';
import { cartuchoservice } from '../../../services/cartucho.service';
@Component({
  selector: 'app-cartucho-form',
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
  templateUrl: './cartucho-form.html',
  styleUrl: './cartucho-form.css'
})
export class CartuchoForm {
  readonly form;

  constructor(private fb: FormBuilder,
    private snack: MatSnackBar,
    private cartuchoService: cartuchoservice,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    const cartucho:Cartucho = this.activatedRoute.snapshot.data['cartucho'];

    this.form = this.fb.group({
      id: [(cartucho && cartucho.id) ? cartucho.id : null],
      desenvolvedora: [(cartucho && cartucho.desenvolvedora) ? cartucho.desenvolvedora : ''],
      modoJogo: [(cartucho && cartucho.modoJogo) ? cartucho.modoJogo : ''],
    });

  }



  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newcartucho = this.form.value;
    let resultado = (newcartucho.id) ? this.cartuchoService.alterar(newcartucho) : this.cartuchoService.incluir(newcartucho);
console.log(newcartucho)
    resultado.subscribe({
      next: (obj) => {
        this.router.navigateByUrl('/cartuchos');
        this.exibirMensagem('Discos salvo com sucesso!');
      },
      error: (erro) => {
        this.exibirMensagem('Problema ao salvar a classificação, entre em contato com o suporte!');
      }
    })

  }

  excluir() {
    if (this.form.valid) {
      const cartucho = this.form.value;
      if (cartucho.id != null) {
        this.cartuchoService.excluir(cartucho).subscribe({
          next: () => {
            this.router.navigateByUrl('/cartuchos');
            this.exibirMensagem('Discos excluída com sucesso!');
          },
          error: (erro) => {
            this.exibirMensagem('Problema ao excluir o cartucho, entre em contato com o suporte!');
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
