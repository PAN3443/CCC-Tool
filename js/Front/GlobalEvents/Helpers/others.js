Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0;
}


function deg2rad (degree)
{
    return (degree/180*Math.PI);
}


Number.prototype.countDecimals = function () { 
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0;
}


String.prototype.blankLink = function(url) {
    return "<a target='_blank' href='"+url+"'>"+url+"</a>";
}
