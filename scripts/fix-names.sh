#!/usr/bin/env bash

#################################################
## Script to Find similar names in submissions ##
## > e.g. vihi, vihilsta, vihilstini, vihil    ##
## and rename to a given value (e.g. vihilsta) ##
#################################################

## Usage: bash ./fix-names.sh [-c]
##    -c  Cache database data to file (optional)
## e.g. bash ./fix-names.sh
## e.g. bash ./fix-names.sh -c

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
		result=$(gum spin --spinner line --show-output --title "Running Query..." -- npx wrangler d1 execute pestoverse --command "$query" --json)
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

# Query the database for submissions that contain the search parameter
search_for_needle() {
	search="$1"
	query="SELECT id, submission FROM submissions WHERE submission like '%$search%'"
	run_sql "$query" "results-$search.json"
}

get_ids_to_change() {
	to_change="$1"
	entries="$2"
	ids_to_change=$(jq -r --argjson to_change "$to_change" '.[] | select(.submission as $in | $to_change | index($in)) | .id' <<<"$entries")

	if [ -z "$ids_to_change" ]; then
		error "Nothing selected to change"
		exit 1
	fi

	echo "$ids_to_change" | tr '\n' ',' | sed 's/,$//'
}

search=$(gum input --placeholder "Query to search for")
if [ -z $search ]; then
	error "Please specify a query"
	exit 1
fi
info "Searching for: $search"

entries=$(search_for_needle "$search")
choices=$(jq -r '.[].submission' <<<"$entries" | sed 's/ /_/g' | sort | uniq)

selections=$(gum choose --no-limit --header "Values to change" --height=20 ${choices[@]})
to_change=$(jq -c -n '$ARGS.positional' --args ${selections[@]} | sed 's/_/ /g')

info "Will change values: $to_change"

ids_to_change=$(get_ids_to_change "$to_change" "$entries")

if [ -z "$ids_to_change" ]; then
	error "Nothing selected to change"
	exit 1
fi

info "ids_to_change: $ids_to_change"

new_value=$(gum input --placeholder "New value")

update_query="UPDATE submissions SET submission = '$new_value' WHERE id IN ($ids_to_change)"
if gum confirm "Execute $update_query?"; then
	if [ "$CACHE" = 'true' ]; then
		warn "would run [npx wrangler d1 execute pestoverse --command \"$update_query\" --json]"
	else
		gum spin -s line --title "Updating..." --show-output -- npx wrangler d1 execute pestoverse --command "$update_query" --json
	fi
	info "Successfully Updated!"
else
	info "Aborted"
	exit 1
fi
