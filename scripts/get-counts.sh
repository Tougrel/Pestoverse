#!/usr/bin/env bash

###########################################################
## Script to get the top 4 submissions for each category ##
###########################################################

## Usage: bash ./get-counts.sh [-c]
##    -c  Cache database data to file (optional)
## e.g. bash ./get-counts.sh
## e.g. bash ./get-counts.sh -c

# Sets a bunch of bash safetynet settings - see https://gist.github.com/mohanpedala/1e2ff5661761d3abd0385e8223e16425 for more info
set -euo pipefail

# The script requires 'gum' to handle interactivity and output
if ! command -v gum &>/dev/null; then
	echo "gum could not be found - Please download from https://github.com/charmbracelet/gum/releases/latest"
	exit
fi

# The script requires 'jq' to handle json parsing and output
if ! command -v jq &>/dev/null; then
	echo "jq could not be found - Please download from https://github.com/stedolan/jq/releases/latest"
	exit
fi

CACHE='false'

# Handle the `-c` flag mentioned above in usage
while getopts 'c' flag; do
	case "$flag" in
	c) CACHE='true' ;;
	esac
done

#######################
## Logging Utilities ##
#######################

info() {
	echo -e "$(gum log -l info "$@")" >&2
}

error() {
	echo -e "$(gum log -l error "$@")" >&2
}

warn() {
	echo -e "$(gum log -l warn "$@")" >&2
}

# Error scenario handling
# For some reason ctrl-c wasn't cancelling properly, so added this to force handling (and add some nice logging)
abort() {
	if [ $? -gt 0 ]; then
		error "EXIT caught. Aborting"
		exit 1
	fi
}
# Configures the error handling defined above (EXIT = do this when any exit code is sent)
trap abort EXIT

# Handle the database querying and add a fancy spinner when Running
# Also uses the CACHE variable set above to cache results when requested
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
	# Creates a nicer header with a border
	gum style --border double "$(get_category_name "$categories" "$category_id")"
	echo "$counts" | jq -c ".[] | select(.category_id == $category_id)" | jq -sr '.[:4][] | "\(.submission) (\(.count))"'
done
