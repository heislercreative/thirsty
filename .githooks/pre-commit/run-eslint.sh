#!/bin/bash

# Run eslint on the overall project; if it generates any warnings or errors, abort the commit
echo "Pre-push linting..."
npm run lint --silent
