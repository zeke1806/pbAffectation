import {
    MatrixShape,
    formatMatrix,
    optimalCoupling,
    stepFour,
    stepOne,
    stepThree,
    stepTwo
} from './algo';

const MATRIX = [
    [14, 6, 18, 16, 63, 15],
    [41, 78, 44, 73, 70, 25],
    [44, 81, 36, 80, 80, 78],
    [46, 74, 5, 25, 83, 3],
    [72, 32, 55, 51, 3, 81],
    [69, 76, 12, 99, 83, 80]
];

const MATRIX2 = [
    [86, 94, 82, 84, 37, 85],
    [59, 22, 56, 27, 30, 75],
    [56, 19, 64, 20, 20, 22],
    [54, 26, 95, 75, 17, 97],
    [28, 68, 45, 49, 97, 19],
    [31, 24, 88, 1, 17, 20]
];

const STEP4_DESCRIPTION = `Reperage du plus petit nombre des cases non rayees;<br>
Retranchement de celui ci de tous les elements non rayes et<br>rajout aux elements rayes deux fois`;

function generateResponse(step: number, value: any) {
    let cellule: any;
    if (step == 1) {
        cellule = {
            is_matrix: true,
            step: step,
            matrix: JSON.parse(JSON.stringify(value['matrix'])),
            etape: 'Etape 1 Obtention des zeros par rangee',
            description: 'Retranche chacun des elements de chaque rangee de son plus petit element',
            data: [
                `Colonne => ${value['minCol']}`,
                `Ligne => ${value['minLine']}`,
                `Cout_min => ${value['coutMinimal']}`
            ]
        };
    } else if (step == 2) {
        cellule = {
            is_matrix: true,
            step: step,
            matrix: JSON.parse(JSON.stringify(value['matrix'])),
            etape: "Etape 2 Determination d'un couplage optimal",
            description: "Affecte le maximum d'arc du cout nul du dernier tableau",
            data: ['E => Encadree', 'B => Barree']
        };
    } else if (step == 3) {
        cellule = {
            is_matrix: true,
            step: step,
            matrix: formatMatrix(JSON.parse(JSON.stringify(value['matrix']))),
            etape: "Etape 3 Recherche d'un support minimal",
            description: 'Marquage; Rayage des lignes non marquees et des colonnes marquees',
            support_minimal: value['supportMinimal'],
            data: [
                `Support minimal => ${value['supportMinimal']}`,
                `Nombre de marquage le plus eleve effectue => ${value['nbMarquage']}`,
                'Couleur orange => rayee une fois',
                'Couleur rouge => rayee deux fois'
            ]
        };
    } else {
        cellule = {
            is_matrix: true,
            step: step,
            matrix: JSON.parse(JSON.stringify(value['matrix'])),
            etape: 'Etape 4 Deplacement eventuel de certains zero',
            description: STEP4_DESCRIPTION,
            data: [
                `Valeur minimale => ${value['minNb']}`,
                `Nouveau cout minimal => ${value['oldCoutMinimal']} + (${value['nbMarquage']} * ${
                    value['minNb']
                }) = ${value['oldCoutMinimal'] + value['nbMarquage'] * value['minNb']}`
            ]
        };
    }
    return cellule;
}

function coordonnees(matrix: MatrixShape) {
    const coordonnees: any = [];
    matrix.forEach((yElt: any, y: any) => {
        yElt.forEach((xElt: any, x: any) => {
            if (xElt === 'E') {
                coordonnees.push([y, x]);
            }
        });
    });
    return coordonnees;
}

function generate_graph(coordonnees: any) {
    const nodes: any = [];
    const links: any = [];
    const line_id = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const column_id = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const cellule: {
        is_graph: boolean;
        graph?: any;
    } = {
        is_graph: true
    };
    for (let elt of coordonnees) {
        elt.forEach((elt_: any, i: any) => {
            nodes.push({
                id: i === 0 ? line_id[elt_] : column_id[elt_],
                groupe: i == 0 ? 1 : 2
            });
        });

        links.push({
            source: line_id[elt[0]],
            target: column_id[elt[1]],
            value: 5
        });
    }
    cellule.graph = {
        nodes: nodes,
        links: links
    };
    return cellule;
}

function complement(matrix: MatrixShape) {
    matrix.forEach((yElt, y) => {
        yElt.forEach((xElt, x) => {
            matrix[y][x] = 100 - Number(xElt);
        });
    });

    return matrix;
}

export function main(MATRIX_: any, type_process: unknown = null) {
    MATRIX_ = type_process == 'min' ? MATRIX_ : complement(MATRIX_);
    let response_liste: any = [];
    let divider = { divider: true, inset: true };
    let step_one_response = stepOne(MATRIX_);
    response_liste.push(generateResponse(1, step_one_response));
    response_liste.push(divider);
    let step_two_response = stepTwo(step_one_response);
    response_liste.push(generateResponse(2, step_two_response));
    response_liste.push(divider);
    while (!optimalCoupling(step_two_response['matrix'])) {
        let step_three_response = stepThree(step_two_response);
        response_liste.push(generateResponse(3, step_three_response));
        response_liste.push(divider);
        let step_four_response = stepFour(step_three_response);
        response_liste.push(generateResponse(4, step_four_response));
        response_liste.push(divider);
        step_one_response = stepOne(
            step_four_response['matrix'],
            step_four_response['coutMinimal']
        );
        response_liste.push(generateResponse(1, step_one_response));
        response_liste.push(divider);
        step_two_response = stepTwo(step_one_response);
        response_liste.push(generateResponse(2, step_two_response));
        response_liste.push(divider);
    }

    let coordonees = coordonnees(step_two_response['matrix']);
    response_liste.push(generate_graph(coordonees));
    return response_liste;
}
