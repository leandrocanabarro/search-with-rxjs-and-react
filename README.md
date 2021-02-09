[ Problema 1 ]

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


[ Problema 2 ]
- Utilizar tree-shaking
- Utilizando o create-react-app, o mesmo se encarrega de fazer a divisão dos arquivos, para que fiquem menores
- Utilizando Webpack, precisa ter uma preocupação maior, pois toda a configuração é manual, para suportar tree-shaking e divisão dos arquivos
