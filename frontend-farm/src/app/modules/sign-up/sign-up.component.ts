import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UtilService } from '../../services/util.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers:[UtilService, AccountService]
})
export class SignUpComponent {
  formSignUp !: FormGroup;
  
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
    this.formSignUp = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });
  }

  signUp(){
    const formData = {
      firstName: this.formSignUp.value.firstName,
      lastName: this.formSignUp.value.lastName,
      email: this.formSignUp.value.email,
      password: this.formSignUp.value.password,
      confirmPassword: this.formSignUp.value.confirmPassword
    };

    if(this.formSignUp.value.email !== null && this.formSignUp.value.firstName !== null &&
      this.formSignUp.value.lastName !== null && this.formSignUp.value.password !== null &&
      this.formSignUp.value.confirmPassword !== null){

        if(this.formSignUp.value.password.length<8){
          this._utilService.showAlert('Seguridad Baja','La contraseña debe ser mayor a 8 caracteres','WARNING');
          return;
        }
        if(this.formSignUp.value.password !== this.formSignUp.value.confirmPassword){
          this._utilService.showAlert('Contraseña invalida','Las contraseñas no coinciden','WARNING');
          return;
        }
      this._accountService.postAccount(formData).subscribe({
        next:(signUp:any)=>{
          if(signUp.msg){
            this._utilService.showAlert('Cuenta creada','Su cuenta fue creada correctamente','SUCCESS');
            this.router.navigate(['']);
          }
        }
      })
    }
    else{
      this._utilService.showAlert('Datos incompletos','Falta completar los campos','WARNING');
    }
  }

}
