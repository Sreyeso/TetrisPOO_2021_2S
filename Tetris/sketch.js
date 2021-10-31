
//Variables globales
let filas=10;
let columnas=20;
let tablero = [];

function setup() {
  createCanvas(300,600);
  //Inicializar tablero - blanco
  for (var i=0;i<filas;i++){
    tablero[i]=[];
    for (var j=0;j<columnas;j++){
      tablero[i].push(255);
    }
  }
}

function draw() {
  background(255,255,210);

  //Imprimir tablero
  for (var i=0;i<filas;i++){
    for (var j=0;j<columnas;j++){
      var x = i*30;
      var y = j*30;
      stroke(100);
      fill(tablero[i][j]);
      rect(x,y,30,30);
    }
  }
  
  p1 = new pieza(1,1,1);
  p1.dibujar();
  
}

class pieza{
  constructor(y,x,ref){

    this.x=x;
    this.y=y;
    this.rot=0;

    //Nombres de las piezas - O I J L S T Z
    //Equivalente en números  1 2 3 4 5 6 7
  
    if (ref==1){
      this.f=2;this.c=2;this.color=color(210, 206, 70);
      this.forma= 
      [ [1,1],
        [1,1]]; 
    }

    if (ref==2){
      this.f=4;this.c=4;this.color=color(51, 204, 255); 
      this.forma=
      [ [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]];
    }

    if (ref==3){
      this.f=3;this.c=3;this.color=color(0, 0, 204);
      this.forma=
      [ [1,0,0],
        [1,1,1],
        [0,0,0]];
    }

    if (ref==4){
      this.f=3;this.c=3;this.color=color(255, 153, 51); 
      this.forma=
      [ [0,0,1],
        [1,1,1],
        [0,0,0]];  
    }

    if (ref==5){
      this.f=3;this.c=3;this.color=color(0, 204, 0);
      this.forma=
      [ [0,1,1],
        [1,1,0],
        [0,0,0]];
    }

    if (ref==6){
      this.f=3;this.c=3;this.color=color(204, 0, 204);
      this.forma=
      [ [0,1,0],
        [1,1,1],
        [0,0,0]];
    }

    if (ref==7){
      this.f=3;this.c=3;this.color=color(255, 0, 0);
      this.forma=
      [ [1,1,0],
        [0,1,1],
        [0,0,0]];
    }
  
  }


  dibujar(){
    for (var i=0;i<this.f;i++){
      for (var j=0;j<this.c;j++){
        if (this.forma[i][j]==1){
          tablero[j+this.x][i+this.y]=this.color;
        }
      }
    }
  }

  rotar(){

  }

  moverderizq(){

  }

  bajar(){

  }

}