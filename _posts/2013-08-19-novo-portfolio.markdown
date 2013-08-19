---
layout: post
title:  "Novo portfólio. Adeus Wordpress e obrigado pelos peixes"
tags: general jekyll wordpress "digital ocean"
---

![Obrigado pelos peixes](/media/thanks-all-the-fish.jpg){: .highlight-img}

Sempre que estou atolado de coisas para fazer e sem tempo para dormir refaço o portfólio para me lembrar que poderia ser pior. Se estiver realmente muito lotado, paro tudo e estudo um pouco de fotografia. No final das contas tudo se resolve bem.

<!--more-->

Na verdade abandonei um pouco a cara de portfólio, já que pretendo aposentar os freelas (convencionais) e foquei em montar um blog. O código fonte, obviamente é aberto e está disponível nesse [repositório](https://github.com/leandrooriente/leandrooriente).<br />
A ideia é pegar mais projetos de start-ups ou projetos próprios e menos clientes empresariais.

Caindo pra parte técnica. Usei [Jekyll](http://jekyllrb.com/) no lugar de [Wordpress](http://wordpress.org). Fiz isso porque achei ele mais enxuto para o tipo de site que pretendo manter.<br /> O Wordpress oferece recursos demais e é pesadão para o pouco que pretendo postar. Além disso achei a solução do Jekyll mais elegante.

O Jekyll serve arquivos estáticos. Todas as páginas são HTML's puros gerados no build. Então a resposta do servidor é absurdamente rápida. Combine isso com Gzip e unificação de JS's e CSS's e o site parece rodar localmente =).

Na infra do site estou usando Ubuntu 12.04 e o servidor é Nginx. Optei pelo Nginx no lugar do clássico Apache porque li num post de fonte duvidosa que ele era mais rápido e performático e resolvi não pesquisar mais a respeito e tomar como verdade.<br />
Até agora tem se comportado bem.

O servidor é provido pela [DigitalOcean](http://digitalocean.com). Aliás gostaria aqui de recomendar os serviços deles. A empresa oferece um serviço fora de série pelo preço que cobra (5 doletas/mês por uma VPS totalmente configurável com dezenas de OS disponíveis).

Pretendo escrever sobre meu cotidiano e soluções usadas nas aplicações em que trabalho aqui na [Vtex](http://www.vtex.com.br/) e alguns pitacos sobre a vida e meu novo hobby, a fotografia.

Aliás, aproveitando a deixa, se você é carioca, manja dos front-end development e está a procura de uma empresa irada para trabalhar não deixe de entrar em contato ~> [leandro.oriente@vtex.com.br](mailto:leandro.oriente@vtex.com.br).

Tive algumas dificuldades iniciais para trabalhar com Jekyll já que ele é desenvolvido em Ruby e não tenho muitos conhecimentos na área, mas depois de algumas horinhas no google consegui resolver boa parte deles.<br />
 Caso tenha alguma dúvida a respeito poste aqui nos comentários. As vezes é um problema que já precisei resolver.
