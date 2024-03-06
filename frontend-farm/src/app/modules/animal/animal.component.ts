import { Component } from '@angular/core';

@Component({
  selector: 'app-animal',
  standalone: true,
  imports: [],
  templateUrl: './animal.component.html',
  styleUrl: './animal.component.css'
})
export class AnimalComponent {
  nombreAnimal: string | undefined;
  edadAnimal: number | undefined;
  tipoAnimal: string | undefined;

  guardarAnimal() {
    // Aquí puedes agregar la lógica para guardar el animal
    console.log('Animal guardado:', this.nombreAnimal, this.edadAnimal, this.tipoAnimal);
  }
}
