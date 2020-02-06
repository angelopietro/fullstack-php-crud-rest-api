
<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>


Aplicação fullstack de um CRUD. A integração entre eles é feita através de uma API REST desenvolvido em PHP. 

Para o Backend em PHP, foi utililizado o framework [CodeIgniter](https://codeigniter.com/), oferecendo uma melhor agilidade para o desenvolvimento. Para a aplicação Frontend, optei em utilizar o  [Angular CLI](https://github.com/angular/angular-cli) versão 8.3.22, também para fins de exercícios.

O intuito desta aplicação é realizar um cadastro de Urls o qual será validado e o usuário receberá um status de retorno com o código HTTP e o corpo da resposta, de forma que o cliente saiba quando sua URL foi acessada, qual foi o status code retornado, bem como ter a possibilidade de visualizar o corpo do HTML retornado.
 
# Ambiente de desenvolvimento

[Visual Studio Code](https://code.visualstudio.com/) - Editor de código  
[Imsomnia](https://insomnia.rest/) - Cliente de serviços http (APIs)  
[PhpMyAdmin](https://www.phpmyadmin.net/) - Administrador MySQL via web
[MySQL](https://www.mysql.com/  ) - Banco de dados relacional
[CodeIgniter](https://codeigniter.com/) - PHP framework
 

# Passos para instalação

Após ter seu ambiente de desenvolvimento todo instalado e configurado com as suas ferramentas preferenciais, siga os passos abaixo:
 

### 1. Clonando o repositório

Para baixar/clonar o repositório, utilize o comando:

```git
git clone https://github.com/angelopietro/fullstack-php-crud-rest-api.git
```
---

### 3. Configurando as aplicações

### Backend

**Passos para instalação e execução:**

No diretório **backend** do projeto, será necessário realizar as sequintes configurações:


1. Arquivo `.htaccess` a raíz do diretório backend.
```sh
RewriteBase /
```

1. Arquivo `application/config/config.php` 
```php
$config['base_url'] = '';
```

3. Arquivo `application/config/constants.php`
```php
define('SECRET_KEY','');
```
4. Arquivo `application/config/database.php`
```php
'hostname' => '',
'username' => '',
'password' => '',
'database' => '',
```
 
---

### Frontend 

**Passos para instalação e execução:**

No diretório **frontend** realize as seguintes configurações:


1. Arquivo `environment.ts` e `environment.prod.ts` 

```php
  API: 'http://localhost:80/backend',
  BASE_URL: '/api',
  AUTH_KEY: ''
```

2. `proxy.conf.js`

```js
const PROXI_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:80/backend',
    secure: false,
    logLevel: 'debug',
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = PROXI_CONFIG;
```

Agora execute as seguintes linhas de comando:

```bash
# instalar as dependências
$ npm install

# Iniciar o serviço do frontend
$ npm run start
```


1. Abra o seu browse e digite o endereço `http://localhost:4200`
2. Após acessar a página de `Login`, realize o acesso utilizando com as seguintes informações:

> **Usuário:** admin
> **Senha:** 123456

Pronto!!! Agora você já poderá acessar a aplicação 

## Autor

:mortar_board: **Ângelo Pietro**

- Linkedin: [Ângelo Pietro](https://www.linkedin.com/in/angelopietro/)
- Github: [@angelopietro](https://github.com/angelopietro)