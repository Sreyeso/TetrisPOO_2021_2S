
//Variables globales
let filas = 12; //El playfield visible es de filas-2 y columnas-3
let columnas = 20;

//Control del tablero
let colores = [];
let tablero = [];
//Tablero sig ficha
let siguiente = [];
//Tablero ficha en hold
let hold =[];
//Arreglo fichas en play
let juego = [];
//Variable donde es guardado el puntaje
let puntaje=0;
let velinicial=0.05;
let tlinicial=4;

//Config de la ventana
let ancho = 450;
let largo = 500;
let fondo=('tomato');

//Tamaño de las fichas
let tamcuadrado=25;
//Centrar el playfield
let ajustex=(ancho-((filas)*tamcuadrado))/2+(2.5*tamcuadrado);
let ajustey=((largo-((columnas)*tamcuadrado))/2)+(0.8*tamcuadrado);

//Tamaño letra
let tamletra=tamcuadrado*0.7;

//Clase
class pieza{
  constructor(x,y,ref,estado,rot,vel,lim){

    this.x=x;
    this.y=y;
    this.rot=rot;
    this.estado=estado; //1- Queue 2-Playing 3-Hold 4-Fuera
    this.velocidad=vel;
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
    if (keyIsDown(88/*Tecla X*/)){
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
    if (keyIsDown(90/*Tecla Z*/)){
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
    if(this.estado==1){
      let holder=this.estadorot(0,"r");
      for (let i=0;i<this.tam;i++){
        for (let j=0;j<this.tam;j++){
          if (holder[i][j]==1){
            siguiente[j][i]=this.color;
          }
        }
      }
    }
    else if(this.tiempoquieto<this.limquieto && this.estado==2){
      this.dibujar();
      this.bajar();
      this.moverderizq();
      this.rotar();
    }
    else if(this.estado==3){

    }
  }
}

//Setup
function setup() {
  //Inicializar ventana
  createCanvas(ancho,largo);
  background(fondo);
  frameRate(30);
  //Crear tablero a imprimir
  for (let i=0;i<filas;i++){
    colores[i]=[];
    for (let j=0;j<columnas;j++){
      colores[i].push(255);
    }
  }
  //Crear tablero de piezas en queue
  for (let i=0;i<4;i++){
    siguiente[i]=[];
    for (let j=0;j<2;j++){
      siguiente[i].push(255);
    }
  }
  //Crear tablero de piezas en hold
  for (let i=0;i<4;i++){
    hold[i]=[];
    for (let j=0;j<2;j++){
      hold[i].push(255);
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
  //Inicializar juego
  tablero[5][12]=0;
  //Juego [0] -> Pieza en hold
  //Juego [1] -> Pieza activa
  p1 = crearpieza(2,velinicial,tlinicial);
  p2 = crearpieza(1,velinicial,tlinicial);
  juego.push(p1);
  juego.push(p2);

}

//Main
function draw() {
  
  textSize(tamletra*1.5);
  fill(color(255, 0, 0));
  text('T', (ajustex-(3.9*tamcuadrado)), (ajustey+(tamcuadrado)));
  fill(color(255, 153, 51));
  text('E', (ajustex-(3.2*tamcuadrado)), (ajustey+(tamcuadrado)));
  fill(color(210, 206, 70));
  text('T', (ajustex-(2.5*tamcuadrado)), (ajustey+(tamcuadrado)));
  fill(color(0, 204, 0));
  text('R', (ajustex-(1.8*tamcuadrado)), (ajustey+(tamcuadrado)));
  fill(color(51, 204, 255));
  text('I', (ajustex-(1*tamcuadrado)), (ajustey+(tamcuadrado)));
  fill(color(204, 0, 204));
  text('S', (ajustex-(0.7*tamcuadrado)), (ajustey+(tamcuadrado)));

  textSize(tamletra);
  fill(0);
  text('Siguiente', (ajustex-(3.4*tamcuadrado)), (ajustey+(2.8*tamcuadrado)));
  text('Hold', (ajustex-(2.7*tamcuadrado)), (ajustey+(6.8*tamcuadrado)));
  text('Puntaje', (ajustex-(3.1*tamcuadrado)), (ajustey+(10.8*tamcuadrado)));
  text(puntaje, (ajustex-(2.1*tamcuadrado)), (ajustey+(11.8*tamcuadrado)));

  //Resetear el tablero de las piezas que aún no son fijas
  for (let i=0;i<filas;i++){
    for (let j=0;j<columnas;j++){
      colores[i][j]=tablero[i][j];
    }
  }

  //Dibujar las piezas 
  juego[0].estadojuego();
  juego[1].estadojuego();

  //Imprimir casillas de pieza siguiente
  for (let i=0;i<4;i++){
    for (let j=0;j<2;j++){
      let x = (ajustex-(4*tamcuadrado))+i*tamcuadrado;
      let y = (ajustey+(3*tamcuadrado))+j*tamcuadrado;
      stroke(100);
      fill(siguiente[i][j]);
      rect(x,y,tamcuadrado,tamcuadrado);
    }
  } 

  //Imprimir casillas de pieza en hold
  for (let i=0;i<4;i++){
    for (let j=0;j<2;j++){
      let x = (ajustex-(4*tamcuadrado))+i*tamcuadrado;
      let y = (ajustey+(7*tamcuadrado))+j*tamcuadrado;
      stroke(100);
      fill(hold[i][j]);
      rect(x,y,tamcuadrado,tamcuadrado);
    }
  } 

  //Imprimir tablero - No imprimir los bordes, son referencia
  for (let i=1;i<filas-1;i++){
    for (let j=2;j<columnas-1;j++){
      let x = ajustex+i*tamcuadrado;
      let y = (ajustey+j*tamcuadrado)-(tamcuadrado);
      stroke(100);
      fill(colores[i][j]);
      rect(x,y,tamcuadrado,tamcuadrado);
    }
  } 
}

function crearpieza(est,vel,tl){
  //x,y,ref,estado,rot,vel,lim
  let x=int(random(1,filas-4));
  let y=0;
  let idpieza=int(random(1,8));
  let rot=int(random(0,5));
  obj= new pieza(x,y,idpieza,est,rot,vel,tl);
  return obj;
}

function plasmar(datos){
  /*datos = [false,int(this.x),int(this.y),this.tam,this.estadorot(this.rot,"r")]*/

}
