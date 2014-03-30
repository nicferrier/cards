.PHONY: npm-depends
npm-depends:
	npm install polyfill-webcomponents
	npm install browserify

js/bundle.js:
	browserify scripts/example.js > js/bundle.js

