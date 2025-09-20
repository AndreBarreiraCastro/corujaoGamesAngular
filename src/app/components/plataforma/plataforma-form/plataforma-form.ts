import { Component } from '@angular/core';
import { Plataforma } from '../../../models/plataforma.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlataformaService } from '../../../services/plataforma.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-plataforma-form',
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
  templateUrl: './plataforma-form.html',
  styleUrl: './plataforma-form.css'
})
export class PlataformaForm {
readonly form; 

  constructor(private fb: FormBuilder, 
              private snack: MatSnackBar,
              private plataformaService: PlataformaService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

    const plataforma: Plataforma = this.activatedRoute.snapshot.data['plataforma'];            

    this.form = this.fb.group({
      id: [(plataforma && plataforma.id) ? plataforma.id : null],
      nomePlataforma: [(plataforma && plataforma.nomePlataforma) ? plataforma.nomePlataforma : '', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    });

  }

 

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const plataforma = this.form.value;

    let resultado = (plataforma.id) ? this.plataformaService.alterar(plataforma) : this.plataformaService.incluir(plataforma);

    resultado.subscribe({
      next: (obj) => {
        this.router.navigateByUrl('/plataformas');
        this.exibirMensagem('Coleção salvo com sucesso!');
      },
      error: (erro) => {
         this.exibirMensagem('Problema ao salvar o coleção, entre em contato com o suporte!');
      }
    })

  }

  excluir() {
    if (this.form.valid) {
      const plataforma = this.form.value;
      if (plataforma.id!=null){
        this.plataformaService.excluir(plataforma).subscribe({
          next: () => {
            this.router.navigateByUrl('/plataformas');
            this.exibirMensagem('Estado excluído com sucesso!');
          },
          error: (erro) => {
            this.exibirMensagem('Problema ao excluir o plataforma, entre em contato com o suporte!');
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
