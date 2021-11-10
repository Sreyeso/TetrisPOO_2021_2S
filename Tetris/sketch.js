
//Variables globales
let filas=10;
let columnas=17;
let colores = [];
let tablero = [];

//Clase
class pieza{

  constructor(y,x,ref,estado,vel){

    this.x=x;
    this.y=y;
    this.rot=0;
    this.velocidad=vel;
    this.estado=estado; // 1-Queue 2-inplay 3-Out of play 

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
    for (let i=0;i<this.f;i++){
      for (let j=0;j<this.c;j++){
        if (this.forma[i][j]==1){
          colores[j+this.x][i+int(this.y)]=this.color;
        }
      }
    }
  }

  bajar(){
    if (this.y<columnas-this.c){this.y=this.y+this.velocidad;}
    if (keyIsDown(DOWN_ARROW)){
      if(this.y<columnas-this.c){this.y=this.y+1;}
    }
  }

  moverderizq(){
    if (keyIsDown(LEFT_ARROW)){
      if (this.x>0){this.x-=1;}
    }
    if (keyIsDown(RIGHT_ARROW)){
      if (this.x<filas-this.f){this.x+=1;}
    } 
  }
  rotar(){
  }

}

//Funciones

//Setup
function setup() {
  //Inicializar ventana
  createCanvas(300,510);
  //Crear tablero a imprimir
  for (let i=0;i<filas;i++){
    colores[i]=[];
    for (let j=0;j<columnas;j++){
      colores[i].push(255);
    }
  }
  //Crear tablero de referencia
  for (let i=0;i<filas;i++){
    tablero[i]=[];
    for (let j=0;j<columnas;j++){
      tablero[i].push(255);
    }
  }
  ///Inicializar objetos
  //X,Y,IDPIEZA,ESTADO,VELOCIDAD
  p1 = new pieza(1,1,3,2,0.05);
}

//Main
function draw() {

  //Resetear el tablero de las piezas que aún no son fijas
  for (let i=0;i<filas;i++){
    for (let j=0;j<columnas;j++){
      colores[i][j]=tablero[i][j];
    }
  }

  //Dibujar las piezas activas
  p1.dibujar();
  p1.bajar();
  p1.moverderizq();

  //Imprimir tablero
  for (let i=0;i<filas;i++){
    for (let j=0;j<columnas;j++){
      let x = i*30;
      let y = j*30;
      stroke(100);
      fill(colores[i][j]);
      rect(x,y,30,30);
    }
  } 
}
