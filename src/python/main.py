# -*-coding:utf-8 -*

from algo_hongrois import *
from sys import argv
import copy
import json

MATRIX = [
    [14, 6, 18, 16, 63, 15],
    [41, 78, 44, 73, 70, 25],
    [44, 81, 36, 80, 80, 78],
    [46, 74, 5, 25, 83, 3],
    [72, 32, 55, 51, 3, 81],
    [69, 76, 12, 99, 83, 80],
]

MATRIX2 = [
    [86, 94, 82, 84, 37, 85],
    [59, 22, 56, 27, 30, 75],
    [56, 19, 64, 20, 20, 22],
    [54, 26, 95, 75, 17, 97],
    [28, 68, 45, 49, 97, 19],
    [31, 24, 88, 1, 17, 20],
]

STEP4_DESCRIPTION = """Reperage du plus petit nombre des cases non rayees;<br>
Retranchement de celui ci de tous les elements non rayes et<br>rajout aux elements rayes deux fois"""

def generate_response(step, value):
    """Genere une reponse pour chaque etape"""
    if step == 1:
        cellule = {
            'is_matrix': True,
            'step': step,
            'matrix': copy.deepcopy(value['matrix']),
            'etape': 'Etape 1 Obtention des zeros par rangee',
            'description': 'Retranche chacun des elements de chaque rangee de son plus petit element',
            'data': [
                'Colonne => {}'.format(value['min_col']),
                'Ligne => {}'.format(value['min_line']),
                'Cout_min => {}'.format(value['cout_minimal']),
            ],
        }
    elif step == 2:
        cellule = {
            'is_matrix': True,
            'step': step,
            'matrix': copy.deepcopy(value['matrix']),
            'etape': "Etape 2 Determination d'un couplage optimal",
            'description': 'Affecte le maximum d\'arc du cout nul du dernier tableau',
            'data': [
                'E => Encadree',
                'B => Barree',
            ]
        }
    elif step == 3:
        cellule = {
            'is_matrix': True,
            'step': step,
            'matrix': format_matrix(copy.deepcopy(value['matrix'])),
            'etape': "Etape 3 Recherche d'un support minimal",
            'description': "Marquage; Rayage des lignes non marquees et des colonnes marquees",
            'support_minimal': value['support_minimal'],
            'data': [
                 'Support minimal => {}'.format(value['support_minimal']),
                 'Nombre de marquage le plus eleve effectue => {}'.format(value['nb_marquage']),
                 'Couleur orange => rayee une fois',
                 'Couleur rouge => rayee deux fois',
            ],
        }
    else: #4
        cellule = {
            'is_matrix': True,
            'step': step,
            'matrix': copy.deepcopy(value['matrix']),
            'etape': 'Etape 4 Deplacement eventuel de certains zero',
            'description': STEP4_DESCRIPTION,
            'data': [
                'Valeur minimale => {}'.format(value['min_nb']),
                'Nouveau cout minimal => {} + ({} * {}) = {}'.format(
                    value['old_cout_minimal'],
                    value['nb_marquage'],
                    value['min_nb'],
                    value['old_cout_minimal'] + (value['nb_marquage'] * value['min_nb'])
                )
            ]
        }
    return cellule

def coordonnees (matrix):
    """Retourne les coordonnees d'affection optimal"""
    coordonnees = list()
    for y, y_elt in enumerate(matrix):
        for x, x_elt in enumerate(y_elt):
            if x_elt == 'E':
                coordonnees.append((y, x))
    return coordonnees

def generate_graph (coordonnees):
    """Genere l'entree du graphe dans la reponse"""
    nodes = list()
    links = list()
    line_id = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    column_id = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    cellule = {
        'is_graph': True,
    }
    for elt in coordonnees:
        for i, elt_ in enumerate(elt):
            nodes.append({
                'id': line_id[elt_] if i == 0 else column_id[elt_],
                'groupe': 1 if i == 0 else 2
            })
        links.append({
            'source': line_id[elt[0]],
            'target': column_id[elt[1]],
            'value': 5,
        })
    cellule['graph'] = {
        'nodes': nodes,
        'links': links,
    }
    return cellule

def complement (matrix):
    """Applique un complement a 100 sur la matrice"""
    for y, y_elt in enumerate(matrix):
        for x, x_elt in enumerate(y_elt):
            matrix[y][x] = 100 - x_elt
    return matrix
 
# PROGRAMME PRINCIPALE #

def main (MATRIX_, type_process=None):
    """Fonction principale entree de l'algorithme"""
    MATRIX_ = MATRIX_ if type_process == 'min' else complement(MATRIX_)
    response_liste = []
    divider = { 'divider': True, 'inset': True }
    step_one_response = step_one(MATRIX_)
    response_liste.append(
        generate_response(1, step_one_response),
    )
    response_liste.append(divider)
    step_two_response = step_two(step_one_response)
    response_liste.append(
        generate_response(2, step_two_response)
    )
    response_liste.append(divider)
    while not optimal_coupling(step_two_response['matrix']):
        step_three_response = step_three(step_two_response)
        response_liste.append(
            generate_response(3, step_three_response)
        )
        response_liste.append(divider)
        step_four_response = step_four(step_three_response)
        response_liste.append(
            generate_response(4, step_four_response)
        )
        response_liste.append(divider)
        step_one_response = step_one(
            step_four_response['matrix'],
            step_four_response['cout_minimal']
        )
        response_liste.append(
            generate_response(1, step_one_response),
        )
        response_liste.append(divider)
        step_two_response = step_two(step_one_response)
        response_liste.append(
            generate_response(2, step_two_response)
        )
        response_liste.append(divider)
    coordonees = coordonnees(step_two_response['matrix'])
    response_liste.append(
        generate_graph(coordonees)
    )
    return response_liste

# (END) PROGRAMME PRINCIPALE #

# zone de test
if __name__ == "__main__":
    data = json.loads(argv[1])
    print(json.dumps(main(data, argv[2])))
    # print(main(MATRIX))