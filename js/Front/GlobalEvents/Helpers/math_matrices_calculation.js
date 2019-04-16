function matrixMultiplication(m1, m2) {

  var result = new Float32Array([[0,0,0],[0,0,0],[0,0,0]]);

  result[0][0] = m1[0][0] * m2[0][0] + m1[0][1] * m2[1][0] + m1[0][2] * m2[2][1];
  result[0][1] = m1[0][0] * m2[0][1] + m1[0][1] * m2[1][1] + m1[0][2] * m2[2][0];
  result[0][2] = m1[0][0] * m2[0][2] + m1[0][1] * m2[1][2] + m1[0][2] * m2[2][2];

  result[1][0] = m1[1][0] * m2[0][0] + m1[1][1] * m2[1][0] + m1[1][2] * m2[2][1];
  result[1][1] = m1[1][0] * m2[0][1] + m1[1][1] * m2[1][1] + m1[1][2] * m2[2][0];
  result[1][2] = m1[1][0] * m2[0][2] + m1[1][1] * m2[1][2] + m1[1][2] * m2[2][2];

  result[2][0] = m1[2][0] * m2[0][0] + m1[2][1] * m2[1][0] + m1[2][2] * m2[2][1];
  result[2][1] = m1[2][0] * m2[0][1] + m1[2][1] * m2[1][1] + m1[2][2] * m2[2][0];
  result[2][2] = m1[2][0] * m2[0][2] + m1[2][1] * m2[1][2] + m1[2][2] * m2[2][2];

  return result;
}


function invert3x3Matrix(matrix){

  var det = determinant(matrix);

  if(det<1e-2)//if(det==0)
    return undefined;

  var invdet = 1.0/det;
  var matrix_Inv=[[0,0,0],[0,0,0],[0,0,0]];

  /*matrix_Inv[0,0] = (matrix[1,1]*matrix[2,2]-matrix[2,1]*matrix[1,2])*invdet;
  matrix_Inv[1,0] = (matrix[0,1]*matrix[2,2]-matrix[0,2]*matrix[2,1])*invdet;
  matrix_Inv[2,0] = (matrix[0,1]*matrix[1,2]-matrix[0,2]*matrix[1,1])*invdet;
  matrix_Inv[0,1] = (matrix[1,0]*matrix[2,2]-matrix[1,2]*matrix[2,0])*invdet;
  matrix_Inv[1,1] = (matrix[0,0]*matrix[2,2]-matrix[0,2]*matrix[2,0])*invdet;
  matrix_Inv[2,1] = (matrix[0,0]*matrix[1,2]-matrix[1,0]*matrix[0,2])*invdet;
  matrix_Inv[0,2] = (matrix[1,0]*matrix[2,1]-matrix[2,0]*matrix[1,1])*invdet;
  matrix_Inv[1,2] = (matrix[0,0]*matrix[2,1]-matrix[2,0]*matrix[0,1])*invdet;
  matrix_Inv[2,2] = (matrix[0,0]*matrix[1,1]-matrix[1,0]*matrix[0,1])*invdet;*/


  for (   var y = 0;  y < 3;  y ++ ){
    for ( var x = 0;  x < 3;  x ++   )
    {
      matrix_Inv [y][x] = determinantOfMinor( x, y, matrix ) * invdet;

      if( 1 == ((x + y) % 2) )
        matrix_Inv [y][x] = -1* matrix_Inv [y][x];
    }
  }



  return matrix_Inv;
}

function determinant(matrix){
  /*return matrix[0,0]*matrix[1,1]*matrix[2,2]+matrix[0,1]*matrix[1,2]*matrix[2,0]+matrix[0,2]*matrix[1,0]*matrix[2,1]
         -matrix[2,0]*matrix[1,1]*matrix[0,2]-matrix[2,1]*matrix[1,2]*matrix[0,0]-matrix[2,2]*matrix[1,0]*matrix[0,1];*/

         return ( matrix [0] [0]  *  determinantOfMinor( 0, 0, matrix ) )
             -  ( matrix [0] [1]  *  determinantOfMinor( 0, 1, matrix ) )
             +  ( matrix [0] [2]  *  determinantOfMinor( 0, 2, matrix ) );
}

function determinantOfMinor( yPos,
                             xPos,
                             matrix )
{
  var x1,x2,y1,y2;

  if(xPos == 0)
  x1=1;
  else
  x1=0;

  if(xPos == 2)
  x2=1;
  else
  x2=2;

  if(yPos == 0)
  y1=1;
  else
  y1=0;

  if(yPos == 2)
  y2=1;
  else
  y2=2;


  return ( matrix [y1] [x1]  *  matrix [y2] [x2] )
      -  ( matrix [y1] [x2]  *  matrix [y2] [x1] );
}
