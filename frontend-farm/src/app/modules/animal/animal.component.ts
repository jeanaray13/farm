import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilService } from '../../services/util.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-animal',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './animal.component.html',
  styleUrl: './animal.component.css',
  providers:[AnimalService, UtilService]
})
export class AnimalComponent implements OnInit {
  //Variables iniciales
  formAnimal !: FormGroup;
  typeControl = new FormControl();

  //Constructor
  constructor(
    private fb: FormBuilder,
    private _animalService: AnimalService,
    private _utilService: UtilService
  ){}

  //Inicio del componente
  ngOnInit(): void {
    this.initForm();
  }

  //Establecimiento del formulario
  initForm(){
    this.formAnimal = this.fb.group({
      animal: [null, Validators.required],
      age: [null, Validators.required],
      type: [null, Validators.required]
    });
  }

  //Función que guarda el registro
  save(){
    //Establecimiento del formato de envío
    const formData = {
      animal: this.formAnimal.value.animal,
      age: this.formAnimal.value.age,
      type: this.typeControl.value
    };

    //Si los campos no están vacíos
    if(this.formAnimal.value.animal !== null && this.formAnimal.value.age !== null && this.typeControl.value !== null){
      //Envío de datos
      this._animalService.sendAnimal(formData).subscribe({
        next:(animal:any)=>{
          //Si recibe un mensaje de éxito
          if(animal.msg){
            //Mensaje de éxito
            this._utilService.showAlert('Registro Exitoso','Se ha guardado la información correctamente','SUCCESS');
            //Limpieza del formulario
            this.typeControl.setValue(null);
            this.formAnimal.reset();
          }
        }
      })
    }
    else{
      //Mensaje advertencia
      this._utilService.showAlert('Datos incompletos','Falta completar los campos','WARNING');
    }
    
  }
}
