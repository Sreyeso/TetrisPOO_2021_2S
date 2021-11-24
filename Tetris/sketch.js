
//Variables globales
let filas = 12;
let columnas = 18;
let colores = [];
let tablero = [];
let juego = [];

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

  constructor(x,y,ref,estado,vel,lim){

    this.x=x;
    this.y=y;
    this.rot=0;
    this.velocidad=vel;
    this.estado=estado; // 1-Queue 2-inplay 3-Out of play 
    this.ref=ref;
    this.tiempoquieto=0; //Contador de el tiempo que la pieza ha estado quieta
    this.limquieto=lim; //Limite de tiempo que la pieza puede estar quieta
    //Nombres de las piezas - O I J L S T Z
    //Equivalente en números  1 2 3 4 5 6 7
  
    if (this.ref==1){
      this.tam=2;this.color=color(210, 206, 70);
      this._forma= 
          [ [1,1],
            [1,1]];  
    }
    if (this.ref==2){
      this.tam=4;this.color=color(51, 204, 255); 
      this._forma=
          [ [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0],
            [0,0,0,0]];
    }
    if (this.ref==3){
      this.tam=3;this.color=color(0, 0, 204);
      this._forma=
          [ [1,0,0],
            [1,1,1],
            [0,0,0]];
    }
    if (this.ref==4){
      this.tam=3;this.color=color(255, 153, 51);
      this._forma=
          [ [0,0,1],
            [1,1,1],
            [0,0,0]]; 
    }
    if (this.ref==5){
      this.tam=3;this.color=color(0, 204, 0);
      this._forma=
          [ [0,1,1],
            [1,1,0],
            [0,0,0]];
    }
    if (this.ref==6){
      this.tam=3;this.color=color(204, 0, 204);
      this._forma=
          [ [0,1,0],
            [1,1,1],
            [0,0,0]];
    }
    if (this.ref==7){
      this.tam=3;this.color=color(255, 0, 0);
      this._forma=
          [ [1,1,0],
            [0,1,1],
            [0,0,0]];
    }

  }

  dibujar(){
    for (let i=0;i<this.tam;i++){
      for (let j=0;j<this.tam;j++){
        if (this._forma[i][j]==1){
          colores[j+int(this.x)][i+int(this.y)]=this.color;
        }
      }
    }
  }
  bajar(){
    if (this.colision("abj")){
      this.y=this.y+this.velocidad;
    }else{
      this.tiempoquieto+=this.velocidad;
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
        if (this._forma[i][j]==1){
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
  estadorot(rot,modo /*Actualizar la rotación actual
    r/w   predecir la rot siguiente*/){
    let holder=[];
    if (this.ref==1){
    switch(int(rot)){
    case 0:
    case 1:
    case 2:
    case 3:
    default:
    holder= 
    [ [1,1],
      [1,1]];  
    break;
    }   
    } 
    if (this.ref==2){
    switch(int(rot)){
    case 0:
    default:
    holder=
    [ [0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]];
      break;
    case 1:
    holder=
    [ [0,0,1,0],
      [0,0,1,0],
      [0,0,1,0],
      [0,0,1,0]];
      break;
    case 2:
    holder=
    [ [0,0,0,0],
      [0,0,0,0],
      [1,1,1,1],
      [0,0,0,0]];
      break;
    case 3:
    holder=
    [ [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0]];
      break;
    }   
    }
    if (this.ref==3){
    switch(int(rot)){
    case 0:
    default:
    holder=
    [ [1,0,0],
      [1,1,1],
      [0,0,0]];
      break;
    case 1:
    holder=
    [ [0,1,1],
      [0,1,0],
      [0,1,0]];
      break;
    case 2:
    holder=
  
    [ [0,0,0],
      [1,1,1],
      [0,0,1]];
      break;
    case 3:
    holder=
    [ [0,1,0],
      [0,1,0],
      [1,1,0]];
      break;
    }   
    }  
    if (this.ref==4){
    switch(int(rot)){
    case 0:
    default:
    holder=
    [ [0,0,1],
      [1,1,1],
      [0,0,0]]; 
      break;
    case 1:
    holder=
    [ [0,1,0],
      [0,1,0],
      [0,1,1]]; 
      break;
    case 2:
    holder=
    [ [0,0,0],
      [1,1,1],
      [1,0,0]]; 
      break;
    case 3:
    holder=
    [ [1,1,0],
      [0,1,0],
      [0,1,0]]; 
      break;
    }   
    }
    if (this.ref==5){
    switch(int(rot)){
    case 0:
    default:
    holder=
    [ [0,1,1],
      [1,1,0],
      [0,0,0]];
      break;
    case 1:
    holder=
    [ [0,1,0],
      [0,1,1],
      [0,0,1]];
      break;
    case 2:
    holder=
    [ [0,0,0],
      [0,1,1],
      [1,1,0]]; 
      break;
    case 3:
    holder=
    [ [1,0,0],
      [1,1,0],
      [0,1,0]];
      break;
    }   
    }
    if (this.ref==6){
    switch(int(rot)){
    case 0:
    default:
    holder=
    [ [0,1,0],
      [1,1,1],
      [0,0,0]];
      break;
    case 1:
    holder=
    [ [0,1,0],
      [0,1,1],
      [0,1,0]];
      break;
    case 2:
    holder=
    [ [0,0,0],
      [1,1,1],
      [0,1,0]];
      break;
    case 3:
    holder=
    [ [0,1,0],
      [1,1,0],
      [0,1,0]];
      break;
    }   
    }
    if (this.ref==7){
    switch(int(rot)){
    case 0:
    default:
    holder=
    [ [1,1,0],
      [0,1,1],
      [0,0,0]];
      break;
    case 1:
    holder=
    [ [0,0,1],
      [0,1,1],
      [0,1,0]];
      break;
    case 2:
    holder=
    [ [0,0,0],
      [1,1,0],
      [0,1,1]];
      break;
    case 3:
    holder=
    [ [0,1,0],
      [1,1,0],
      [1,0,0]];
      break;
    }   
    }

    if (modo=="w"){
    this.rot=rot;
    this._forma=holder;
    }
    if (modo=="r"){
    return holder;
    }

  }
  verifrot(rot){
    let holder=this.estadorot(rot,"r");
    for (let i=0;i<this.tam;i++){
      for (let j=0;j<this.tam;j++){
        if (holder[i][j]==1){
          let casilla=(tablero[j+int(this.x)][i+int(this.y)]!=255);
          if (casilla){
            return false;
          }
        }
      }
    }
    return true;
  }
  rotar(){
    let comp=0; 
    //rotar derecha
    if (keyIsDown(88)){
      if(int(this.rot)==3){
        comp=0;
      }else{
        comp=int(this.rot)+1;
      }
      if (this.verifrot(comp)){
        this.estadorot((this.rot+0.15)%4,"w");
      }
    }
    //rotar izquierda
    if (keyIsDown(90)){
      if(int(this.rot)==0){
        comp=3;
      }else{
        comp=int(this.rot)-1;
      }
      if (this.verifrot(comp)){
        if(this.rot>0){
          this.estadorot((this.rot-0.15),"w");
        }else{
          this.rot=4;
        }
      }
    }
  }
  estadojuego(){
    if(this.tiempoquieto<this.limquieto){
      this.dibujar();
      this.bajar();
    
      this.moverderizq();
      this.rotar();
    }else{
      return [false,int(this.x),int(this.y),this.tam,this.estadorot(this.rot,"r")];
    }
    return [true,null,null,null,null];
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
  //Juego [0] -> Pieza en hold
  //Juego [1] -> Pieza activa
  p1 = new pieza(1,1,6,2,0.05,3);

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
  print(p1.estadojuego());
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

function crearpieza(){

}
