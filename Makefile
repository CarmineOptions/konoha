# Scarb is ridiculously shit, it appends to an output file instead of replacing it. So target/ dir must be nuked before every run.
build:
	rm -rf target/
	scarb build

deploy: build
	starknet declare --contract target/release/governance_Governance.json --account version_11