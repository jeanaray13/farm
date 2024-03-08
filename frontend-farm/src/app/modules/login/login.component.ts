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
  //Variable incial
  formLogin !: FormGroup;
  
  //Constructor
  constructor(
    private fb: FormBuilder,
    private _utilService: UtilService,
    private _accountService: AccountService,
    private router: Router
  ){}

  //Inicio del componente
  ngOnInit(): void {
    this.initForm();
  }

  //Establecimiento del formulario
  initForm(){
    this.formLogin = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  //Función que permite loguearse al menú principal
  login(){
    //Establecimiento del formato de envío
    const formData = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    };

    //Si los campos no están vacíos
    if(this.formLogin.value.email !== null || this.formLogin.value.password !== null){
      //Envío de datos
      this._accountService.verifyAccount(formData).subscribe({
        next:(login:any)=>{
          //Si recibe un mensaje
          if(login.msg=="Login Success"){
            //Mensaje de éxito y redirección
            this._utilService.showAlert('Acceso Exitoso','Iniciando sesión...','SUCCESS');
            this.router.navigate(['/farm']);
          }
        },
        error:(error:any)=>{
          //Si recibe un mensaje de error
          if(error.error.msg=="Account not exist"){
            //Mensaje de error
            this._utilService.showAlert('Error','Cuenta no existente','ERROR');
          }
          else{
            //Mensaje de advertencia
            this._utilService.showAlert('Contraseña invalida','Ingrese la contraseña correcta','WARNING');
          }
        }

      })
    }
    else{
      //Mensaje de advertencia
      this._utilService.showAlert('Datos incompletos','Falta completar los campos','WARNING');
    }
  }

}
