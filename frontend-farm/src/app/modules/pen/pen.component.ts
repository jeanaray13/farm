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
  formPen !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _penService: PenService,
    private _utilService: UtilService
  ){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formPen = this.fb.group({
      name: [null, Validators.required],
      capacity: [null, Validators.required],
    });
  }

  save(){
    const formData = {
      name: this.formPen.value.name,
      capacity: this.formPen.value.capacity
    };

    if(this.formPen.value.name !== null || this.formPen.value.capacity !== null){
      this._penService.sendPen(formData).subscribe({
        next:(pen:any)=>{
          if(pen.msg){
            this._utilService.showAlert('Registro Exitoso','Se ha guardado la información correctamente','SUCCESS');
            this.formPen.reset();
          }
        }
      })
    }
    else{
      this._utilService.showAlert('Datos incompletos','Falta completar los campos','WARNING');
    }
  }

}
