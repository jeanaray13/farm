import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UtilService } from '../../services/util.service';
import { PenService } from '../../services/pen.service';
import { CommonModule } from '@angular/common';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  providers:[PenService,UtilService, AnimalService]
})
export class SettingsComponent implements OnInit {
  //Variables iniciales
  formSettings !: FormGroup;
  corralControl = new FormControl();
  typeControl = new FormControl();

  corrales: any[]=[];
  capacities:any;
  availableAnimals: any[]=[];
  selectedCorral:any;

  //Constructor
  constructor(
    private fb: FormBuilder,
    private _utilService: UtilService,
    private _penService: PenService,
    private _animalService: AnimalService
  ){}

  //Inicio del componente
  ngOnInit(): void {
    this.initForm();

    //Obtención de los corrales
    this._penService.getAllPen().subscribe((data)=>{
      this.corrales = data;
    })
  }

  //Establecimiento del formulario
  initForm(){
    this.formSettings = this.fb.group({
      corral: [null, Validators.required],
      animal: [null, Validators.required],
    });
  }

  //Función que carga los combobox de acuerdo a la capacidad del corral
  loadCapacities() {
    this.availableAnimals = []; // Limpiar las opciones de animales cuando cambie el tipo
    const corralId = this.corralControl.value; //Obtención del id del corral seleccionado
    const type = this.typeControl.value; //Obtención del tipo del tipo de animal seleccionado
    this.selectedCorral = this.corrales.find(corral => corral._id === corralId); //Obtención de los datos del corral seleccionado
    
    //Si el corral y el tipo de animal están seleccionados
    if (this.selectedCorral && type) {
      this.capacities = [];

      // Limpiar formSettings
      this.formSettings.removeControl('animal');
      for (let i = 0; i < 1; i++) {
        this.addAnimal(); //Agrega un combobox
      }

      //Obtención de los animales por el tipo de peligrosidad
      this._animalService.getAnimalsByType(type).subscribe((data)=>{
        this.availableAnimals = data;
      })

      // Actualizar el formulario
      this.formSettings.updateValueAndValidity();
    }
  }

  //Función que permite agregar un combobox
  addAnimal() {
    // Si supera la capacidad, no agrega más combobox
    if (this.capacities.length >= this.selectedCorral.capacity) {
      return; 
    }

    //Obtención de la capacidad
    const index = this.capacities.length;

    //Agrega un combobox
    this.capacities.push(null);
    this.formSettings.addControl('animal' + index, new FormControl(null, Validators.required));
  }

  //Función que permite eliminar un combobox
  removeAnimal() {
    // Si solo queda uno, no se elimina
    if (this.capacities.length === 1) {
      return; 
    }

    //Obtención de la capacidad
    const index = this.capacities.length;

    //Elmina un combobox
    this.capacities.pop();
    this.formSettings.removeControl('animal' + index);
  }

  //Función que verifica si un animal ya ha sido seleccionado anteriormente
  shouldDisableOption(animalId: string, index: number): boolean {
    for (let i = 0; i < index; i++) {
      if (this.formSettings.get('animal' + i)?.value === animalId) {
        return true; // Si está seleccionado, deshabilitar esta opción
      }
    }
    return false; // Si no está seleccionado, dejar habilitada la opción
  }

  //Función que guarda el registro
  save(){
    const selectedAnimals = [];
    for (const controlName of Object.keys(this.formSettings.controls)) {
      if (controlName.startsWith('animal')) {
        const animalId = this.formSettings.get(controlName)?.value; //Obtención del id del animal seleccionado
        if (animalId) {
          selectedAnimals.push(animalId); //Añade al array
        }
      }
    }

    //Establecimiento del formato de envío
    const formPen = {
      animals: selectedAnimals
    }

    const formAnimal ={
      assigned: true,
      pen_id: this.corralControl.value
    }
    
    //Si los campos no están vacíos
    if(this.typeControl.value !== null && this.corralControl.value !== null){
      //Si no está seleccionado ningún animal
      if (selectedAnimals.length === 0) {
        this._utilService.showAlert('Datos incompletos', 'Debe seleccionar al menos un animal', 'WARNING');
        return;
      }
      //Envío de datos
      this._penService.putPen(this.corralControl.value,formPen).subscribe({
        next:() => {
          for (let i = 0; i < selectedAnimals.length; i++) {
            this._animalService.putAnimal(selectedAnimals[i],formAnimal).subscribe({
              next:() =>{}
            })
          }
          //Mensaje de éxito
          this._utilService.showAlert('Registro Exitoso','Se ha configurado la información correctamente','SUCCESS');
          
          //Limpieza del formulario
          this.typeControl.setValue(null);
          this.corralControl.setValue(null);
          this.availableAnimals = [];
          this.capacities.pop();
        } 
      })
    }
    else{
      //Mensaje de advertencia
      this._utilService.showAlert('Datos incompletos','Falta completar los campos','WARNING');
    }
  }
}
