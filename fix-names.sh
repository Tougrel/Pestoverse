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

info() {
	gum log -t kitchen -l info $@
}

error() {
	gum log -t kitchen -l error $@
}

abort() {
	if [ $? -gt 0 ]; then
		error "EXIT caught. Aborting"
		exit 1
	fi
}
trap abort EXIT

search=$(gum input --placeholder "Query to search for")
if [ -z $search ]; then
	error "Please specify a query"
	exit 1
fi
info "Searching for: $search"

query="SELECT id, submission FROM submissions WHERE submission like '%$search%'"
info "Running query '$query'"
entries=$(gum spin -s line --title "Searching..." --show-output -- wrangler d1 execute pestoverse --command "$query" --json)
choices=$(jq -r '.[0].results[].submission' <<<"$entries" | sed 's/ /_/g' | sort | uniq)
selections=$(gum choose --no-limit --header "Values to change" --height=20 ${choices[@]})
to_change=$(jq -c -n '$ARGS.positional' --args ${selections[@]} | sed 's/_/ /g')

info "Will change values: $to_change"

ids_to_change=$(jq -r --argjson to_change "$to_change" '.[0].results[] | select(.submission as $in | $to_change | index($in)) | .id' <<<"$entries")

if [ -z "$ids_to_change" ]; then
	error "Nothing selected to change"
	exit 1
fi

ids_to_change="$(echo "$ids_to_change" | tr '\n' ',' | sed 's/,$//')"

info "ids_to_change: $ids_to_change"

new_value=$(gum input --placeholder "New value")

update_query="UPDATE submissions SET submission = '$new_value' WHERE id IN ($ids_to_change)"
if gum confirm "Execute $update_query?"; then
	gum spin -s line --title "Updating..." --show-output -- wrangler d1 execute pestoverse --command "$update_query"
	info "Successfully Updated!"
else
	info "Aborted"
	exit 1
fi
