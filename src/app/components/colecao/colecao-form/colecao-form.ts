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
import { Colecao } from '../../../models/colecao.model';
import { ColecaoService } from '../../../services/colecao.service';
@Component({
  selector: 'app-colecao-form',
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
  templateUrl: './colecao-form.html',
  styleUrl: './colecao-form.css'
})
export class ColecaoForm {
  readonly form; 

  constructor(private fb: FormBuilder, 
              private snack: MatSnackBar,
              private colecaoService: ColecaoService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

    const colecao: Colecao = this.activatedRoute.snapshot.data['colecao'];            

    this.form = this.fb.group({
      id: [(colecao && colecao.id) ? colecao.id : null],
      nomeColecao: [(colecao && colecao.nomeColecao) ? colecao.nomeColecao : '', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    });

  }

 

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const colecao = this.form.value;

    let resultado = (colecao.id) ? this.colecaoService.alterar(colecao) : this.colecaoService.incluir(colecao);

    resultado.subscribe({
      next: (obj) => {
        this.router.navigateByUrl('admin/colecaos');
        this.exibirMensagem('Coleção salvo com sucesso!');
      },
      error: (erro) => {
         this.exibirMensagem('Problema ao salvar o coleção, entre em contato com o suporte!');
      }
    })

  }

  excluir() {
    if (this.form.valid) {
      const colecao = this.form.value;
      if (colecao.id!=null){
        this.colecaoService.excluir(colecao).subscribe({
          next: () => {
            this.router.navigateByUrl('admin/colecaos');
            this.exibirMensagem('Estado excluído com sucesso!');
          },
          error: (erro) => {
            this.exibirMensagem('Problema ao excluir o colecao, entre em contato com o suporte!');
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
