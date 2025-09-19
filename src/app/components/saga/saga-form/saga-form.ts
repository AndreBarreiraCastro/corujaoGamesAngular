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
import { SagaService } from '../../../services/saga.service';
import { Saga } from '../../../models/saga.model';
@Component({
  selector: 'app-saga-form',
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
  templateUrl: './saga-form.html',
  styleUrl: './saga-form.css'
})
export class SagaForm {
readonly form; 

  constructor(private fb: FormBuilder, 
              private snack: MatSnackBar,
              private sagaService: SagaService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

    const saga: Saga = this.activatedRoute.snapshot.data['saga'];            

    this.form = this.fb.group({
      id: [(saga && saga.id) ? saga.id : null],
      nomeSaga: [(saga && saga.nomeSaga) ? saga.nomeSaga : '', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    });

  }

 

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const saga = this.form.value;

    let resultado = (saga.id) ? this.sagaService.alterar(saga) : this.sagaService.incluir(saga);

    resultado.subscribe({
      next: (obj) => {
        this.router.navigateByUrl('/sagas');
        this.exibirMensagem('Coleção salvo com sucesso!');
      },
      error: (erro) => {
         this.exibirMensagem('Problema ao salvar o coleção, entre em contato com o suporte!');
      }
    })

  }

  excluir() {
    if (this.form.valid) {
      const saga = this.form.value;
      if (saga.id!=null){
        this.sagaService.excluir(saga).subscribe({
          next: () => {
            this.router.navigateByUrl('/sagas');
            this.exibirMensagem('Estado excluído com sucesso!');
          },
          error: (erro) => {
            this.exibirMensagem('Problema ao excluir o saga, entre em contato com o suporte!');
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
