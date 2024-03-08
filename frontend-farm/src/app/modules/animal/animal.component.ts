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
  formAnimal !: FormGroup;
  typeControl = new FormControl();

  constructor(
    private fb: FormBuilder,
    private _animalService: AnimalService,
    private _utilService: UtilService
  ){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formAnimal = this.fb.group({
      animal: [null, Validators.required],
      age: [null, Validators.required],
      type: [null, Validators.required]
    });
  }

  save(){
    const formData = {
      animal: this.formAnimal.value.animal,
      age: this.formAnimal.value.age,
      type: this.typeControl.value
    };

    if(this.formAnimal.value.animal !== null && this.formAnimal.value.age !== null && this.typeControl.value !== null){
      this._animalService.sendAnimal(formData).subscribe({
        next:(animal:any)=>{
          if(animal.msg){
            this._utilService.showAlert('Registro Exitoso','Se ha guardado la información correctamente','SUCCESS');
            this.typeControl.setValue(null);
            this.formAnimal.reset();
          }
        }
      })
    }
    else{
      this._utilService.showAlert('Datos incompletos','Falta completar los campos','WARNING');
    }
    
  }
}
