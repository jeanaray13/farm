import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PenService } from '../../services/pen.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-pen',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './pen.component.html',
  styleUrl: './pen.component.css',
  providers:[PenService, UtilService]
})
export class PenComponent implements OnInit {
  //Variables iniciales
  formPen !: FormGroup;

  //Constructor
  constructor(
    private fb: FormBuilder,
    private _penService: PenService,
    private _utilService: UtilService
  ){}

  //Inicio del componente
  ngOnInit(): void {
    this.initForm();
  }

  //Establecimiento del formulario
  initForm(){
    this.formPen = this.fb.group({
      name: [null, Validators.required],
      capacity: [null, Validators.required],
    });
  }

  //Función que guarda el registro
  save(){
    //Establecimiento del formato de envío
    const formData = {
      name: this.formPen.value.name,
      capacity: this.formPen.value.capacity
    };

    //Si los campos no están vacíos
    if(this.formPen.value.name !== null && this.formPen.value.capacity !== null){
      //Envío de datos
      this._penService.sendPen(formData).subscribe({
        next:(pen:any)=>{
          //Si recibe un mensaje
          if(pen.msg){
            //Mensaje de éxito
            this._utilService.showAlert('Registro Exitoso','Se ha guardado la información correctamente','SUCCESS');
            //Limpieza del formulario
            this.formPen.reset();
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
