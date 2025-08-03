gen-story:
	@bash scripts/gen-story.sh $(word 1,$(MAKECMDGOALS)) $(word 2,$(MAKECMDGOALS))

gen-component:
	@bash scripts/gen-component.sh $(word 1,$(MAKECMDGOALS)) $(word 2,$(MAKECMDGOALS))

%:
	@:
