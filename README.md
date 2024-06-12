# fib_api

## 技術
- Express (Typescript)
- Docker
- nginx

## 構成

Docker環境にて構成した.
nginxを用いてルーティングしたのち, nodeで動くExpressにて処理.

API定義にはSwaggerを用いた.

ディレクトリ構成は以下の通り.

- /server
  サーバ上で動作するプログラム

- /server/nginx
  nginxの設定ファイル
- /server/node
  node関連ディレクトリ
- /server/node/src
  ソートディレクトリ
- /server/node/src/routes/*
  ルートによる処理を定義するディレクトリ

## 実行方法
### サーバサイド
サーバの実行方法は以下の通り.
```sh
cd server
docker compose up --build
```

サーバの実行方法(nginxなし)は以下の通り.
```sh
cd server/node
npm run start
```

ユニットテストの実行方法は以下の通り.
```sh
cd server/node
npm run test
```

開発用の実行方法は以下の通り.
```sh
cd server/node
npm run dev
```
### クライアントサイド
クライアントからの呼び出しは以下の通り.
#### Request
```sh
 curl -X GET -H "Content-Type: application/json" "https://example.com/fib?n=99"
```
#### Response
Status: 200
```json
{"result":218922995834555169026}
```

## エラーコード
### 400
パラメータがない, パラメータが文字の場合
#### Request
```sh
https://example.com/fib
```
#### Response
Status: 400
```json
{"status":400,"message":"Bad Request."}
```
パラメータが負の値等の場合
#### Request
```sh
https://example.com/fib?n=-1
```
#### Response
Status: 400
```json
{"status":400,"message":"Invalid input."}
```
### 404
ルートがない場合
#### Request
```sh
https://example.com/
```
#### Response
Status: 404
```json
{"status":404,"message":"Not Found."}
```

### 500
内部エラー
#### Response
Status: 500
```json
{"status":500,"message":"Internal Server Error."}
```
