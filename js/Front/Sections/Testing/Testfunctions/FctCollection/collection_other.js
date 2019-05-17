function marschnerLobb_TestField(){

  /**
  * @brief Computes Marschner-Lobb field used to test volumetric reconstructions
  *
  * Stephen R. Marschner and Richard J. Lobb,
  * "An Evaluation of Reconstruction Filters for Volume Rendering"
  * Proceedings of IEEE Visualization '94 Conference
  *
  * http://www.cs.cornell.edu/~srm/publications/Vis94-filters.pdf
  */

  testFieldMax = -Infinity;
  testFieldMin = Infinity;

  var zPos = 0;

  for (var y = 0; y < testFieldDimY; y++) {

    var yPos= fieldStartY+y*fieldStepY;
    for (var x = 0; x < testFieldDimX; x++) {

      var xPos= fieldStartX+x*fieldStepX;
      /**
       * Marchner-Lobb function
       * \[ ( 1.0 - \sin( \pi * z * 0.5 ) + alpha * ( 1.0 + \rho_r( \sqrt( x * x + y * y ), f_M ) ) ) / ( 2.0 * ( 1.0 + \alpha ) ) )
         \]
         with
         \[rho_r = \cos( 2\pi f_M cos( \frac{\pi r}{2} ) \]
       */
       var r = Math.sqrt( xPos * xPos + yPos * yPos );

      var value =  1.0 - Math.sin( Math.PI * zPos * 0.5 ) +
       marschnerLopp_Alpha * ( 1.0 + Math.cos( 2.0 * Math.PI * marschnerLopp_f_M * Math.cos( Math.PI * r * 0.5 ) ) ) / ( 2.0 * ( 1.0 + marschnerLopp_Alpha ) );

       testFieldMin = Math.min(testFieldMin, value);
       testFieldMax = Math.max(testFieldMax, value);
       
      jsonObj.testFieldVal.push(value);
    }

  }

}
