#!/usr/bin/env bash

set -euo pipefail

if ! command -v gum &>/dev/null; then
	echo "gum could not be found - Please download from https://github.com/charmbracelet/gum/releases/latest"
	exit
fi

if ! command -v jq &>/dev/null; then
	echo "jq could not be found - Please download from https://github.com/stedolan/jq/releases/latest"
	exit
fi

CACHE='false'

while getopts 'c' flag; do
	case "$flag" in
	c) CACHE='true' ;;
	esac
done

info() {
	echo -e "$(gum log -l info $@)" >&2
}

error() {
	echo -e "$(gum log -l error $@)" >&2
}

abort() {
	if [ $? -gt 0 ]; then
		error "EXIT caught. Aborting"
		exit 1
	fi
}
trap abort EXIT

run_sql() {
	query="$1"
	file="$2"
	info "Running query [$query]"
	if [ "$CACHE" = 'true' ] && [ -f $file ]; then
		cat $file
	else
		result=$(gum spin --spinner line --show-output --title "Running Query..." -- wrangler d1 execute pestoverse --command "$query" --json)
		if [ $? -ne 0 ]; then
			error "$result"
		else
			result=$(echo "$result" | jq '.[0].results')
			if [ "$CACHE" = 'true' ]; then
				echo -e "$result" | tee "$file"
			else
				echo -e "$result"
			fi
		fi
	fi
}

get_categories() {
	query="select id, name from categories"
	run_sql "$query" "categories.json"
}

get_category_name() {
	categories="$1"
	id="$2"
	echo "$categories" | jq -r ".[] | select(.id == $id) | .name"
}

get_counts() {
	query="select category_id, lower(submission) as submission, count(submission) as count from submissions group by lower(submission), category_id collate nocase order by count(submission) desc"
	run_sql "$query" "counts.json"
}

categories=$(get_categories)

category_ids=($(echo "$categories" | jq -r '.[].id' | tr '\n' ' '))

counts=$(get_counts)

for category_id in "${category_ids[@]}"; do
	gum style --border double "$(get_category_name "$categories" "$category_id")"
	echo "$counts" | jq -c ".[] | select(.category_id == $category_id)" | jq -sr '.[:4][] | "\(.submission) (\(.count))"'
done
