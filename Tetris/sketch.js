
//Variables globales

//Tablero de juego
let filas;        //Las filas visibles son esta variable -2
let columnas;     //Las columnas visibles son esta variable -3

//Distintos tableros
let colores;      //Donde se imprimen las fichas en juego
let tablero;      //Refencia de fichas que ya no estan en juego
let siguiente;    //Mostrar ficha siguiente
let hold;         //Mostrar ficha en hold

//Config de la ventana
let ancho;        //ancho y largo son dinamicos con respecto al tamaño de la ventana
let largo;        //estan ahi por el testing con canvas estaticos (ahora se mapean)
let fondo;        //color de fondo de la ventana

//Variables de juego
let pactiva;      //Almacena los datos de la pieza activa actual
let psigte;       //Almacena los datos de la pieza siguiente
let phold;        //Almacena los datos de la pieza en hold actual
let puntaje;      //Puntaje que se muestra
let fpuntaje;     //Multiplicador del puntaje (controlada con slider personalizacion)
let ratvel;       //Velocidad inicial (controlada con slider personalizacion)
let ratlim;       //Limite en pantalla inicial (controlada con slider personalizacion)
let game;         //Control del juego
let thold;        //Indica si el hold esta disponible o no
let filallena;    //Indices de la filas que estan llenas 

//Tamaño
let tamcuadrado;  //Tamaño en px de la arista de cada celda de los tableros
let tamletra;

//Centrar el tablero de juego (cambios dinamicos con respecto al tamaño de la ventana)
let ajustex;
let ajustey;

//ELEMENTOS DOM
let canvas;       //Usado para dejar el canvas con posicion absoluta en (0,0)
let sliderdifs;   //Slider del control de dificultad
let titulo;       //Titulo del proyecto
let nombre;       //Nombre del desarrollador
let espdif;       //Especificaciones de la dificultad (dinamico)
let botdif;
let gameover;
let tperson;
let slidertamcuad;
let tmodifcolor;
let slidercolor;
let sliderlinea;

//Variables para el cambio de color
let fr=0;
let fg=0;
let fb=0;
let lineacuadricula=100;

//Clase
class pieza{
  constructor(x,y,ref,estado,rot,vel,lim){
    this.x=x;                     //Posicion en x del vertice superior izquierdo del tetromino
    this.y=y;                     //Posicion en y del vertice superior izquierdo del tetromino
    this.rot=rot;                 //Rotacion actual del tetromino (quemada)
    this.estado=estado;           //Indica si el tetromino esta en juego, siguiente, hold o fuera de juego.
    this.velocidad=vel;           //Controla la velocidad de caida y de movimiento del tetromino
    this.ref=ref;                 //Identificador del tipo de tetromino
    this.hold=0;                  //Indica si la ficha actual puede ser holdeada
    this.tiempoquieto=0;          //Contador de el tiempo que la pieza ha estado quieta
    this.limquieto=lim;           //Limite de tiempo que la pieza puede estar quieta
    this.estadorot(this.rot,"w"); //Inicializar la ficha con su rotacion inicial y color correspondiente
    this.coltemp=this.color;      //Variable usada para el blink de la ficha (no olvidar el color inicial)
  }
  dibujar(){            //Dibujar la ficha en juego en el tablero 
    for (let i=0;i<this._forma.length;i++){
      for (let j=0;j<this._forma.length;j++){
        if (this._forma[i][j]==1){
          colores[j+int(this.x)][i+int(this.y)]=this.color;
        }
      }
    }
  }
  bajar(){              //Control del movimiento hacia abajo
    if (this.colision("abj")){ //Gravedad
      this.y=this.y+this.velocidad;
    }else{
      this.tiempoquieto+=this.velocidad;
    }

    if (keyIsDown(DOWN_ARROW)){ //Input del usuario
      if(this.colision("abj")){
        this.y=this.y+this.velocidad*2.2;
      }
    }

    if (keyIsDown("32")){ //Bajar de golpe
      if (this.colision("abj")){
        if (this.velocidad<0.8){
          this.velocidad+=this.velocidad*0.7;  
        }else{
          this.velocidad=0.8;
        }      
      }
    }
  }
  colision(modo){       //Control de las colisiones en todas las direcciones
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
    for (let i=0;i<this._forma.length;i++){
      for (let j=0;j<this._forma.length;j++){
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
  moverderizq(){        //Control del movimiento hacia los lados
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
  estadorot(rot,modo){  //Actualizar la rotación actual (escribir) predecir la rot siguiente (leer)
    //Nombres de las piezas - Phold O I J L S T Z
    //Equivalente en números    0   1 2 3 4 5 6 7
    let holder=[];
    if (this.ref==0){
      this.color=color(255);
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
      this.color=color(map(210+fr,0,255,0,255,1),map(206+fg,0,255,0,255,1),map(70+fb,0,255,0,255,1));
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
      this.color=color(map(51+fr,0,255,0,255,1),map(204+fg,0,255,0,255,1),map(255+fb,0,255,0,255,1));
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
      this.color=color(map(0+fr,0,255,0,255,1),map(0+fg,0,255,0,255,1),map(204+fb,0,255,0,255,1));
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
      this.color=color(map(255+fr,0,255,0,255,1),map(153+fg,0,255,0,255,1),map(51+fb,0,255,0,255,1));
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
      this.color=color(map(0+fr,0,255,0,255,1),map(204+fg,0,255,0,255,1),map(0+fb,0,255,0,255,1));
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
      this.color=color(map(204+fr,0,255,0,255,1),map(0+fg,0,255,0,255,1),map(204+fb,0,255,0,255,1));
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
      this.color=color(map(255+fr,0,255,0,255,1),map(0+fg,0,255,0,255,1),map(0+fb,0,255,0,255,1));
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
  verifrot(rot){        //Verificar que el espacio de la rotacion a hacer este libre
    let holder=this.estadorot(rot,"r");
    for (let i=0;i<this._forma.length;i++){
      for (let j=0;j<this._forma.length;j++){
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
  rotar(){              //Realizar la rotacion hacia la derecha y hacia la izquierda
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
  estadojuego(){        //Control de la ficha en el juego
    let cond=(this.tiempoquieto<this.limquieto); 
    //1- Queue 
    if(this.estado==1){
      let holder=this.estadorot(0,"r");
      for (let i=0;i<this._forma.length;i++){
        for (let j=0;j<this._forma.length;j++){
          if (holder[i][j]==1){
            siguiente[j][i]=this.color;
          }
        }
      }
    }
    //2-Playing 
    else if(cond && this.estado==2){
      
      //Contador que permite visualizar cuando la ficha se fija
      if(this.tiempoquieto>this.limquieto*0.89 && this.tiempoquieto<this.limquieto*0.9){  
        this.color=color(150);
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
      for (let i=0;i<this._forma.length;i++){
        for (let j=0;j<this._forma.length;j++){
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
  plasmar(){            //Plasmar la ficha en el tablero de fichas fuera de juego
    for (let i=0;i<this._forma.length;i++){
      for (let j=0;j<this._forma.length;j++){
        if (this._forma[i][j]==1){
          tablero[j+int(this.x)][i+int(this.y)]=this.color;
        }
      }
    }
  }
}

//Setup
function setup() {
  //Config de la ventana
  ancho = windowWidth;
  largo = windowHeight;
  fondo=('tomato');
  //Inicializar ventana
  canvas=createCanvas(ancho,largo);
  frameRate(30);
  
  //Primer startup del juego con las configuraciones default
  tamcuadrado=25;
  inicializarjuego(12,20,0.05,1,1);
  fpuntaje=1;
  ajustex=(ancho-((2*filas)*tamcuadrado))/2;
  ajustey=((largo-((columnas-1)*tamcuadrado))/2);
  tamletra=tamcuadrado*0.7;

  //Inicializacion elementos DOM
  canvas.position(0,0);
  gameover=createElement('h1',"");
  gameover.position(ajustex+(2*tamcuadrado),ajustey-(2*tamcuadrado));
  titulo=createElement('h3',"POO - Proyecto Tetris");
  titulo.position(ajustex+(filas*tamcuadrado),ajustey);
  nombre=createElement('p',"Santiago Reyes Ochoa <br><br><b>Selección de dificultad</b>:");
  nombre.position(ajustex+(filas*tamcuadrado),ajustey+(tamcuadrado));
  sliderdifs = createSlider(0,100,0);
  sliderdifs.position(ajustex+(filas*tamcuadrado),ajustey+(4*tamcuadrado),0);
  sliderdifs.size(6*tamcuadrado);
  espdif=createElement('p',
  "Velocidad= "+round(map(sliderdifs.value(),0,100,1,2),2)+"x"+"<br>"+
  "Tiempo para fijar= "+round(map(sliderdifs.value(),0,100,1,0.5),2)+"s"+"<br>"+
  "Multiplicador de puntaje= "+round(map(sliderdifs.value(),0,100,1,5),2)+"x"
  );
  espdif.position(ajustex+(filas*tamcuadrado),ajustey+(5*tamcuadrado));
  botdif=createButton("Confirmar cambios e iniciar nuevo juego");
  botdif.mouseClicked(cambiardif);
  botdif.position(ajustex+(filas*tamcuadrado),ajustey+(8.2*tamcuadrado));
  tperson=createElement('p',
  "<b>Personalización:</b>"+"<br>"+
  "Tamaño del cuadrado: "+tamcuadrado+"px"+"<br>"
  );
  tperson.position(ajustex+(filas*tamcuadrado),ajustey+(9.8*tamcuadrado));
  slidertamcuad=createSlider(25,40,25,5);
  slidertamcuad.position(ajustex+(filas*tamcuadrado),ajustey+(12.3*tamcuadrado));
  slidertamcuad.size(6*tamcuadrado);
  tmodifcolor=createElement('p',
  "<b>Ajustes de color: </b><br>"+
  "Color de las fichas: <br>"+
  "Linea de la cuadricula: <br>"
  );
  tmodifcolor.position(ajustex+(filas*tamcuadrado),ajustey+(13*tamcuadrado));
  slidercolor=createSlider(-255,255,0,25);
  slidercolor.size(6*tamcuadrado);
  slidercolor.position(ajustex+((filas*1.5)*tamcuadrado),ajustey+(14.5*tamcuadrado));
  sliderlinea=createSlider(0,255,100,1);
  sliderlinea.size(6*tamcuadrado);
  sliderlinea.position(ajustex+((filas*1.5)*tamcuadrado),ajustey+(15.2*tamcuadrado));
}

//Main
function draw() {
  background(fondo);

  //Elementos dinamicos DOM 
  tperson.html("<b>Personalización:</b>"+"<br>"+
  "Tamaño del cuadrado: "+tamcuadrado+"px"+"<br>"
  );
  tamcuadrado=slidertamcuad.value();
  espdif.html(
  "Velocidad= "+round(map(sliderdifs.value(),0,100,1,2),2)+"x"+"<br>"+
  "Tiempo para fijar= "+round(map(sliderdifs.value(),0,100,1,0.5),2)+"s"+"<br>"+
  "Multiplicador de puntaje= "+round(map(sliderdifs.value(),0,100,1,5),2)+"x"
  );
  fr=-slidercolor.value()
  fg=slidercolor.value()
  fb=-slidercolor.value()
  lineacuadricula=sliderlinea.value()

  //Ajustes dinamicos del tamaño
  ancho = windowWidth; 
  largo = windowHeight;
  ajustex=(ancho-((2*filas)*tamcuadrado))/2; 
  ajustey=((largo-((columnas-1)*tamcuadrado))/2);
  
  gameover.position(ajustex+(2*tamcuadrado),ajustey-(2*tamcuadrado));
  titulo.position(ajustex+(filas*tamcuadrado),ajustey);
  titulo.style('font-size', str(int(slidertamcuad.value()*0.7))+'px');
  nombre.position(ajustex+(filas*tamcuadrado),ajustey+(tamcuadrado));
  nombre.style('font-size', str(int(slidertamcuad.value()*0.7))+'px');
  sliderdifs.position(ajustex+(filas*tamcuadrado),ajustey+(4*tamcuadrado));
  sliderdifs.size(6*tamcuadrado,tamcuadrado);
  espdif.position(ajustex+(filas*tamcuadrado),ajustey+(5*tamcuadrado));
  espdif.style('font-size',  str(int(slidertamcuad.value()*0.7))+'px');
  botdif.position(ajustex+(filas*tamcuadrado),ajustey+(8.2*tamcuadrado));
  botdif.size(12*tamcuadrado,1.5*tamcuadrado);
  botdif.style('font-size',  str(int(slidertamcuad.value()*0.6))+'px');
  tperson.position(ajustex+(filas*tamcuadrado),ajustey+(9.8*tamcuadrado));
  tperson.style('font-size',  str(int(slidertamcuad.value()*0.7))+'px');
  slidertamcuad.position(ajustex+(filas*tamcuadrado),ajustey+(12.3*tamcuadrado));
  tmodifcolor.position(ajustex+(filas*tamcuadrado),ajustey+(13*tamcuadrado));
  slidercolor.position(ajustex+((filas*1.5)*tamcuadrado),ajustey+(14.5*tamcuadrado));
  sliderlinea.position(ajustex+((filas*1.5)*tamcuadrado),ajustey+(15.2*tamcuadrado));
  //Imprimir el tetris con colores
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

  //Imprimir elementos de la GUI
  textSize(tamletra);
  fill(0);
  text('Siguiente', (ajustex-(3.4*tamcuadrado)), (ajustey+(2.8*tamcuadrado)));
  text('Hold ('+thold+')', (ajustex-(3.2*tamcuadrado)), (ajustey+(6.8*tamcuadrado)));
  text('Puntaje', (ajustex-(3.1*tamcuadrado)), (ajustey+(10.8*tamcuadrado)));
  text(puntaje, (ajustex-(2.1*tamcuadrado)), (ajustey+(11.8*tamcuadrado)));

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
    gameover.html("");
    //Control de las piezas automatico.
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
      }else{ //Holds siguientes
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
    //verificar si hay alguna línea completa, anotar su posicion
    for (let i=2;i<columnas-1;i++){
      let linea=true;
      for (let j=1;j<filas-1;j++){
        if(tablero[j][i]==255){
          linea=false;
        }
      }
      if(linea==true){ 
        //añadir el indice de la linea llena al arreglo
        filallena.push(i);
      } 
    } 
    //recorrer la lista de filas llenas, eliminarlas
    //luego al inicio, añadir una fila nueva.

    //cantidad de lineas llenas
    for (let i=0;i<filallena.length;i++){

      //eliminar la linea llena (la conocemos por su indice)
      for(let j=0;j<filas;j++){   
        tablero[j].splice(filallena[i],1); 
      } 

      //añadir la fila nueva al inicio para hacer el corrimiento
      for (let j=0;j<filas;j++){  
        if(j==0 || j==filas-1){
          tablero[j].splice(0,0,0);
        }
        else{
          tablero[j].splice(0,0,255);
        }
      } 
    }
    // Sistema de puntuacion, conforme a la cantidad de lineas
    // completadas con una sola ficha, asignar mas puntos y
    // eliminar los indices de las lineas llenas (ya no existen)  
    switch(filallena.length){
      default:
      case(0):
        break;
      case(1):
        puntaje+=(fpuntaje*100); 
        filallena.splice(0,1); 
        break;
      case(2):
        puntaje+=(fpuntaje*250); 
        filallena.splice(0,2); 
        break;
      case(3):
        puntaje+=(fpuntaje*500); 
        filallena.splice(0,3); 
        break;
      case(4):
        puntaje+=(fpuntaje*1000); 
        filallena.splice(0,4); 
        break;
    }

  }
  if(game==false){ //Efecto game over
    gameover.html("GAME OVER!");
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
      stroke(lineacuadricula);
      fill(colores[i][j]);
      rect(x,y,tamcuadrado,tamcuadrado);
      stroke(0);
    }
  } 
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function cambiardif(){
  
    puntaje=0;
    ratvel=round(map(sliderdifs.value(),0,100,0.05,0.2),2);  
    ratlim=round(map(sliderdifs.value(),0,100,1,0.5),2);
    fpuntaje=round(map(sliderdifs.value(),0,100,1,5),2);
    game=true;    
    thold=1;      
    filallena=[];

    //Tableros en vacios
    colores = [];
    tablero = [];
    siguiente = [];
    hold =[];
    //Llenar los tableros con blanco (inicializarlos)
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

    //Inicializar juego
    pactiva=crearpieza(2,ratvel,ratlim);
    psigte=crearpieza(1,ratvel,ratlim);
    //Pieza placeholder vacía para el primer hold
    phold=new pieza(1,0,0,3,0,ratvel,ratlim);

}

function inicializarjuego(f,c,vel,lim,fpuntaje){

    filas = f; 
    columnas = c;
    puntaje=0;
    ratvel=vel;  
    ratlim=lim;
    fpuntaje=fpuntaje;
    game=true;    
    thold=1;      
    filallena=[];

    //Tableros en vacios
    colores = [];
    tablero = [];
    siguiente = [];
    hold =[];
    //Llenar los tableros con blanco (inicializarlos)
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

    //Inicializar juego
    pactiva=crearpieza(2,ratvel,ratlim);
    psigte=crearpieza(1,ratvel,ratlim);
    //Pieza placeholder vacía para el primer hold
    phold=new pieza(1,0,0,3,0,ratvel,ratlim);

}

function crearpieza(est,vel,tl){ 
  //x,y,ref,estado,rot,vel,lim
  let x=int(random(1,filas-4));
  let y=0;
  let idpieza=int(random(1,8));
  let rot=int(random(4));
  obj= new pieza(x,y,idpieza,est,rot,vel,tl);
  return obj;
}

