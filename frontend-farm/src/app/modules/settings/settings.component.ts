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
  formSettings !: FormGroup;
  corralControl = new FormControl();

  corrales: any[]=[];
  capacities:any;
  availableAnimals: any[]=[];
  selectedCorral:any;

  typeControl = new FormControl();

  constructor(
    private fb: FormBuilder,
    private _utilService: UtilService,
    private _penService: PenService,
    private _animalService: AnimalService
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
    this.onTypeChange();
    const corralId = this.corralControl.value;
    const type = this.typeControl.value;
    this.selectedCorral = this.corrales.find(corral => corral._id === corralId);
    if (this.selectedCorral && type) {
      this.capacities = [];

      // Limpiar formSettings
      this.formSettings.removeControl('animal');
      for (let i = 0; i < 1; i++) {
        this.addAnimal();
      }

      this._animalService.getAnimalsByType(type).subscribe((data)=>{
        this.availableAnimals = data;
      })

      // Actualizar el formulario
      this.formSettings.updateValueAndValidity();
    }
  }

  addAnimal() {
    if (this.capacities.length >= this.selectedCorral.capacity) {
      return; // Si ya se alcanzó, salir de la función sin agregar más elementos
    }

    const index = this.capacities.length;

    this.capacities.push(null);
    this.formSettings.addControl('animal' + index, new FormControl(null, Validators.required));
  }

  removeAnimal() {
    if (this.capacities.length === 1) {
      return; // Si solo queda uno, salir de la función sin eliminarlo
    }

    const index = this.capacities.length;

    this.capacities.pop(); // Eliminar el último elemento de this.capacities
    this.formSettings.removeControl('animal' + index);
  }

  shouldDisableOption(animalId: string, index: number): boolean {
    // Verifica si el animalId ya ha sido seleccionado en los combobox anteriores
    for (let i = 0; i < index; i++) {
      if (this.formSettings.get('animal' + i)?.value === animalId) {
        return true; // Si está seleccionado, deshabilitar esta opción
      }
    }
    return false; // Si no está seleccionado, dejar habilitada la opción
  }

  onTypeChange() {
    // Limpiar las opciones de animales cuando cambie el tipo
    this.availableAnimals = [];
  }

  save(){
    const selectedAnimals = [];
    for (const controlName of Object.keys(this.formSettings.controls)) {
      if (controlName.startsWith('animal')) {
        const animalId = this.formSettings.get(controlName)?.value;
        if (animalId) {
          selectedAnimals.push(animalId);
        }
      }
    }

    // Mostrar los valores seleccionados en la consola
    console.log("Animales seleccionados:", selectedAnimals);

    const formPen = {
      animals: selectedAnimals
    }

    const formAnimal ={
      assigned: true,
      pen_id: this.corralControl.value
    }

    this._penService.putPen(this.corralControl.value,formPen).subscribe({
      next:() => {
        for (let i = 0; i < selectedAnimals.length; i++) {
          this._animalService.putAnimal(selectedAnimals[i],formAnimal).subscribe({
            next:() =>{

            }
          })
        }
        this._utilService.showAlert('Registro Exitoso','Se ha configurado la información correctamente','SUCCESS');
        this.typeControl.setValue(null);
        this.corralControl.setValue(null);
        this.availableAnimals = [];
        this.capacities.pop();
      } 
    })
  }
}
