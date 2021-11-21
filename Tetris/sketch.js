
//Variables globales
let filas= 12;
let columnas= 18;
let colores = [];
let tablero = [];

//Config de la ventana
let ancho = 400;
let largo = 500;
let fondo=('tomato');

//Tamaño de las fichas
let tamcuadrado=25;
//Centrar el playfield
let ajustex=(ancho-((filas)*tamcuadrado))/2;
let ajustey=(largo-((columnas)*tamcuadrado))/2;

//Clase
class pieza{

  constructor(x,y,ref,estado,vel){

    this.x=x;
    this.y=y;
    this.rot=0;
    this.velocidad=vel;
    this.estado=estado; // 1-Queue 2-inplay 3-Out of play 

    //Nombres de las piezas - O I J L S T Z
    //Equivalente en números  1 2 3 4 5 6 7
  
    if (ref==1){
      this.tam=2;this.color=color(210, 206, 70);
      this.forma= 
      [ [1,1],
        [1,1]]; 
    }
    if (ref==2){
      this.tam=4;this.color=color(51, 204, 255); 
      this.forma=
      [ [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]];
    }
    if (ref==3){
      this.tam=3;this.color=color(0, 0, 204);
      this.forma=
      [ [1,0,0],
        [1,1,1],
        [0,0,0]];
    }
    if (ref==4){
      this.tam=3;this.color=color(255, 153, 51); 
      this.forma=
      [ [0,0,1],
        [1,1,1],
        [0,0,0]];  
    }
    if (ref==5){
      this.tam=3;this.color=color(0, 204, 0);
      this.forma=
      [ [0,1,1],
        [1,1,0],
        [0,0,0]];
    }
    if (ref==6){
      this.tam=3;this.color=color(204, 0, 204);
      this.forma=
      [ [0,1,0],
        [1,1,1],
        [0,0,0]];
    }
    if (ref==7){
      this.tam=3;this.color=color(255, 0, 0);
      this.forma=
      [ [1,1,0],
        [0,1,1],
        [0,0,0]];
    }

  }

  dibujar(){
    for (let i=0;i<this.tam;i++){
      for (let j=0;j<this.tam;j++){
        if (this.forma[i][j]==1){
          colores[j+int(this.x)][i+int(this.y)]=this.color;
        }
      }
    }
  }

  bajar(){
    for (let i=0;i<this.tam;i++){
      for (let j=0;j<this.tam;j++){
      }
    }
    if (this.colision("abj")){
      this.y=this.y+this.velocidad;
    }
    if (keyIsDown(DOWN_ARROW)){
      if(this.colision("abj")){
        this.y=this.y+this.velocidad*1.2;
      }
    }
  }

  colision(modo/*izq,der,abj*/){
    let fx=0;
    let fy=0;
    if(modo=="izq"){
      fx=-1;
      fy=0;
    }
    if(modo=="der"){
      fx=+1;
      fy=0;
    }
    if(modo=="abj"){
      fx=0;
      fy=+1;
    }
    for (let i=0;i<this.tam;i++){
      for (let j=0;j<this.tam;j++){
        if (this.forma[i][j]==1){
          let casilla=(tablero[j+int(this.x)+fx][i+int(this.y)+fy]!=255);
          if (casilla){
            return false;
          }
        }
      }
    }
    return true;
  }

  moverderizq(){
    if (keyIsDown(LEFT_ARROW)){
      if(this.colision("izq")){
        this.x-=0.6;
      }
      }
    
    if (keyIsDown(RIGHT_ARROW)){
      if (this.colision("der")){
        this.x+=0.6;}
    } 
  }

  rotar(){
    if (keyIsDown(UP_ARROW)){

  }

}
}

//Setup
function setup() {
  //Inicializar ventana
  createCanvas(ancho,largo);
  background(fondo);
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
      //los bordes
      if(j==columnas-1 || i==0 || i==filas-1){
        tablero[i].push(0);
      }
      else{
        tablero[i].push(255);
      }
    }
  }
  tablero[5][12]=0;
  ///Inicializar objetos
  //X,Y,IDPIEZA,ESTADO,VELOCIDAD
  p1 = new pieza(1,1,6,2,0.05);
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
  p1.rotar();
  //Imprimir tablero - No imprimir los bordes, son referencia
  
  /*
  imprimir bordes (4 testing): 
  for (let i=0;i<filas;i++){
    for (let j=0;j<columnas;j++){
  no imprimir bordes: 
  for (let i=1;i<filas-1;i++){
    for (let j=0;j<columnas-1;j++){
  */

  for (let i=1;i<filas-1;i++){
    for (let j=0;j<columnas-1;j++){
      let x = ajustex+i*tamcuadrado;
      let y = ajustey+j*tamcuadrado;
      stroke(100);
      fill(colores[i][j]);
      rect(x,y,tamcuadrado,tamcuadrado);
    }
  } 
}
