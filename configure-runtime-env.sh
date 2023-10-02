#!/bin/bash

echo "window._env_ = {" > ./runtime-env.js

# Read each line in .env file, each line represents key=value pairs
# ignore comment lines
grep -v '^#' < .env | while read -r line || [[ -n "$line" ]];
do
    # Split env variables into key/value pairs
    if printf '%s\n' "$line" | grep -q -e '='; then
        varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
        varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')

        # Read value of current variable if exists as Environment variable
        value=$(printf '%s\n' "${!varname}")

        # Otherwise use value from .env file
        [[ -z $value ]] && value=${varvalue}
        
        # Append configuration property to JS file
        echo "    $varname: \"$value\"," >> ./runtime-env.js
    fi
done

echo "};" >> ./runtime-env.js
