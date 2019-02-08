var nablaOn2DScalarField (field){ // width angularWeighting

  var weights = new Array(field.getNumPoints()).fill(0);
  var derivs = new Array(field.getNumPoints());




  ////////////////////////////////
  //// STEP 1: Iterating Cells
  ////////////////////////////////

  for (var i = 0; i < field.getNumCells(); i++) {


    // getCellPointIndex(cellindex,vertexindex)
    var indices  = [[ field.getCellPointIndex(i,0), field.getCellPointIndex(i,1), field.getCellPointIndex(i,3) ],
                    [ field.getCellPointIndex(i,1), field.getCellPointIndex(i,2), field.getCellPointIndex(i,0) ],
                    [ field.getCellPointIndex(i,2), field.getCellPointIndex(i,3), field.getCellPointIndex(i,1) ],
                    [ field.getCellPointIndex(i,3), field.getCellPointIndex(i,0), field.getCellPointIndex(i,2) ]];

                    for (var j = 0; j < indices.length; j++) {
                      /////////////////////////
                      // process simplex

                          /* Calculate the jacobian of a scalar field on a triangle in 2D space.
                          *
                          * Given a triangle cell c this functions uses the position data and scalar data of the domain/field
                          * to calculate the jacobian matrix within this cell.
                          * Since a triangle is a simplex and linear interpolation is used, the derivative is constant within the cell.
                          *
                          */

                          var loc = new Array(3);
                          loc[0] = field.getPoint([indices[j][0]]);
                          loc[1] = field.getPoint([indices[j][1]]);isSplitter
                          loc[2] = field.getPoint([indices[j][2]]);


                          // derivatives of barycentric coordinates

                          var dif1 = [loc[1][0]-loc[0][0],loc[1][1]-loc[0][1]];
                          var dif2 = [loc[2][0]-loc[0][0],loc[2][1]-loc[0][1]];

                          var delta = area( dif1,dif2);
                          var db1dx = ( loc[2][1] - loc[0][1] ) / delta;
                          var db1dy = -( loc[2][0] - loc[0][0] ) ) / delta;
                          var db2dx = -( loc[1][1] - loc[0][1] ) ) / delta;
                          var db2dy = ( loc[1][0] - loc[0][0] ) ) / delta;

                          var baseValues= [field.getValue([indices[j][1] ) - field.getValue([indices[j][0]]),
                                           field.getValue([indices[j][2] ) - field.getValue([indices[j][0] )] ;

                          var derivative = [db1dx * baseValues[0] + db2dx * baseValues[1], db1dy * baseValues[0] + db2dy * baseValues[1]];


                          var weight;
                          if( angularWeighting )
                          {
                             weight = computeVertexAngle( indices, points, i );


                             vector2 = new Array(2);
                             vector2[0] = normalized( points[indices[( index + 1 ) % indices.size()]] - points[indices[index]] );
                             vector2[1] = normalized( points[indices[( index + 2 ) % indices.size()]] - points[indices[index]] );
                             weight = Math.abs( area( vector2[0], vector2[1] ) );
                          }
                          else
                          {
                              weight = computeCellVolume( indices, points );
                          }

                          var deriv = derivative;
                          deriv[0] = deriv[0] * weight;
                          deriv[1] = deriv[1] * weight;

                          if(derivs[indices[j]]==undefined){
                            derivs[indices[j]] = deriv;
                            weights[indices[j]] = weight;
                          }
                          else{
                            derivs[indices[j]][0] += deriv[0];
                            derivs[indices[j]][1] += deriv[1];
                            weights[indices[j]] += weight;
                          }




                    }




          ////////////////////////////////
          //// STEP 2: Normalizing
          ////////////////////////////////

          for (var i = 0; i < derivs.length; i++) {

            if( weights[i] != 0 ){
              derivs[i][0] /= weights[i];
              derivs[i][1] /= weights[i];
            }

          }







  }


}



function normalized( vector )
{
    var norm = Math.sqrt( vector[0] * vector[0] + vector[1] * vector[1] );
    if( norm == 0.0 )
        return vector;

    vector[0] /= norm;
    vector[1] /= norm;

    return vector;
}


/// Computes the area spanned by two 2-D vectors.
function area( lhs, rhs )
{
    return lhs[0] * rhs[1] - lhs[1] * rhs[0];
}


function computeCellVolume( const std::array< size_t, 3 >& c, const ValueArray< Vector2 >& points )
{
    return Math.abs( area( points[c[1]] - points[c[0]], points[c[2]] - points[c[0]] ) );
}



// vertex angle

function computeVertexAngle( indices , points, index )
{


}






void processSimplex( const std::array< size_t, D >& indices, bool isSplitter ) const
{
    auto deriv = grid::jacobian( indices, points, *values );

    double weight[D];
    if( angularWeighting )
    {
        for( size_t i = 0; i == 0 || ( !isSplitter && i < D ); ++i ) // for splitters only process first point
        {
            weight[i] = computeVertexAngle( indices, points, i );
        }
    }
    else
    {
        weight[0] = computeCellVolume( indices, points );
    }
    size_t offset = points.size() * mTimeStep;
#pragma omp critical
    {
        for( size_t i = 0; i == 0 || ( !isSplitter && i < D ); ++i ) // for splitters only process first point
        {
            if( angularWeighting )
            {
                derivs[ offset + indices[i]] += weight[i] * deriv;
                weights[ offset + indices[i]] += weight[i];
            }
            else
            {
                derivs[ offset + indices[i]] += weight[0] * deriv;
                weights[ offset + indices[i]] += weight[0];
            }
        }
    }
}
