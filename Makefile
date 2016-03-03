MAKEFLAGS = --no-print-directory --always-make --silent
MAKE = make $(MAKEFLAGS)

NODE_BIN = node_modules/.bin

VENV_NAME = interview-prep
VENV_PATH = ~/.virtualenvs/$(VENV_NAME)
VENV_ACTIVATE = . $(VENV_PATH)/bin/activate

.PHONY: eslint pyclean

eslint:
	@echo "Linting javascript..."
	$(NODE_BIN)/eslint javascript

pyclean:
	find . -name "*.pyc" -print -delete
	rm -rfv $(VENV_PATH)
