## 初回セットアップ

このREADMEのあるディレクトリ配下で以下を実行し、

```
npm install
```

その後、以下のコマンドを実行してください。

```
npm run build
```


## 起動方法

以下のコマンドでGQLサーバーを起動します。

```
cd gateway
npm run dev
```

起動すると、http://localhost:4000 でSandboxへアクセスできます。


## クエリについて

Queryは基本的には、以下の２つを用います。

- viewer
- node


## Viewerのサンプルクエリ

viewerは、以下のクエリが実行できます。


```
query Viewer {
  viewer {
    id
  }
}
```


## Nodeのサンプルクエリ

Nodeは以下のように実行できます。

```
query Node($nodeId: ID) {
  node(id: $nodeId) {
    ... on Customer {
      id
    }
  }
}
```


variableは以下です。

```
{
  "nodeId": "cus:1"
}
```