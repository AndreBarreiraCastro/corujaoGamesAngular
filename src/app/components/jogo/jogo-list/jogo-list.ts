
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { MatIcon } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


import { Jogo } from '../../../models/jogo.model';
import { jogoservice } from '../../../services/jogo.service';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { CustomPaginatorIntl } from './custom-paginator-intl';

@Component({
  selector: 'app-jogo-list',
  imports: [MatTableModule, MatInputModule, MatFormFieldModule,
    MatToolbarModule, MatButtonModule, MatIcon, RouterLink, MatSnackBarModule,
    RouterLink,MatPaginator],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ],
  templateUrl: './jogo-list.html',
  styleUrl: './jogo-list.css'
})
export class JogoList {

  displayedColumns: string[] = ['numero', 'titulo', 'PrecoUnit', 'acao'];
  jogo: Jogo[] = [];
  dataSource = new MatTableDataSource(this.jogo);
  totalRecords = 0;
  page = 0;
  pageSize = 2;

  constructor(private jogoService: jogoservice, private snack: MatSnackBar,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.jogoService.getJogo(this.page, this.pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })

    this.jogoService.count().subscribe(data => {
      this.totalRecords = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  excluir(jogo: Jogo) {

    this.jogoService.excluir(jogo).subscribe({
      next: () => {
        this.exibirMensagem('Estado excluído com sucesso!');
         this.router.navigateByUrl('admin/jogos');
        window.location.reload();
      },
      error: (erro) => {
        this.exibirMensagem('Problema ao excluir o estado, entre em contato com o suporte!');
      }
    }
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
  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

}
