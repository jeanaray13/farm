import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UtilService, AccountService]
})
export class LoginComponent implements OnInit {
  formLogin !: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private _utilService: UtilService,
    private _accountService: AccountService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formLogin = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login(){
    const formData = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    };

    if(this.formLogin.value.email !== null || this.formLogin.value.password !== null){
      this._accountService.verifyAccount(formData).subscribe({
        next:(login:any)=>{
          if(login.msg=="Login Success"){
            this._utilService.showAlert('Acceso Exitoso','Iniciando sesión...','SUCCESS');
            this.router.navigate(['/farm']);
          }
        },
        error:(error:any)=>{
          if(error.error.msg=="Account not exist"){
            this._utilService.showAlert('Error','Cuenta no existente','ERROR');
          }
          else{
            this._utilService.showAlert('Contraseña invalida','Ingrese la contraseña correcta','WARNING');
          }
        }

      })
    }
    else{
      this._utilService.showAlert('Datos incompletos','Falta completar los campos','WARNING');
    }
  }

}
