function DatLat (appendedDimensions, dimLengthArray, defaultVal = 0, indexArray = [],) {
    this.appendedDimensions = appendedDimensions;
    this.dimLengthArray = dimLengthArray;
    this.defaultVal = defaultVal
    this.indexArray = indexArray;
    this.carry = [];

    this.getElem = function(coordArray) {
        gottenValue = "ERROR!";
        if (this.appendedDimensions == 0) {
            console.log("GETELEM BY " + appendedDimensions + " ENDING AT " + coordArray);
            console.log(this.carry[coordArray]);
            return this.carry[coordArray];
        } else {
            let passingCoordArray = coordArray.slice();
            passingCoordArray.shift();
            console.log("GETELEM BY " + appendedDimensions + " LOOKING DOWN " + passingCoordArray);
            gottenValue = (this.carry[coordArray[0]]).getElem(passingCoordArray);
            if (gottenValue != "ERROR!") {
                return gottenValue;
            }
        }

        return gottenValue;
    };

    this.setElem = function(coordArray, newValue) {
        if (this.appendedDimensions == 0) {
            console.log("SETELEM BY " + appendedDimensions + " ENDING AT " + coordArray + " WITH VALUE OF " + newValue);
            if(this.carry[coordArray] == undefined) {
                console.log("WARNING! AN OUT OF BOUNDS INDEX HAS BEEN SET!")
            }
            this.carry[coordArray] = newValue;
            console.log(this.carry[coordArray])
        } else {
            let passingCoordArray = coordArray.slice();
            passingCoordArray.shift(); 
            console.log("SETELEM BY " + appendedDimensions + " LOOKING DOWN " + passingCoordArray);
            (this.carry[coordArray[0]]).setElem(passingCoordArray, newValue);
        }
    };

    this.linearSearch = function(searchValue) {
        let isFound = false;
        //let foundArray = [];
        if(this.appendedDimensions == 0) {
            console.log("ENDING IN " + this.indexArray);
            for(let z in this.carry) {
                if(this.carry[z] == searchValue) {
                    console.log("----- FOUND! -----");
                    let finalCoord = this.indexArray.slice();
                    finalCoord.push(Number(z));
                    //foundArray.push(finalCoord);
                    //return foundArray;
                    return finalCoord;
                }
                console.log("ENDING BRANCH");
            }
        } else {
            console.log("SEARCHING IN " + this.indexArray);
            for(let i in this.carry) {
                isFound = ((this.carry[i]).linearSearch(searchValue));
                //let val = ((this.carry[i]).linearSearch(searchValue));
                //if(val != false) {
                //    return val;
                //}
                
                if(isFound != false) {
                    return isFound;
                }
            }
        }

        console.log("NOT FOUND!");
        //return foundArray;
        return isFound;
    };

    this.linearSearchAll = function(searchValue) {
        let foundArray = [];
        if(this.appendedDimensions == 0) {
            console.log("ENDING IN " + this.indexArray);
            for(let z in this.carry) {
                if(this.carry[z] == searchValue) {
                    console.log("----- FOUND! -----");
                    let finalCoord = this.indexArray.slice();
                    finalCoord.push(Number(z));
                    //return finalCoord;
                    foundArray.push(finalCoord);
                    //console.log(foundArray);
                    
                }
                console.log("ENDING BRANCH");
            }
        } else {
            console.log("SEARCHING IN " + this.indexArray);
            for(let i in this.carry) {
                let val = ((this.carry[i]).linearSearchAll(searchValue));
                if(val != false) {
                    //foundArray.push(val);
                    for(let j in val) {
                        foundArray.push(val[j]);
                    }
                }
            }
        }

        //console.log("NOT FOUND!");
        return foundArray;
    };

    this.findAndReplace = function(find, replace) {
        let foundArray = this.linearSearchAll(find);
        let x = 0;

        for(x in foundArray) {
            this.setElem(foundArray[x], replace);
        }
    }

    this.move = function(coordArray1, coordArray2, replace = this.defaultVal) {
        let valueToMove = this.getElem(coordArray1);
        this.setElem(coordArray2, valueToMove);
        this.setElem(coordArray1, replace);
    }

    for (let x = 0; x < this.dimLengthArray[0]; x++) {
        this.carry.push([]);
    }

    console.log(this.carry);

    let passingDimLengthArray = this.dimLengthArray.slice();
    passingDimLengthArray.shift();

    let passingAppendedDimensions = this.appendedDimensions - 1;


    if (this.appendedDimensions > 0) {
        let newIndexValue = 0;
        
        for(let y in this.carry) {
            console.log(this.appendedDimensions + " STARTING GENERATION");
            let passingIndexArray = this.indexArray.slice();
            passingIndexArray.push(newIndexValue);
            var newDatLat = new DatLat(passingAppendedDimensions, passingDimLengthArray, defaultVal, passingIndexArray);
            this.carry[y] = newDatLat;
            newIndexValue++;
        }
    } else {
        for(let y in this.carry) {
            console.log(this.appendedDimensions + " FILLING WITH " + defaultVal + "!!!!!!!!!! DEAD END.");
            this.carry[y] = defaultVal;
        }
    }

    console.log(this.appendedDimensions + " COMPLETE");

    return this;
}

var datLat1 = new DatLat(1, [20, 20], "\\|/");


console.log("------- ACTION START -------")

datLat1.findAndReplace("John", "Hobbes");

var test1 = document.getElementById('test1');

function displayDatLat(datLat, tableToAppend) {
    for(let i = 0; i < datLat.dimLengthArray[0]; i++) {
        var row = document.createElement("TR");
        row.setAttribute("id","row" + i);
        tableToAppend.appendChild(row);
    
        for(let j = 0; j < datLat.dimLengthArray[1]; j++) {
            var column = document.createElement("TD");
            column.setAttribute("id","column" + i + "and" + j);
            var currentRow = document.getElementById('row' + i);
    
            column.innerHTML = datLat.getElem([i, j]);
    
            currentRow.appendChild(column);
        }
    }
}

displayDatLat(datLat1, test1);


function updateDisplay(datLat, tableToAppend) {
    var refreshTable = document.getElementById("test1");
    refreshTable.innerHTML = "";
    displayDatLat(datLat, tableToAppend);
}


var posY = [9];
var posX = [19];

function moveUpBySetDist(dist, origY, origX) {
    datLat1.move([origY[0], origX[0]], [origY[0], origX[0]-dist);
    updateDisplay(datLat1, test1);

    origX[0] = origX[0]-dist;
}

//moveUpWithTime(2, 9, 19);
//moveUpWithTime(1, 9, 19);

//setInterval(function(){moveUpWithTime([2], posY, posX);}, 1000)

//datLat1.move([14, 12], [0, 0]);
//setInterval(function(){updateDisplay(datLat1, test1);}, 3000);


//displayDatLat(datLat1, test1);
/*
function moveAndRender(coord, x, y) {
    coord = datlat1.getElem()
    datLat1.move([x, y])
}
*/
//setInterval()

/*
for(let i = 0; i < 8; i++) {
    var row = document.createElement("TR");
    row.setAttribute("id","row" + i);
    test1.appendChild(row);

    for(let j = 0; j < 8; j++) {
        var column = document.createElement("TD");
        column.setAttribute("id","column" + i + "and" + j);
        var currentRow = document.getElementById('row' + i);

        column.innerHTML = datLat1.getElem([i, j]);

        currentRow.appendChild(column);

        //datLat1.setElem([i, j], "Mickey");
    }
}
*/

