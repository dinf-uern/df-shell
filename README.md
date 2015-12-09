# df-shell
consiste em uma coletânea de componentes e diretivas angularjs que podem ser usadas para compor a  estrutura básica (shell) de uma aplicação. Df-shell é baseado no angular-material e e pode se integrar com ui-router. No pacote, estão incluidos:
- uma barra superior (topbar)
- um painel esquerdo e um direito (sidenav)
- um sistema de menu (df-main-menu e o serviço dfMainMenu)
- um serviço para autenticação (dfAuth)
- um wrap para o md-button (df-button)
- um componente para agregar botões flutuantes (df-floating-actions)
- um wrap do $mdToast para exibir notificações (dfNotify)

df-shell possui as seguintes dependências:
- angular
- angular-animate
- angular-material
- angular-ui-router (opcional)

a seguir serão apresentadas as diretivas e os principais que o pacote inclui.

# df-button
corresponde a um wrap para o md-button do angular-material com algumas funcionalidades extendidas.

exemplo
```sh
<df-button caption="'someCaption'" action="{exec: doSomething()}"></df-button>
```
o df-button possui os seguintes atributos:
```sh
caption - corresponde ao rótulo que irá aparecer no botão
icon - corresponde ao path para um icon no formato SVG
media - pode ser uma string ou um array de query medias nos quais o botão ficará visível. ex. "'sm'", "'md'", ['sm', 'md'], "'gt-md'".
action - corresponde a ação que será realizada ao se clicar no botão. action deve receber um objeto nos seguintes formatos
    {state:'state.name', params: {id: 10} } - para mudar para um estado específico configurado no ui-router
        state - corresponde ao nome do estado
        params (opcional) - corresponde aos parametros que deve ser passados para o estado
    {event: 'some.event'} - para fazer o $broadcast de algum evento a partir do $rootScope.
    {exec: someFunction(){ ... } - para executar alguma função
    {link: 'externalUrl'} - para abrir um link externo
```
obs. todos os atributos do df-button são do fazem o bind de uma direção. Desta forma, você poderá usar alguma função ou elemento presente no escopo para fazer o bind com o atributo. Caso queira usar um valor estático, utilize o valor dentro de aspas simples, como pode ser observado na atributo caption do exemplo anterior.