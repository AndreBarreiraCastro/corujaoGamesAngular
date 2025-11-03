import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Jogo } from '../../../models/jogo.model';
import { jogoservice } from '../../../services/jogo.service';
import { classificaoservice } from '../../../services/classificao.service';
import { estoqueservice } from '../../../services/estoque.service';
import { PlataformaService } from '../../../services/plataforma.service';
import { discoservice } from '../../../services/disco.service';
import { cartuchoservice } from '../../../services/cartucho.service';
import { SagaService } from '../../../services/saga.service';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-jogo-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatSnackBarModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatToolbar,
  ],
  templateUrl: './jogo-form.html',
  styleUrls: ['./jogo-form.css']
})
export class JogoForm implements OnInit {
  formStep1!: FormGroup;
  formStep2!: FormGroup;
  formStep3!: FormGroup;
  formStep4!: FormGroup;

  classificacoes: any[] = [];
  estoques: any[] = [];
  sagas: any[] = [];
  midias: any[] = [];
  plataformas: any[] = [];

  midiaTipo: 'cartucho' | 'disco' | null = null;

  private snack = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private jogoService = inject(jogoservice);
  private sagaService = inject(SagaService);
  private classificacaoService = inject(classificaoservice);
  private estoqueService = inject(estoqueservice);
  private discoService = inject(discoservice);
  private cartuchoService = inject(cartuchoservice);
  private plataformaService = inject(PlataformaService);

  ngOnInit(): void {
    const jogo: Jogo = this.route.snapshot.data['jogo'];

    // Inicializa os formulários dos passos
    this.formStep1 = this.fb.group({
      id: [jogo?.id || null],
      jogoClassificacao: [jogo?.jogoClassificacao || null, Validators.required],
      jogoEstoque: [jogo?.jogoEstoque || null, Validators.required],
      jogoSaga: [jogo?.jogoSaga || null, Validators.required]
    });

    this.formStep2 = this.fb.group({
      jogoMidia: [jogo?.jogoMidia || null, Validators.required]
    });

    this.formStep3 = this.fb.group({
      titulo: [jogo?.titulo || '', Validators.required],
      genero: [jogo?.genero || '', Validators.required],
      PrecoUnit: [jogo?.PrecoUnit || null, Validators.required]
    });

    this.formStep4 = this.fb.group({
      jogoPlataforma: [[], Validators.required]
    });

    this.carregarListas();
  }

  carregarListas() {
    this.sagaService.getSaga().subscribe(data => this.sagas = data);
    this.classificacaoService.getClassificacao().subscribe(data => this.classificacoes = data);
    this.estoqueService.getEstoque().subscribe(data => this.estoques = data);
    this.plataformaService.getPlataforma().subscribe(data => this.plataformas = data);
  }

 onSelecionarTipoMidia(tipo: 'cartucho' | 'disco') {
  this.midiaTipo = tipo;

  if (tipo === 'cartucho') {
    this.cartuchoService.getCartucho().subscribe({
      next: (data) => this.midias = data,
      error: () => this.exibirMensagem('Erro ao carregar os cartuchos.')
    });
  } else if (tipo === 'disco') {
    this.discoService.getDisco().subscribe({
      next: (data) => this.midias = data,
      error: () => this.exibirMensagem('Erro ao carregar os discos.')
    });
  }
}


  salvar() {
    if (
      this.formStep1.invalid ||
      this.formStep2.invalid ||
      this.formStep3.invalid ||
      this.formStep4.invalid
    ) {
      this.exibirMensagem('Preencha todos os campos obrigatórios!');
      return;
    }

    const jogo = {
      ...this.formStep1.value,
      ...this.formStep2.value,
      ...this.formStep3.value,
      ...this.formStep4.value,
    };

    const resultado = jogo.id
      ? this.jogoService.alterar(jogo)
      : this.jogoService.incluir(jogo);

    resultado.subscribe({
      next: () => {
        this.router.navigateByUrl('/jogos');
        this.exibirMensagem('Jogo salvo com sucesso!');
      },
      error: () => {
        this.exibirMensagem('Erro ao salvar o jogo!');
      }
    });
  }

  exibirMensagem(msg: string) {
    this.snack.open(msg, 'OK', { duration: 2500, verticalPosition: 'top' });
  }
}