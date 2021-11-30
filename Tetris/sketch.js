
//Variables globales
let filas = 12; //El playfield visible es de filas-2 y columnas-3
let columnas = 20;

//Control de tableros
let colores = [];
let tablero = [];
let siguiente = [];
let hold =[];
//Variables de juego
let pactiva;
let psigte;
let phold;
let puntaje=1;
let ratvel=0.05;
let ratlim=4;
let lineavacia=[];
let game=true;
let thold=1;

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
    this.estado=estado; 
    this.velocidad=vel;
    this.ref=ref;
    this.hold=0;
    this.tiempoquieto=0; //Contador de el tiempo que la pieza ha estado quieta
    this.limquieto=lim; //Limite de tiempo que la pieza puede estar quieta
    //Nombres de las piezas - Phold O I J L S T Z
    //Equivalente en números    0   1 2 3 4 5 6 7
    if (this.ref==0){
      this.tam=2;this.color=color(255);
      this._forma= 
        [ [0,0],
          [0,0]];  
    }
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
    this.coltemp=this.color;//Variable usada para el blink de la ficha
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
    if (keyIsDown("32")){
      if (this.colision("abj")){
        if (this.velocidad<1){
          this.velocidad+=this.velocidad;  
        }else{
          this.velocidad=1;
        }      
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
    if (this.ref==0){
      switch(int(rot)){
        case 0:
        case 1:
        case 2:
        case 3:
        default:
          holder= 
          [ [0,0],
            [0,0]];  
          break;
        } 
    } 
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
    let cond=(this.tiempoquieto<this.limquieto); 
    //1- Queue 
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
    //2-Playing 
    else if(cond && this.estado==2){
      
      //Contador que permite visualizar cuando la ficha se fija
      if(this.tiempoquieto>this.limquieto*0.9 && this.tiempoquieto<this.limquieto*0.99){  
        this.color=color(150,255/2);
      }else{
        this.color=this.coltemp;
      }
      
      //Controlar movimiento de la ficha en play
      this.dibujar();
      this.bajar();
      this.moverderizq();
      this.rotar();

      //Si el usuario mete la ficha en hold indicar el cambio 
      if (keyIsDown("67")){
        this.hold+=0.6;  
        if(this.hold>1 && thold==1){
          thold=0;         
          return 2;
        }     
      }
      
    }
    //3-Hold 
    else if(this.estado==3){
      let holder=this.estadorot(0,"r");
      for (let i=0;i<this.tam;i++){
        for (let j=0;j<this.tam;j++){
          if (holder[i][j]==1){
            hold[j][i]=this.color;
          }
        }
      }
    }
    //4-Fuera
    else{
      //Si el tiempo limite se supero, plasmar la ficha y sacarla de juego
      this.plasmar();
      this.estado=4;
      //Cuando se saca de juego la ficha, se llama para hacer el cambio
      //de siguiente a actual, y reasignar la ficha siguiente.
      return 1;
    }
  }
  plasmar(){
    for (let i=0;i<this.tam;i++){
      for (let j=0;j<this.tam;j++){
        if (this._forma[i][j]==1){
          tablero[j+int(this.x)][i+int(this.y)]=this.color;
        }
      }
    }
  }
}

//Setup
function setup() {
  //Inicializar ventana
  createCanvas(ancho,largo);
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
  //crear linea vacia de referencia
  for (let i=0;i<filas;i++){
    if(i==0 || i==filas-1){
      lineavacia.push(0);
    }
    else{
      lineavacia.push(255);
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
  pactiva=crearpieza(2,ratvel,ratlim);
  psigte=crearpieza(1,ratvel,ratlim);
  //Pieza placeholder vacía para el primer hold
  phold=new pieza(1,0,0,3,0,ratvel,ratlim);

}

//Main
function draw() {
  background(fondo);
  //Ajustar el ratio de velocidad y limite de duración respecto al puntaje

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
  text('Hold ('+thold+')', (ajustex-(3.2*tamcuadrado)), (ajustey+(6.8*tamcuadrado)));
  text('Puntaje', (ajustex-(3.1*tamcuadrado)), (ajustey+(10.8*tamcuadrado)));
  text(puntaje-1, (ajustex-(2.1*tamcuadrado)), (ajustey+(11.8*tamcuadrado)));

  //Resetear el tableros de las piezas que aún no son fijas
  for (let i=0;i<filas;i++){
    for (let j=0;j<columnas;j++){
      colores[i][j]=tablero[i][j];
    }
  }
  //Resetear hold y siguiente
  for (let i=0;i<4;i++){
    for (let j=0;j<2;j++){
      siguiente[i][j]=(255);
      hold[i][j]=(255);
    }
  }

  //Dibujar las piezas 
  if(game){
    let cambio=pactiva.estadojuego();
    psigte.estadojuego();
    phold.estadojuego();

    if(cambio==1){ //Pieza sale de play y se cambia por la sigte.
      pactiva=psigte;
      pactiva.estado=2;
      psigte=crearpieza(1,ratvel,ratlim);
      thold=1;
    }
    if(cambio==2){ //Hold de la pieza activa
      if(phold.ref==0){ //Primer Hold
        phold=pactiva;
        phold.estado=3;
        phold.y=0;
        pactiva=psigte;
        pactiva.estado=2;
        psigte=crearpieza(1,ratvel,ratlim);
      }else{ //Holds consecutivos
        let temp=pactiva;
        pactiva=phold;
        phold=temp;
        phold.estado=3;
        phold.y=0;
        pactiva.estado=2;
      }
      
    }
  
    //verificar si se ha perdido
    for (let i=1;i<filas-1;i++){
      if(tablero[i][1]!=255){
        game=false;
        break;
      }
    }
    //verificar si hay alguna línea completa
    for (let i=2;i<columnas-1;i++){
      let linea=true;
      for (let j=1;j<filas-1;j++){
        if(tablero[j][i]==255){
          linea=false;
          break;
        }
      }
      if(linea){
        puntaje+=1;
      }
    } 
  }
  if(game==false){
    for (let i=1;i<filas-1;i++){
      for (let j=0;j<columnas-1;j++){
        if(tablero[i][j]!=255){
          tablero[i][j]=color(255/2);
        }
      }
    } 
  }
  
  
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