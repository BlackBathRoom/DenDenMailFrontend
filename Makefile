gen-story:
	@bash scripts/gen-story.sh $(word 2,$(MAKECMDGOALS)) $(word 3,$(MAKECMDGOALS))

gen-component:
	@bash scripts/gen-component.sh $(word 2,$(MAKECMDGOALS)) $(word 3,$(MAKECMDGOALS))

%:
	@:
