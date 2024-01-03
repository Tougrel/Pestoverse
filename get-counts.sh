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

run_sql() {
	query="$1"
	wrangler d1 execute pestoverse --command "$query" --json
}

get_categories() {
	query="select id, name from categories"
	# if [ -f categories.json ]; then
	# 	cat categories.json
	# else
	run_sql "$query" | jq '.[0].results' #| tee categories.json
	# fi
}

get_category_name() {
	categories="$1"
	id="$2"
	echo "$categories" | jq -r ".[] | select(.id == $id) | .name"
}

get_counts() {
	query="select category_id, lower(submission) as submission, count(submission) as count from submissions group by lower(submission), category_id collate nocase order by count(submission) desc"
	# if [ -f counts.json ]; then
	# 	cat counts.json
	# else
	run_sql "$query" | jq '.[0].results' #| tee counts.json
	# fi
}

categories=$(get_categories)
category_ids=($(echo "$categories" | jq -r '.[].id' | tr '\n' ' '))
counts=$(get_counts)

for category_id in "${category_ids[@]}"; do
	gum style --border double "$(get_category_name "$categories" "$category_id")"
	echo "$counts" | jq -c ".[] | select(.category_id == $category_id)" | jq -sr '.[:4][] | "\(.submission) (\(.count))"'
done
