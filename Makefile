proto:
	npx protoc \
	--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
	--proto_path=../blog-backend/proto \
	--ts_out=src/proto \
	../blog-backend/proto/**/*.proto