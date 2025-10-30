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
import { Disco } from '../../../models/disco.model';
import { discoservice } from '../../../services/disco.service';
@Component({
  selector: 'app-disco-form',
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
  templateUrl: './disco-form.html',
  styleUrl: './disco-form.css'
})
export class DiscoForm {
  readonly form;

  constructor(private fb: FormBuilder,
    private snack: MatSnackBar,
    private discoService: discoservice,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    const disco: Disco = this.activatedRoute.snapshot.data['disco'];

    this.form = this.fb.group({
      id: [(disco && disco.id) ? disco.id : null],
      desenvolvedora: [(disco && disco.desenvolvedora) ? disco.desenvolvedora : ''],
      modoJogo: [(disco && disco.modoJogo) ? disco.modoJogo : ''],
    });

  }



  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newdisco = this.form.value;
    let resultado = (newdisco.id) ? this.discoService.alterar(newdisco) : this.discoService.incluir(newdisco);
console.log(newdisco)
    resultado.subscribe({
      next: (obj) => {
        this.router.navigateByUrl('/discos');
        this.exibirMensagem('Discos salvo com sucesso!');
      },
      error: (erro) => {
        this.exibirMensagem('Problema ao salvar a classificação, entre em contato com o suporte!');
      }
    })

  }

  excluir() {
    if (this.form.valid) {
      const disco = this.form.value;
      if (disco.id != null) {
        this.discoService.excluir(disco).subscribe({
          next: () => {
            this.router.navigateByUrl('/discos');
            this.exibirMensagem('Discos excluída com sucesso!');
          },
          error: (erro) => {
            this.exibirMensagem('Problema ao excluir o disco, entre em contato com o suporte!');
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
