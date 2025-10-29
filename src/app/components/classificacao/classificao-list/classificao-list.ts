import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { Classificacao } from '../../../models/classificacao.model';
import { classificaoservice } from '../../../services/classificao.service';

@Component({
  selector: 'app-classificao-list',
  imports: [MatTableModule, MatInputModule, MatFormFieldModule,
    MatToolbarModule, MatButtonModule, MatIcon,RouterLink, MatSnackBarModule,
   RouterLink],
  templateUrl: './classificao-list.html',
  styleUrl: './classificao-list.css'
})
export class ClassificaoList {
displayedColumns: string[] = ['numero', 'nome', 'acao'];
 classificacao: Classificacao[] = [];
  dataSource = new MatTableDataSource(this.classificacao);

  constructor(private classificacaoService: classificaoservice,private snack: MatSnackBar,
     private router: Router
  ){

  }

  ngOnInit(): void {
      this.classificacaoService.getClassificacao().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
      })
  }

  applyFilter(event: Event){
    const filterValue =(event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

    excluir(colecao: Classificacao) {
      
        this.classificacaoService.excluir(colecao).subscribe({
           next: () => {
             this.exibirMensagem('Estado excluído com sucesso!');
            // this.router.navigateByUrl('/colecaos');
            //window.location.reload();
            },
          error: (erro) => {
            this.exibirMensagem('Problema ao excluir o estado, entre em contato com o suporte!');
          }}
        )
      
    }
  exibirMensagem(mensagem: string): void {
  const snackRef = this.snack.open(mensagem, 'OK', { 
    duration: 200000,
    horizontalPosition: 'center',
    verticalPosition: 'top' 
  });

      // Caso o usuário clique no botão "OK"
  snackRef.onAction().subscribe(() => {
    window.location.reload();
  });

  // Caso o usuário NÃO clique, recarrega ao fechar automaticamente (10s)
  snackRef.afterDismissed().subscribe(info => {
    if (!info.dismissedByAction) {
      window.location.reload();
    }
  });
  }

}
