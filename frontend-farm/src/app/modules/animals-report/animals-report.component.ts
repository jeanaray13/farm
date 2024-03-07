import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PenService } from '../../services/pen.service';
import { UtilService } from '../../services/util.service';
import { AnimalService } from '../../services/animal.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-animals-report',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink, CommonModule],
  templateUrl: './animals-report.component.html',
  styleUrl: './animals-report.component.css',
  providers:[PenService,UtilService, AnimalService]
})
export class AnimalsReportComponent implements OnInit{
  corralControl = new FormControl();

  corrales: any[]=[];
  animales: any[]=[];
  promedio: Number;

  constructor(
    private fb: FormBuilder,
    private _utilService: UtilService,
    private _penService: PenService,
    private _animalService: AnimalService
  ){}

  ngOnInit(): void {

    this._penService.getAllPen().subscribe((data)=>{
      this.corrales = data;
    })


    this.corralControl.valueChanges.subscribe(selectedValue => {
      console.log('Valor seleccionado:', selectedValue);
      this._animalService.getAnimalsByPen(selectedValue).subscribe((data)=>{
        this.animales = data;
        console.log(this.animales);
      })

      this._animalService.getAverage(selectedValue).subscribe((promedio)=>{
        this.promedio = promedio;
      })
    });
    
  }

  async generateReport(){
    //Imagen Header
    const headerimg = '../assets/images/header.png';
    const base64HeaderImage = await this.getBase64Image(headerimg);

    const selectedCorral = this.corrales.find(corral => corral._id === this.corralControl.value);

    // Genera el contenido para la tabla con colores según el riesgo
    const content = this.animales.map((item: any, index: number) => [
      { text: '\n'+item.animal || '', bold: true, alignment: 'center', fillColor: index % 2 === 0 ? "#FFFFFF":"#F8F6F6", fontSize: 10, border: [], marginLeft: 10 },
      { text: '\n'+item.age || '', bold: true, alignment: 'center', fillColor: index % 2 === 0 ? "#FFFFFF":"#F8F6F6", fontSize: 10, border: [], marginLeft: 10 },
      { canvas: [{ type: 'rect', x: 10, y: 8, w: 12, h: 12, r: 0, color: this.getColorByRisk(item.type) }], fillColor: index % 2 === 0 ? "#FFFFFF":"#F8F6F6", alignment: 'center', margin: [2, 2, 2, 2], border: [] },
  ]);

    let docDefinition = {
      info: {
          title: "Reporte - La Granja del tío Juán",
          author: "Jean Suárez",
          subject: "subject of document",
          keywords: "keywords for document",
      },
      content: [
          //Header
          {
              image: base64HeaderImage,
              width: 900,
              alignment: 'center',
              margin: [0, -40, 0, 0],
          },
          { columns: [{}, { text: "\n\n\n\n" }] },
          { text: "Registro de Animales", bold: true, alignment: 'center', fontSize: 20 },
          { columns: [{}, { text: "\n\n\n" }] },
          { text: [
            {text: "Corral: ", bold:true},
            {text: selectedCorral.name}
          ] },
          { columns: [{}, { text: "\n\n\n" }] },
          //Contenido de la tabla
          {
              table: {
                  widths: ['*', '*', '*'], // Ajusta los anchos de las columnas según tus necesidades
                  body: [
                      [
                          { text: "Animal", bold: true, alignment: 'center', fontSize: 11, border: [], color:"#FFFFFF", fillColor: "#602B07"},
                          { text: "Edad", bold: true, alignment: 'center', fontSize: 11, border: [], color:"#FFFFFF", fillColor: "#602B07"},
                          { text: "Peligrosidad", bold: true, alignment: 'center', fontSize: 11, border: [], color:"#FFFFFF", fillColor: "#602B07" }
                      ],
                      ...content                            
                  ],
              },
          },
          { columns: [{}, { text: "\n\n\n" }] },
          { text: [
            {text: "Promedio: ", bold:true},
            {text: this.promedio}
          ], alignment: 'center' },
      ],
      /*footer: {image: base64FooterImage, width: 650, margin: [0, -20, 0, 0],},*/
  };

  //Crea el PDF
  pdfMake.createPdf(docDefinition).open();
  }

  //Función que transforma las imágenes a base64 (bits)
getBase64Image(url:any) {
  return new Promise((resolve, reject) => {
  var img = new Image();
  img.setAttribute("crossOrigin", "anonymous");
  img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
  };
  img.onerror = (error) => {reject(error);};
  img.src = url;
  });
}

//Función para obtener el color del riesgo
getColorByRisk(type: string): string {
  switch (type) {
      case 'peligroso':
          return "#a21a17"; // Rojo
      default:
          return "#afca0b"; // Amarillo
  }
 }

}
