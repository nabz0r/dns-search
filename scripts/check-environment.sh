#!/bin/bash

# Vérification complète de l'environnement
checkSystem() {
    # Vérification de la mémoire disponible
    AVAILABLE_MEM=$(free -m | awk 'NR==2{printf "%.0f\n", $7}')
    if [ "$AVAILABLE_MEM" -lt 512 ]; then
        echo "ATTENTION: Mémoire disponible inférieure à 512MB"
        return 1
    fi

    # Vérification de l'espace disque
    AVAILABLE_DISK=$(df -m . | awk 'NR==2{print $4}')
    if [ "$AVAILABLE_DISK" -lt 1024 ]; then
        echo "ATTENTION: Espace disque inférieur à 1GB"
        return 1
    fi

    return 0
}

# Vérification des ports
checkPorts() {
    # Vérification du port 3000
    if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
        echo "ATTENTION: Le port 3000 est déjà utilisé"
        return 1
    fi

    # Vérification du port 3001
    if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null ; then
        echo "ATTENTION: Le port 3001 est déjà utilisé"
        return 1
    fi

    return 0
}

# Vérification des permissions
checkPermissions() {
    # Vérification des droits d'écriture
    if [ ! -w "." ]; then
        echo "ATTENTION: Pas de droits d'écriture dans le répertoire courant"
        return 1
    fi

    return 0
}

# Exécution des vérifications
main() {
    echo "Vérification de l'environnement..."

    checkSystem
    SYSTEM_STATUS=$?

    checkPorts
    PORTS_STATUS=$?

    checkPermissions
    PERMISSIONS_STATUS=$?

    if [ $SYSTEM_STATUS -eq 0 ] && [ $PORTS_STATUS -eq 0 ] && [ $PERMISSIONS_STATUS -eq 0 ]; then
        echo "Environnement valide pour l'installation"
        exit 0
    else
        echo "Des problèmes ont été détectés dans l'environnement"
        exit 1
    fi
}

main
