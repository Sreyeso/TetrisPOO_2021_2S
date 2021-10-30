
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


  O = new pieza(
    //Coordenadas de la pieza
    1,1,
    //Tamaño de la pieza (ancho-largo)
    2,2,
    //Representación de la pieza
    [[1,1],
    [1,1]],
    //
    color(210, 206, 70)
    );

  I = new pieza(
    //Coordenadas de la pieza
    1,5,
    //Tamaño de la pieza (ancho-largo)
    4,4,
    //Representación de la pieza
    [[1,1,1,1],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]],
    //
    color(51, 204, 255)
    );

  J = new pieza(
    //Coordenadas de la pieza
    3,4,
    //Tamaño de la pieza (ancho-largo)
    3,3,
    //Representación de la pieza
    [[1,1,0],
    [1,0,0],
    [1,0,0]],
    //
    color(0, 0, 204)
    );

  L = new pieza(
    //Coordenadas de la pieza
    3,6,
    //Tamaño de la pieza (ancho-largo)
    3,3,
    //Representación de la pieza
    [[0,1,1],
    [0,0,1],
    [0,0,1]],
    //
    color(255, 153, 51)
    );

  S = new pieza(
    //Coordenadas de la pieza
    6,1,
    //Tamaño de la pieza (ancho-largo)
    3,3,
    //Representación de la pieza
    [[0,0,0],
    [0,1,1],
    [1,1,0]],
    //
    color(0, 204, 0)
    );

  T = new pieza(
      //Coordenadas de la pieza
      6,5,
      //Tamaño de la pieza (ancho-largo)
      3,3,
      //Representación de la pieza
      [[0,0,0],
      [0,1,0],
      [1,1,1]],
      //
      color(204, 0, 204)
      );

  Z = new pieza(
    //Coordenadas de la pieza
    9,1,
    //Tamaño de la pieza (ancho-largo)
    3,3,
    //Representación de la pieza
    [[0,0,0],
    [1,1,0],
    [0,1,1]],
    //
    color(255, 0, 0)
    );

    O.dibujar();
    I.dibujar();
    J.dibujar();
    L.dibujar();
    S.dibujar();
    T.dibujar();
    Z.dibujar();

}

class pieza{
  constructor(y,x,f,c,forma,color){
    this.x=x;
    this.y=y;
    this.f=f;
    this.c=c;
    //Nombres de las piezas
    this.forma=forma;
    this.color=color;
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