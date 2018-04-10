//start
var currentPosition = [4,4]
//blocks
var block1 = [0, 1]
var block2 = [0, 2]
var block3 = [0, 5]
var block4 = [2, 1]
var block5 = [4, 1]
var block6 = [6, 1]

var L = [2, 4]
var A = [5, 4]
var I = [3, 5]
var O = [2, 6]
var S = [3, 4]

// Warn if overriding existing method
  if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

if(Array.prototype.contains)
    console.warn("Overriding existing Array.prototype.contains. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .contains method to Array's prototype to call it on any array
Array.prototype.contains = function (thing) {
    // if the other array is a falsy value, return false
    if (!this)
        return false;

    //start by assuming the array doesn't contain the thing
    var result = false;
    for (var i = 0, l=this.length; i < l; i++)
      {
      //if anything in the array is the thing then change our mind from before

      if (this[i] instanceof Array)
        {if (this[i].equals(thing))
          result = true;}
        else
          if (this[i]===thing)
            result = true;


      }
     //return the decision we left in the variable, result
    return result;
}

//if(Array.prototype.indexOf)
    //no warnings here because I'm intentionally overriding it, but it should do the same thing in all cases except nested arrays
// attach the .indexOf method to Array's prototype to call it on any array
Array.prototype.indexOf = function (thing)
  {
    // if the other array is a falsy value, return -1
    if (!this)
        return -1;

    //start by assuming the array doesn't contain the thing
    var result = -1;
    for (var i = 0, l=this.length; i < l; i++)
      {
      //if anything in the array is the thing then change our mind from before
      if (this[i] instanceof Array)
        if (this[i].equals(thing))
          result = i;
        else
          if (this[i]===thing)
            result = i;


      }
     //return the decision we left in the variable, result
    return result;
}

var usedPositions = []
var finalresult = ""

function getMoving() {
// console.log("currentPosition:" + currentPosition[0], currentPosition[1]);
//move right
if (!usedPositions.contains(currentPosition)){
    usedPositions.push(currentPosition)
}
if (testPosition([currentPosition[0] + 1, currentPosition[1]])) {
    //set new position
    currentPosition = [currentPosition[0] + 1, currentPosition[1]]
    generateFinalResult(currentPosition)
}
//move down
if (!usedPositions.contains(currentPosition)){
    usedPositions.push(currentPosition)
}
if (testPosition([currentPosition[0], currentPosition[1] + 1])) {
    //set new position
      currentPosition = [currentPosition[0], currentPosition[1] + 1]
      generateFinalResult(currentPosition)
}
//move left
if (!usedPositions.contains(currentPosition)){
    usedPositions.push(currentPosition)
}
if (testPosition([currentPosition[0] - 1, currentPosition[1]])) {
    //set new position
     currentPosition = [currentPosition[0] - 1, currentPosition[1]]
     generateFinalResult(currentPosition)
}
//move up
if (!usedPositions.contains(currentPosition)){
    usedPositions.push(currentPosition)
}
if (testPosition([currentPosition[0], currentPosition[1] -1])) {
    //set new position
     currentPosition = [currentPosition[0], currentPosition[1] - 1]
     generateFinalResult(currentPosition)
}
}

function testPosition(position) {
    //test if position is possible
    if (position[0] >= 7 || position[1] >= 7) {
        return false
    }
    if (position[0] <= -1 || position[1] <= -1) {
        return false
    }
    //already visited field if return false is not visited, therefore possible
    if (usedPositions.contains(position)){
        return false
    }
    //blocked field
    if (position.equals(block1) || position.equals(block2)  || position.equals(block3) || position.equals(block4) || position.equals(block5) || position.equals(block6)) {
        console.log("BLOCKED");
        return false
    }
    //if possible return
    return true

}

function generateFinalResult(position){
    if (position.equals(L)){
    finalresult = finalresult + "L"
    }
    if (position.equals(A)){
    finalresult = finalresult + "A"
    }
    if (position.equals(I)){
    finalresult = finalresult + "I"
    }
    if (position.equals(O)){
    finalresult = finalresult + "O"
    }
    if (position.equals(S)){
    finalresult = finalresult + "S"
    }

}

// do the loop
for (var i = 0; i < 49; i++) {
    getMoving()
}


console.log("all done");
console.log("usedPositions: ", usedPositions);
console.log("finalresult:" + finalresult);
