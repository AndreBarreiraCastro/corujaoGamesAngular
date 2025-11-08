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
import { Classificacao } from '../../../models/classificacao.model';
import { classificaoservice } from '../../../services/classificao.service';
@Component({
  selector: 'app-classificacao-form',
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
  templateUrl: './classificao-form.html',
  styleUrl: './classificao-form.css'
})
export class ClassificacaoForm {
readonly form; 

  constructor(private fb: FormBuilder, 
              private snack: MatSnackBar,
              private classificacaoService:classificaoservice,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

    const classificacao: Classificacao = this.activatedRoute.snapshot.data['classificacao'];            

    this.form = this.fb.group({
     id: [(classificacao && classificacao.id) ? classificacao.id : null],
  classificacao: [(classificacao && classificacao.classificacao) ? classificacao.classificacao : null],
  descricao: [(classificacao && classificacao.descricao) ? classificacao.descricao : ''],
    });

  }

 

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newclassificacao = this.form.value;
console.log(newclassificacao);
    let resultado = (newclassificacao.id) ? this.classificacaoService.alterar(newclassificacao) : this.classificacaoService.incluir(newclassificacao);

    resultado.subscribe({
      next: (obj) => {
        this.router.navigateByUrl('admin/classificacaos');
        this.exibirMensagem('Classificação salvo com sucesso!');
      },
      error: (erro) => {
         this.exibirMensagem('Problema ao salvar a classificação, entre em contato com o suporte!');
      }
    })

  }

  excluir() {
    if (this.form.valid) {
      const classificacao = this.form.value;
      if (classificacao.id!=null){
        this.classificacaoService.excluir(classificacao).subscribe({
          next: () => {
            this.router.navigateByUrl('admin/classificacaos');
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
