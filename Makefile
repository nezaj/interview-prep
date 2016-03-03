MAKEFLAGS = --no-print-directory --always-make --silent
MAKE = make $(MAKEFLAGS)

NODE_BIN = node_modules/.bin

.PHONY: eslint

eslint:
	@echo "Linting javascript..."
	$(NODE_BIN)/eslint javascript
