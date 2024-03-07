import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UtilService } from '../../services/util.service';
import { PenService } from '../../services/pen.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  providers:[PenService,UtilService]
})
export class SettingsComponent implements OnInit {
  formSettings !: FormGroup;
  corralControl = new FormControl();

  corrales: any[]=[];
  capacities:any;
  availableAnimals: string[] = ['Animal 1', 'Animal 2', 'Animal 3'];

  constructor(
    private fb: FormBuilder,
    private _utilService: UtilService,
    private _penService: PenService
  ){}

  ngOnInit(): void {
    this.initForm();

    this._penService.getAllPen().subscribe((data)=>{
      this.corrales = data;
    })
  }

  initForm(){
    this.formSettings = this.fb.group({
      corral: [null, Validators.required],
      animal: [null, Validators.required],
    });
  }

  loadCapacities() {
    debugger
    const corralId = this.corralControl.value;
    const selectedCorral = this.corrales.find(corral => corral._id === corralId);
    if (selectedCorral) {
      //this.capacities = selectedCorral.capacity;
      //console.log(selectedCorral.capacity)
      //this.capacities = new Array(selectedCorral.capacity).fill(null);

      this.capacities = [];

      // Limpiar formSettings
      this.formSettings.removeControl('animal');
      for (let i = 0; i < 1; i++) {
        //this.formSettings.addControl('animal' + i, new FormControl(null, Validators.required));
        this.addAnimal(i);
      }

      // Actualizar el formulario
    this.formSettings.updateValueAndValidity();
    }
  }

  addAnimal(index: number) {
    debugger
    /*const control = this.formSettings.get('animal' + index);
    if (control) {
      control.setValue(this.availableAnimals[0]);
    }*/

    this.capacities.push(null);
    this.formSettings.addControl('animal' + index, new FormControl(null, Validators.required));
  }

  removeAnimal(index: number) {
    debugger
    /*const control = this.formSettings.get('animal' + index);
    if (control) {
      control.setValue(null);
    }*/

    this.capacities.pop(); // Eliminar el último elemento de this.capacities
    this.formSettings.removeControl('animal' + index);
  }

  resetForm() {
    this.formSettings.reset();
    this.capacities = 0;
  }

  save(){
    /*const formData = {
      animal: this.formAnimal.value.animal,
      age: this.formAnimal.value.age,
      type: this.typeControl.value
    };
    if(this.formAnimal.value.animal !== null || this.formAnimal.value.age !== null || this.formAnimal.value.type !== null){
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
    }*/
    
  }
}
