#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
# Pin the research environment, even if the caller has another SDK selected.
export DAML_SDK_VERSION=3.4.8
python3 check-snippets.py
daml build
daml test
