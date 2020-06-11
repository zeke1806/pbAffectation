# -*-coding:utf-8 -*

MATRIX = [
    [14, 6, 18, 16, 63, 15],
    [41, 78, 44, 73, 70, 25],
    [44, 81, 36, 80, 80, 78],
    [46, 74, 5, 25, 83, 3],
    [72, 32, 55, 51, 3, 81],
    [69, 76, 12, 99, 83, 80],
]

MATRIX2 = [
    [10, 90, 27, 14, 39, 52],
    [29, 24, 79, 90, 23, 13],
    [17, 43, 62, 2, 73, 70],
    [58, 14, 6, 18, 16, 63],
    [15, 41, 78, 44, 73, 70],
    [25, 44, 81, 36, 80, 80],
]

# FONCTION UTILE POUR LE DEVELOPPEMENT #

def print_2d_matrix (matrix):
    """Affiche une matric en deux dimessions"""
    for elt in matrix:
        print(elt)

def format_matrix (matrix):
    """Remet les E et B de la matrice en 0"""
    for y, y_elt in enumerate(matrix):
        for x, x_elt in enumerate(y_elt):
            if x_elt == 'E' or x_elt == 'B':
                matrix[y][x] = 0
    return matrix

def optimal_coupling (matrix):
    """Verifie le couplage optimal"""
    couplage = True
    for y_elt in matrix:
        if y_elt.count('E') != 1:
            couplage = False
    return couplage

# (END) FONCTION UTILE POUR LE DEVELOPPEMENT #

# FONCTION DEDIEE A LA PREMIER ETAPE #

def recup_min_col (matrix):
    """Recuperation des min par colonne"""
    col_min_elt = []
    i = 0
    while i < len(matrix):
        col = []
        for y, y_elt in enumerate(matrix):
            for x, x_elt in enumerate(y_elt):
                if x == i:
                    col.append(x_elt)
        min = col[0]
        for elt in col:
            if min > elt:
                min = elt
        col_min_elt.append(min)
        i += 1
    return col_min_elt

def recup_min_line (matrix):
    """Recuperation des min par ligne"""
    line_min_elt = []
    for y_elt in matrix:
        min_line = y_elt[0]
        for x_elt in y_elt:
            if min_line > x_elt:
                min_line = x_elt
        line_min_elt.append(min_line)
    return line_min_elt

def remove_min_col (matrix, list_min_col):
    """Soustraction des min par colonne"""
    i = 0
    while i < len(matrix):
        for y, y_elt in enumerate(matrix):
            for x, x_elt in enumerate(y_elt):
                if x == i:
                    matrix[y][x] = x_elt - list_min_col[i]
        i += 1
    return matrix

def remove_min_line (matrix, list_min_line):
    """Soustraction des min par ligne"""
    for y, y_elt in enumerate(matrix):
        for x, x_elt in enumerate(y_elt):
            matrix[y][x] = x_elt - list_min_line[y]
    return matrix

def min_cout (list_min_col, list_min_line):
    """Calcule du coup minimal"""
    i = 0
    B = 0
    while i < len(list_min_col):
        B += (list_min_col[i] + list_min_line[i])
        i += 1
    return B

# (END) FONCTION DEDIEE A LA PREMIER ETAPE #

# FONCTION DEDIEE A LA SECONDE ETAPE #

def choice_line (matrix):
    """a- Choix de la ligne qui contient le moins de zero libre"""
    line = 0
    liste_nb_zero = list()
    liste_sans_zero = list()
    for line in matrix:
        liste_nb_zero.append(line.count(0))
    for elt in liste_nb_zero:
        if elt != 0:
            liste_sans_zero.append(elt)
    line = liste_nb_zero.index(min(liste_sans_zero))
    return line

def zero_framing (matrix, line):
    """b- Encadrement du premier zero de la ligne et barrer le reste des zeros sur la ligne/colonne
    On designera par E un zero encadre et par B un zero barre"""
    trouver = False
    col = 0
    for x, x_elt in enumerate(matrix[line]):
        if x_elt == 0 and not trouver:
            trouver = True
            col = x
            matrix[line][x] = 'E'
            continue
        if trouver and x_elt == 0:
            matrix[line][x] = 'B'
    for y, y_elt in enumerate(matrix):
        for x, x_elt in enumerate(y_elt):
            if x == col and x_elt == 0:
                matrix[y][x] = 'B' 
    return matrix

def remaining_zero (matrix):
    """Verifie si il reste des zeros non Encadre ou Barre dans la matrice"""
    rest = False
    for y_elt in matrix:
        for x_elt in y_elt:
            if x_elt == 0:
                rest = True
                break
    return rest

# (END) FONCTION DEDIEE A LA SECONDE ETAPE #

# FONCTION DEDIEE A LA TROISIEME ETAPE #

def marquage_ligne_a (matrix):
    """a- Retourne une liste d'index des lignes avec aucun zero encadre"""
    ligne_marque_a = list()
    for y, y_elt in enumerate(matrix):
        if 'E' not in y_elt:
            ligne_marque_a.append(y)
    return ligne_marque_a

def marquage_colonne (matrix, marquage):
    """b- Marque une colonne ayant un zero barre sur une ligne marquee"""
    marquage_effectue = False
    for y, y_elt in enumerate(matrix):
        for x, x_elt in enumerate(y_elt):
            if x_elt == 'B' and y == marquage['ligne'][-1]:
                marquage['colonne'].append(x)
                marquage_effectue = True
    return marquage_effectue
             

def marquage_ligne_c (matrix, marquage):
    """c- Marque une ligne ayant un zero encadre sur une colonne marquee"""
    marquage_effectue = False
    for y, y_elt in enumerate(matrix):
        for x, x_elt in enumerate(y_elt):
            if x_elt == 'E' and x == marquage['colonne'][-1]:
                marquage['ligne'].append(y)
                marquage_effectue = True
    return marquage_effectue

def obtention_marquage (matrix):
    """Renvoie une liste de marquage de la matrice"""
    marquage = {
        'ligne': list(),
        'colonne': list()
    }
    ligne_marque_a = marquage_ligne_a(matrix)
    for ligne_a in ligne_marque_a:
        marquage['ligne'].append(ligne_a)
        while True:
            marquage_effectue = marquage_colonne(matrix, marquage)
            if not marquage_effectue:
                break
            marquage_effectue = marquage_ligne_c(matrix, marquage)
            if not marquage_effectue:
                break
    return marquage

def obtention_sm (matrix, marquage):
    """Renvoie le support minimal sous forme de liste"""
    support_minimal = {
        'ligne': list(),
        'colonne': list()
    }
    support_minimal['colonne'] = marquage['colonne']
    for i in enumerate(matrix):
        if i[0] not in marquage['ligne']:
            support_minimal['ligne'].append(i[0])
    return support_minimal

def count_marquage (marquage):
    """Compte le nombre de marquage effectue"""
    marquage_ligne = marquage['ligne']
    marquage_colonne = marquage['colonne']
    nb = 0
    for elt in marquage_ligne:
       nb_occur = marquage_ligne.count(elt)
       if nb < nb_occur:
           nb = nb_occur
    for elt in marquage_colonne:
        nb_occur = marquage_colonne.count(elt)
        if nb < nb_occur:
            nb = nb_occur
    return nb

# (END) FONCTION DEDIEE A LA TROISIEME ETAPE #

# FONCTION DEDIEE A LA QUATRIEME ETAPE #

def get_min (matrix, support_minimal):
    """Retourne le plus petit nombre du tableau restant"""
    ligne_rayee = support_minimal['ligne']
    colonne_rayee = support_minimal['colonne']
    nb = list()
    for y, y_elt in enumerate(matrix):
        for x, x_elt in enumerate(y_elt):
            if x not in colonne_rayee and y not in ligne_rayee:
                nb.append(x_elt)
    return min(nb)

def deplace_zero (matrix, support_minimal, min_nb):
    """Retranche le nombre minimal de tous les elements non rayes et l'ajoute au elt rayee"""
    ligne_rayee = support_minimal['ligne']
    colonne_rayee = support_minimal['colonne']
    for y, y_elt in enumerate(matrix):
        for x, x_elt in enumerate(y_elt):
            if x not in colonne_rayee and y not in ligne_rayee:
                matrix[y][x] = x_elt - min_nb
            elif x in colonne_rayee and y in ligne_rayee:
                matrix[y][x] = x_elt + min_nb
    return matrix

def update_cout_minimal (cout_actuel, nb_marquage, nb_min):
    """Retourne le nonmbre minimal nouveau au cout minimal"""
    return cout_actuel + (nb_min * nb_marquage)

# (END) FONCTION DEDIEE A LA QUATRIEME ETAPE #

# ETAPE DE L'ALGORITHME #

def step_one (matrix, last_min_cost=0):
    """Obtention des zeros par rangee"""
    min_col = recup_min_col(matrix)
    matrix = remove_min_col(matrix, min_col)
    min_line = recup_min_line(matrix)
    matrix = remove_min_line(matrix, min_line)
    cout_min = last_min_cost + min_cout(min_col, min_line)
    return {
        'matrix': matrix,
        'cout_minimal': cout_min,
        'min_col': min_col,
        'min_line': min_line,
    }

def step_two (step_one_response):
    """Determination d'un couplage optimal"""
    matrix = list(step_one_response['matrix'])
    cout_minimal = step_one_response['cout_minimal']
    while remaining_zero(matrix):
        line = choice_line(matrix)
        matrix = zero_framing(matrix, line)
    return {'matrix': matrix, 'cout_minimal': cout_minimal}

def step_three (step_two_response):
    """Recherche d'un support optimal"""
    matrix = step_two_response['matrix']
    cout_minimal = step_two_response['cout_minimal']
    marquage = obtention_marquage(matrix)
    nb_marquage = count_marquage(marquage)
    support_minimal = obtention_sm(matrix, marquage)
    return {
        'matrix': matrix,
        'cout_minimal': cout_minimal,
        'support_minimal': support_minimal,
        'nb_marquage': nb_marquage,
    }

def step_four (step_three_response):
    """Deplacement eventuel de certains zero"""
    matrix = step_three_response['matrix']
    old_cout_minimal = step_three_response['cout_minimal']
    support_minimal = step_three_response['support_minimal']
    nb_marquage = step_three_response['nb_marquage']
    matrix = format_matrix(matrix)
    min_nb = get_min(matrix, support_minimal)
    matrix = deplace_zero(matrix, support_minimal, min_nb)
    cout_minimal = update_cout_minimal(old_cout_minimal, nb_marquage, min_nb)
    return {
        'matrix': matrix,
        'old_cout_minimal': old_cout_minimal,
        'cout_minimal': cout_minimal,
        'min_nb': min_nb,
        'support_minimal': support_minimal,
        'nb_marquage': nb_marquage,
    }

# (END) ETAPE DE L'ALGORITHME #

# zone de test
if __name__ == "__main__":
    step_one_response = step_one(MATRIX)
    step_two_response = step_two(step_one_response)
    while not optimal_coupling(step_two_response['matrix']):
        step_three_response = step_three(step_two_response)
        step_four_response = step_four(step_three_response)
        step_one_response = step_one(step_four_response['matrix'], step_four_response['cout_minimal'])
        step_two_response = step_two(step_one_response)
    print_2d_matrix(step_two_response['matrix'])
    print(step_two_response['cout_minimal'])