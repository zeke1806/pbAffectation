type MatrixCell = number | 'E' | 'B';
type MatrixShape = MatrixCell[][];
type Marquage = {
    ligne: number[];
    colonne: number[];
};

const MATRIX = [
    [14, 6, 18, 16, 63, 15],
    [41, 78, 44, 73, 70, 25],
    [44, 81, 36, 80, 80, 78],
    [46, 74, 5, 25, 83, 3],
    [72, 32, 55, 51, 3, 81],
    [69, 76, 12, 99, 83, 80]
];

const MATRIX2 = [
    [10, 90, 27, 14, 39, 52],
    [29, 24, 79, 90, 23, 13],
    [17, 43, 62, 2, 73, 70],
    [58, 14, 6, 18, 16, 63],
    [15, 41, 78, 44, 73, 70],
    [25, 44, 81, 36, 80, 80]
];

// FONCTION UTILE POUR LE DEVELOPPEMENT

function print2dMatrix(matrix: MatrixShape) {
    for (const elt of matrix) {
        console.log(elt);
    }
}

function formatMatrix(matrix: MatrixShape) {
    matrix.forEach((yElt, y) => {
        yElt.forEach((xElt, x) => {
            if (xElt === 'E' || xElt === 'B') matrix[y][x] = 0;
        });
    });
    return matrix;
}

function optimalCoupling(matrix: MatrixShape) {
    let couplage = true;
    matrix.forEach(yElt => {
        if (yElt.filter(elt => elt === 'E').length !== 1) couplage = false;
    });
    return couplage;
}

// (END) FONCTION UTILE POUR LE DEVELOPPEMENT

// FONCTION DEDIEE A LA PREMIER ETAPE //

function recupMinCol(matrix: MatrixShape) {
    const colMinElt = [];
    let i = 0;
    while (i < matrix.length) {
        const col: MatrixCell[] = [];
        matrix.forEach((yElt, y) => {
            yElt.forEach((xElt, x) => {
                if (x === i) col.push(xElt);
            });
        });
        let min = col[0];
        col.forEach(elt => {
            if (min > elt) min = elt;
        });
        colMinElt.push(min);
        i += 1;
    }
    return colMinElt;
}

function recupMinLine(matrix: MatrixShape) {
    const lineMinElt: MatrixCell[] = [];
    matrix.forEach(yElt => {
        let minLine = yElt[0];
        yElt.forEach(xElt => {
            if (minLine > xElt) {
                minLine = xElt;
            }
        });
        lineMinElt.push(minLine);
    });
    return lineMinElt;
}

function removeMinCol(matrix: MatrixShape, listMinCol: MatrixCell[]) {
    let i = 0;
    while (i < matrix.length) {
        matrix.forEach((yElt, y) => {
            yElt.forEach((xElt, x) => {
                if (x === i) {
                    matrix[y][x] = Number(xElt) - Number(listMinCol[i]);
                }
            });
        });
        i += 1;
    }
    return matrix;
}

function removeMinLine(matrix: MatrixShape, listMinLine: MatrixCell[]) {
    matrix.forEach((yElt, y) => {
        yElt.forEach((xElt, x) => {
            matrix[y][x] = Number(xElt) - Number(listMinLine[y]);
        });
    });
    return matrix;
}

function minCout(listMinCol: MatrixCell[], listMinLine: MatrixCell[]) {
    let i = 0;
    let B = 0;
    while (i < listMinCol.length) {
        B += Number(listMinCol[i]) + Number(listMinLine[i]);
        i += 1;
    }
    return B;
}

// (END) FONCTION DEDIEE A LA PREMIER ETAPE //

// FONCTION DEDIEE A LA SECONDE ETAPE //

function choiceLine(matrix: MatrixShape) {
    let line = 0;
    const listeNbZero: number[] = [];
    const listeSansZero: number[] = [];
    matrix.forEach(line => {
        listeNbZero.push(line.filter(l => l === 0).length);
    });
    listeNbZero.forEach(elt => {
        if (elt !== 0) {
            listeSansZero.push(elt);
        }
    });
    line = listeNbZero.indexOf(Math.min(...listeSansZero));
    return line;
}

function zeroFraming(matrix: MatrixShape, line: number) {
    let trouver = false;
    let col = 0;
    matrix[line].forEach((xElt, x) => {
        if (xElt === 0 && !trouver) {
            trouver = true;
            col = x;
            matrix[line][x] = 'E';
        } else if (trouver && xElt === 0) {
            matrix[line][x] = 'B';
        }
    });
    matrix.forEach((yElt, y) => {
        yElt.forEach((xElt, x) => {
            if (x === col && xElt === 0) {
                matrix[y][x] = 'B';
            }
        });
    });
    return matrix;
}

function remainingZero(matrix: MatrixShape) {
    let rest = false;
    matrix.forEach(yElt => {
        yElt.forEach(xElt => {
            if (xElt === 0) {
                rest = true;
                return rest;
            }
        });
    });
    return rest;
}

// (END) FONCTION DEDIEE A LA SECONDE ETAPE //

// FONCTION DEDIEE A LA TROISIEME ETAPE //

function marquageLigneA(matrix: MatrixShape) {
    const ligneMarqueA: number[] = [];
    matrix.forEach((yElt, y) => {
        if (!yElt.includes('E')) {
            ligneMarqueA.push(y);
        }
    });
    return ligneMarqueA;
}

function marquageColonne(matrix: MatrixShape, marquage: Marquage) {
    let marquageEffectue = false;
    matrix.forEach((yElt, y) => {
        yElt.forEach((xElt, x) => {
            if (xElt === 'B' && y === marquage.ligne[marquage.ligne.length - 1]) {
                marquage.colonne.push(x);
                marquageEffectue = true;
            }
        });
    });
    return marquageEffectue;
}

function marquageLigneC(matrix: MatrixShape, marquage: Marquage) {
    let marquageEffectue = false;
    matrix.forEach((yElt, y) => {
        yElt.forEach((xElt, x) => {
            if (xElt === 'E' && x === marquage.colonne[marquage.colonne.length - 1]) {
                marquage.ligne.push(y);
                marquageEffectue = true;
            }
        });
    });
    return marquageEffectue;
}

function obtentionMarquage(matrix: MatrixShape) {
    const marquage: Marquage = {
        ligne: [],
        colonne: []
    };
    const ligneMarqueA = marquageLigneA(matrix);
    ligneMarqueA.forEach(ligneA => {
        marquage.ligne.push(ligneA);
        while (true) {
            let marquageEffectue = marquageColonne(matrix, marquage);
            if (!marquageEffectue) break;
            marquageEffectue = marquageLigneC(matrix, marquage);
            if (!marquageEffectue) break;
        }
    });
    return marquage;
}

function obtentionSm(matrix: MatrixShape, marquage: Marquage) {
    const supportMinimal: Marquage = {
        ligne: [],
        colonne: []
    };
    supportMinimal.colonne = marquage.colonne;
    matrix.forEach((_, i) => {
        if (!marquage.ligne.includes(i)) {
            supportMinimal.ligne.push(i);
        }
    });
    return supportMinimal;
}

function countMarquage(marquage: Marquage) {
    const marquageLigne = marquage.ligne;
    const marquageColonne = marquage.colonne;
    let nb = 0;
    marquageLigne.forEach(elt => {
        const nbOccur = marquageLigne.filter(m => m === elt).length;
        if (nb < nbOccur) {
            nb = nbOccur;
        }
    });
    marquageColonne.forEach(elt => {
        const nbOccur = marquageColonne.filter(m => m === elt).length;
        if (nb < nbOccur) {
            nb = nbOccur;
        }
    });
    return nb;
}

// (END) FONCTION DEDIEE A LA TROISIEME ETAPE //

// FONCTION DEDIEE A LA QUATRIEME ETAPE //

function getMin(matrix: MatrixShape, supportMinimal: Marquage) {
    const ligneRayee = supportMinimal.ligne;
    const colonneRayee = supportMinimal.colonne;
    const nb: number[] = [];
    matrix.forEach((yElt, y) => {
        yElt.forEach((xElt, x) => {
            if (!colonneRayee.includes(x) && !ligneRayee.includes(y)) {
                nb.push(xElt as number);
            }
        });
    });
    return Math.min(...nb);
}

function deplaceZero(matrix: MatrixShape, supportMinimal: Marquage, minNb: number) {
    const ligneRayee = supportMinimal.ligne;
    const colonneRayee = supportMinimal.colonne;
    matrix.forEach((yElt, y) => {
        yElt.forEach((xElt, x) => {
            if (!colonneRayee.includes(x) && !ligneRayee.includes(y)) {
                matrix[y][x] = Number(xElt) - minNb;
            } else if (colonneRayee.includes(x) && ligneRayee.includes(y)) {
                matrix[y][x] = Number(xElt) + minNb;
            }
        });
    });
    return matrix;
}

function updateCoutMinimal(coutActuel: number, nbMarquage: number, nbMin: number) {
    return coutActuel + nbMin * nbMarquage;
}

// (END) FONCTION DEDIEE A LA QUATRIEME ETAPE //

// ETAPE DE L'ALGORITHME //

function stepOne(matrix: MatrixShape, lastMinCost = 0) {
    const minCol = (recupMinCol(matrix) as unknown) as MatrixCell[];
    matrix = removeMinCol(matrix, minCol);
    const minLine = recupMinLine(matrix);
    matrix = removeMinLine(matrix, minLine);
    const coutMin = lastMinCost + minCout(minCol, minLine);

    return {
        matrix,
        coutMinimal: coutMin,
        minCol: minCol,
        minLine: minLine
    };
}

function stepTwo(stepOneResponse: {
    matrix: MatrixShape;
    coutMinimal: number;
    minCol: MatrixCell[];
    minLine: MatrixCell[];
}) {
    let matrix = [...stepOneResponse.matrix];
    const coutMinimal = stepOneResponse.coutMinimal;
    while (remainingZero(matrix)) {
        const line = choiceLine(matrix);
        matrix = zeroFraming(matrix, line);
    }
    return {
        matrix,
        coutMinimal
    };
}

function stepThree(stepTwoResponse: { matrix: MatrixCell[][]; coutMinimal: number }) {
    const matrix = stepTwoResponse.matrix;
    const coutMinimal = stepTwoResponse.coutMinimal;
    const marquage = obtentionMarquage(matrix);
    const nbMarquage = countMarquage(marquage);
    const supportMinimal = obtentionSm(matrix, marquage);
    return {
        matrix,
        coutMinimal,
        supportMinimal,
        nbMarquage
    };
}

function stepFour(stepThreeResponse: {
    matrix: MatrixCell[][];
    coutMinimal: number;
    supportMinimal: Marquage;
    nbMarquage: number;
}) {
    let matrix = stepThreeResponse.matrix;
    const oldCoutMinimal = stepThreeResponse.coutMinimal;
    const supportMinimal = stepThreeResponse.supportMinimal;
    const nbMarquage = stepThreeResponse.nbMarquage;
    matrix = formatMatrix(matrix);
    const minNb = getMin(matrix, supportMinimal);
    matrix = deplaceZero(matrix, supportMinimal, minNb);
    const coutMinimal = updateCoutMinimal(oldCoutMinimal, nbMarquage, minNb);

    return {
        matrix,
        oldCoutMinimal,
        coutMinimal,
        minNb,
        supportMinimal,
        nbMarquage
    };
}

function main() {
    let stepOneResponse = stepOne(MATRIX2);
    let stepTwoResponse = stepTwo(stepOneResponse);

    while (!optimalCoupling(stepTwoResponse.matrix)) {
        let stepThreeResponse = stepThree(stepTwoResponse);
        let stepFourResponse = stepFour(stepThreeResponse);
        stepOneResponse = stepOne(stepFourResponse.matrix, stepFourResponse.coutMinimal);
        stepTwoResponse = stepTwo(stepOneResponse);
    }
    print2dMatrix(stepTwoResponse.matrix);
    console.log(stepTwoResponse.coutMinimal);
}

main();
