## [ Problema 1 ]

A solução para o filtro foi implementado utilizando uma abordagem funcional, onde podemos explorar:
- Estado inicial da pesquisa e dos assinantes
- Aplicação de observáveis por meio de operadores
- Limpeza do termo buscado
- Limite de letras para iniciar a pesquisa
- Distinção do termo atual para o novo termo pesquisado
- Tempo de espera para descartar o resultado da pesquisa anterior ou iniciar um nova pesquisa
- Diminuição das requisições realizadas
- Pesquisa em tempo real muito mais robusta, renderizando os resultados na ordem das solicitações e descartando as solicitações não utilizadas
- Mantendo o usuário informado do que está acontecendo com mensagens de alerta


## [ Problema 2 ]

- Utilizando webpack
  - Podemos utilizar o [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) para analisar a árvore de arquivos, assim temos mais clareza do que precisamos otimizar, minificar e dividir para melhorar o carregamento
  - Quando temos grandes dependências que acabam afetando o carregamento das páginas podemos utilizar o recurso de importações dinâmicas
  - Após configurarmos o webpack, o mesmo identifica as dependências que podem ser divididas em arquivos e faz o carregamento sob demanda
  - Uma outra possibilidade para diminuir o carregamento é aproveitar ao máximo o armazenamento em cache

```
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          },
        },
      }),
      new TerserPlugin({
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
    ],
  },
});
```
