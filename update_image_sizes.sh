#!/usr/bin/env bash

if ! [ -x "$(command -v curl)" ]; then
    echo "curl is a required dependency"
    exit 1
fi

if ! [ -x "$(command -v yq)" ]; then
    echo "yq is a required dependency - please see https://github.com/mikefarah/yq/#install for installation details"
    exit 1
fi

files=$(find content/gallery -name '*.yaml' -type f)

for file in ${files[@]}; do
    echo -e "\nProcessing $file"
    numImages=$(yq '.images | length' $file)
    for ((i=0; i<$numImages; ++i)); do
        type=$(yq ".images[$i] | tag" $file)
        case $type in
            !!map)
                url=$(yq -r .images[$i].url $file)
                ;;
            *)
                url=$(yq -r .images[$i] $file)
                ;;
        esac
        output=$(curl -r 0-25 --silent $url | identify -quiet -format "%w %h" - 2> /dev/null)
        IFS=' ' read -r -a dimensions <<< "$output"
        width=${dimensions[0]}
        height=${dimensions[1]}
        echo "$url width=$width, height=$height"
        yq -i e ".images[$i] = {\"url\": \"$url\", \"width\": $width, \"height\": $height}" $file
    done
done