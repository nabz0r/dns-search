#!/bin/bash

# Configuration
OUTPUT_FILE="CHANGELOG.md"
TEMP_FILE=".changelog_temp"

# Récupération des tags triés par date
tags=$(git tag --sort=-creatordate)

# En-tête du fichier
echo "# Journal des Modifications" > $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# Pour chaque tag
for tag in $tags
do
    echo "## [$tag] - $(git log -1 --format=%ad --date=short $tag)" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    
    # Si ce n'est pas le premier tag, on récupère les commits jusqu'au tag précédent
    if [ -n "$previous_tag" ]
    then
        range="$tag..$previous_tag"
    else
        range="$tag"
    fi
    
    # Récupération des commits par type
    echo "### Nouvelles fonctionnalités" >> $OUTPUT_FILE
    git log $range --format="- %s" --grep="^feat" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    
    echo "### Corrections de bugs" >> $OUTPUT_FILE
    git log $range --format="- %s" --grep="^fix" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    
    echo "### Documentation" >> $OUTPUT_FILE
    git log $range --format="- %s" --grep="^docs" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    
    echo "### Autres changements" >> $OUTPUT_FILE
    git log $range --format="- %s" --grep="^(chore|refactor|style|test)" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    
    previous_tag=$tag
done

# Nettoyage des sections vides
sed -i '/^### .*\n\n/d' $OUTPUT_FILE

echo "CHANGELOG généré dans $OUTPUT_FILE"